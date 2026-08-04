import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { createClient } from '@supabase/supabase-js'
import type { Context, Next } from 'hono'

// Types
interface Env {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  JWT_SECRET: string
  ENVIRONMENT: string
}

interface Variables {
  supabase: ReturnType<typeof createClient>
  user: { id: string; email: string; role: string } | null
  businessId: string | null
}

// Initialize app
const app = new Hono<{ Bindings: Env; Variables: Variables }>()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: ['https://nexorum.app', 'https://admin.nexorum.app', 'http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Business-ID'],
  credentials: true
}))

// Supabase client middleware
app.use('*', async (c, next) => {
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
  c.set('supabase', supabase)
  c.set('user', null)
  c.set('businessId', null)
  await next()
})

// Auth middleware
app.use('*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  const businessId = c.req.header('X-Business-ID')

  if (businessId) {
    c.set('businessId', businessId)
  }

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '')
    const supabase = c.get('supabase')
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (user && !error) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      c.set('user', {
        id: user.id,
        email: user.email || '',
        role: profile?.role || 'user'
      })
    }
  }

  await next()
})

// Auth helper
function requireAuth(c: Context) {
  const user = c.get('user')
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

function requireAdmin(c: Context) {
  const user = requireAuth(c)
  if (!['admin', 'superadmin'].includes(user.role)) {
    throw new Error('Forbidden')
  }
  return user
}

// Error handler
app.onError((err, c) => {
  console.error('API Error:', err)
  return c.json({ 
    success: false, 
    error: err.message || 'Internal Server Error',
    code: err.message === 'Unauthorized' ? 401 : err.message === 'Forbidden' ? 403 : 500
  }, err.message === 'Unauthorized' ? 401 : err.message === 'Forbidden' ? 403 : 500)
})

// Health check
app.get('/api/health', (c) => {
  return c.json({ 
    success: true, 
    status: 'healthy', 
    version: '1.0.0',
    environment: c.env.ENVIRONMENT,
    timestamp: new Date().toISOString()
  })
})

// ============================================================
// PUBLIC API ROUTES
// ============================================================

// Get business by slug
app.get('/api/businesses/:slug', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error || !data) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  return c.json({ success: true, data })
})

// Get pages for business
app.get('/api/businesses/:slug/pages', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data, error } = await supabase
    .from('pages')
    .select('*, page_sections(*, section:sections(*))')
    .eq('business_id', business.id)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) {
    return c.json({ success: false, error: error.message }, 500)
  }

  return c.json({ success: true, data })
})

// Get single page
app.get('/api/businesses/:slug/pages/:pageSlug', async (c) => {
  const slug = c.req.param('slug')
  const pageSlug = c.req.param('pageSlug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data, error } = await supabase
    .from('pages')
    .select('*, page_sections(*, section:sections(*))')
    .eq('business_id', business.id)
    .eq('slug', pageSlug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    return c.json({ success: false, error: 'Page not found' }, 404)
  }

  return c.json({ success: true, data })
})

// Get blog posts
app.get('/api/businesses/:slug/blog', async (c) => {
  const slug = c.req.param('slug')
  const page = parseInt(c.req.query('page') || '1')
  const limit = parseInt(c.req.query('limit') || '10')
  const category = c.req.query('category')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  let query = supabase
    .from('blog_posts')
    .select('*, category:blog_categories(*), author:profiles(full_name, avatar_url)', { count: 'exact' })
    .eq('business_id', business.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (category) {
    query = query.eq('category_id', category)
  }

  const { data, error, count } = await query

  if (error) {
    return c.json({ success: false, error: error.message }, 500)
  }

  return c.json({ 
    success: true, 
    data, 
    meta: { page, limit, total: count, pages: Math.ceil((count || 0) / limit) }
  })
})

// Get single blog post
app.get('/api/businesses/:slug/blog/:postSlug', async (c) => {
  const slug = c.req.param('slug')
  const postSlug = c.req.param('postSlug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, category:blog_categories(*), author:profiles(full_name, avatar_url)')
    .eq('business_id', business.id)
    .eq('slug', postSlug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    return c.json({ success: false, error: 'Post not found' }, 404)
  }

  // Increment view count
  await supabase.rpc('increment_blog_views', { post_id: data.id })

  return c.json({ success: true, data })
})

// Get testimonials
app.get('/api/businesses/:slug/testimonials', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .order('sort_order', { ascending: true })

  return c.json({ success: true, data: data || [] })
})

// Get partners
app.get('/api/businesses/:slug/partners', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data } = await supabase
    .from('partners')
    .select('*')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .order('sort_order', { ascending: true })

  return c.json({ success: true, data: data || [] })
})

// Get FAQ
app.get('/api/businesses/:slug/faqs', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data } = await supabase
    .from('faqs')
    .select('*')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .order('sort_order', { ascending: true })

  return c.json({ success: true, data: data || [] })
})

// Get pricing
app.get('/api/businesses/:slug/pricing', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data } = await supabase
    .from('pricing_plans')
    .select('*')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .order('sort_order', { ascending: true })

  return c.json({ success: true, data: data || [] })
})

// Get roadmap
app.get('/api/businesses/:slug/roadmap', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data } = await supabase
    .from('roadmap_items')
    .select('*')
    .eq('business_id', business.id)
    .order('sort_order', { ascending: true })

  return c.json({ success: true, data: data || [] })
})

// Get announcements
app.get('/api/businesses/:slug/announcements', async (c) => {
  const slug = c.req.param('slug')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data } = await supabase
    .from('announcements')
    .select('*')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .or('start_at.is.null,start_at.lte.now')
    .or('end_at.is.null,end_at.gte.now')
    .order('created_at', { ascending: false })

  return c.json({ success: true, data: data || [] })
})

// Get settings
app.get('/api/businesses/:slug/settings', async (c) => {
  const slug = c.req.param('slug')
  const group = c.req.query('group')
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  let query = supabase
    .from('settings')
    .select('*')
    .eq('business_id', business.id)

  if (group) {
    query = query.eq('group_name', group)
  }

  const { data } = await query

  const settings: Record<string, any> = {}
  data?.forEach((s: any) => {
    settings[s.key] = s.value
  })

  return c.json({ success: true, data: settings })
})

// Get translations
app.get('/api/businesses/:slug/translations', async (c) => {
  const slug = c.req.param('slug')
  const locale = c.req.query('locale') || 'en'
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { data } = await supabase
    .from('translations')
    .select('*')
    .eq('business_id', business.id)
    .eq('locale', locale)

  const translations: Record<string, string> = {}
  data?.forEach((t: any) => {
    translations[t.key] = t.value
  })

  return c.json({ success: true, data: translations })
})

// Track analytics event
app.post('/api/businesses/:slug/analytics', async (c) => {
  const slug = c.req.param('slug')
  const body = await c.req.json()
  const supabase = c.get('supabase')

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { error } = await supabase
    .from('analytics_events')
    .insert({
      business_id: business.id,
      event_type: body.event_type,
      event_name: body.event_name,
      path: body.path,
      referrer: body.referrer,
      session_id: body.session_id,
      visitor_id: body.visitor_id,
      metadata: body.metadata || {}
    })

  if (error) {
    return c.json({ success: false, error: error.message }, 500)
  }

  return c.json({ success: true })
})

// Contact form submission
app.post('/api/businesses/:slug/contact', async (c) => {
  const slug = c.req.param('slug')
  const body = await c.req.json()
  const supabase = c.get('supabase')

  if (!body.email || !body.name || !body.message) {
    return c.json({ success: false, error: 'Missing required fields' }, 400)
  }

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!business) {
    return c.json({ success: false, error: 'Business not found' }, 404)
  }

  const { error } = await supabase
    .from('contacts')
    .insert({
      business_id: business.id,
      email: body.email,
      first_name: body.name.split(' ')[0],
      last_name: body.name.split(' ').slice(1).join(' '),
      phone: body.phone,
      company: body.company,
      source: 'website_contact_form',
      status: 'lead',
      custom_fields: { message: body.message, subject: body.subject }
    })

  if (error) {
    return c.json({ success: false, error: error.message }, 500)
  }

  return c.json({ success: true, message: 'Message sent successfully' })
})

// ============================================================
// ADMIN API ROUTES (Protected)
// ============================================================

// Get dashboard stats
app.get('/api/admin/stats', async (c) => {
  requireAdmin(c)
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')

  if (!businessId) {
    return c.json({ success: false, error: 'Business ID required' }, 400)
  }

  const [pagesRes, postsRes, contactsRes, dealsRes, mediaRes, eventsRes] = await Promise.all([
    supabase.from('pages').select('*', { count: 'exact', head: true }).eq('business_id', businessId),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('business_id', businessId),
    supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('business_id', businessId),
    supabase.from('deals').select('*', { count: 'exact', head: true }).eq('business_id', businessId),
    supabase.from('media').select('*', { count: 'exact', head: true }).eq('business_id', businessId),
    supabase.from('analytics_events').select('*', { count: 'exact', head: true }).eq('business_id', businessId).gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
  ])

  return c.json({
    success: true,
    data: {
      pages: pagesRes.count || 0,
      blogPosts: postsRes.count || 0,
      contacts: contactsRes.count || 0,
      deals: dealsRes.count || 0,
      mediaFiles: mediaRes.count || 0,
      monthlyEvents: eventsRes.count || 0
    }
  })
})

// Generic CRUD helper for admin routes
function createAdminRoutes(table: string, allowedFields?: string[]) {
  // List
  app.get(`/api/admin/${table}`, async (c) => {
    requireAdmin(c)
    const supabase = c.get('supabase')
    const businessId = c.get('businessId')

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })

    if (error) return c.json({ success: false, error: error.message }, 500)
    return c.json({ success: true, data })
  })

  // Create
  app.post(`/api/admin/${table}`, async (c) => {
    requireAdmin(c)
    const body = await c.req.json()
    const supabase = c.get('supabase')
    const businessId = c.get('businessId')

    const insertData = allowedFields 
      ? Object.fromEntries(Object.entries(body).filter(([k]) => allowedFields.includes(k)))
      : body

    const { data, error } = await supabase
      .from(table)
      .insert({ ...insertData, business_id: businessId })
      .select()
      .single()

    if (error) return c.json({ success: false, error: error.message }, 500)
    return c.json({ success: true, data })
  })

  // Update
  app.patch(`/api/admin/${table}/:id`, async (c) => {
    requireAdmin(c)
    const id = c.req.param('id')
    const body = await c.req.json()
    const supabase = c.get('supabase')
    const businessId = c.get('businessId')

    const updateData = allowedFields
      ? Object.fromEntries(Object.entries(body).filter(([k]) => allowedFields.includes(k)))
      : body

    const { data, error } = await supabase
      .from(table)
      .update(updateData)
      .eq('id', id)
      .eq('business_id', businessId)
      .select()
      .single()

    if (error) return c.json({ success: false, error: error.message }, 500)
    return c.json({ success: true, data })
  })

  // Delete
  app.delete(`/api/admin/${table}/:id`, async (c) => {
    requireAdmin(c)
    const id = c.req.param('id')
    const supabase = c.get('supabase')
    const businessId = c.get('businessId')

    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
      .eq('business_id', businessId)

    if (error) return c.json({ success: false, error: error.message }, 500)
    return c.json({ success: true })
  })
}

// Register admin routes
createAdminRoutes('pages')
createAdminRoutes('blog_posts')
createAdminRoutes('blog_categories')
createAdminRoutes('sections')
createAdminRoutes('testimonials')
createAdminRoutes('partners')
createAdminRoutes('faqs')
createAdminRoutes('pricing_plans')
createAdminRoutes('roadmap_items')
createAdminRoutes('announcements')
createAdminRoutes('contacts')
createAdminRoutes('deals')
createAdminRoutes('activities')

// Media upload URL
app.post('/api/admin/media/upload-url', async (c) => {
  requireAdmin(c)
  const body = await c.req.json()
  const supabase = c.get('supabase')

  const { data, error } = await supabase
    .storage
    .from('media')
    .createSignedUploadUrl(`${body.folder || 'root'}/${body.filename}`)

  if (error) return c.json({ success: false, error: error.message }, 500)
  return c.json({ success: true, data })
})

// Settings
app.get('/api/admin/settings', async (c) => {
  requireAdmin(c)
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')

  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('business_id', businessId)

  if (error) return c.json({ success: false, error: error.message }, 500)
  return c.json({ success: true, data })
})

app.post('/api/admin/settings', async (c) => {
  requireAdmin(c)
  const body = await c.req.json()
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')

  const { data, error } = await supabase
    .from('settings')
    .upsert({ ...body, business_id: businessId }, { onConflict: 'business_id,key' })
    .select()
    .single()

  if (error) return c.json({ success: false, error: error.message }, 500)
  return c.json({ success: true, data })
})

// Translations
app.get('/api/admin/translations', async (c) => {
  requireAdmin(c)
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')
  const locale = c.req.query('locale') || 'en'

  const { data, error } = await supabase
    .from('translations')
    .select('*')
    .eq('business_id', businessId)
    .eq('locale', locale)

  if (error) return c.json({ success: false, error: error.message }, 500)
  return c.json({ success: true, data })
})

app.post('/api/admin/translations', async (c) => {
  requireAdmin(c)
  const body = await c.req.json()
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')

  const { data, error } = await supabase
    .from('translations')
    .upsert({ ...body, business_id: businessId }, { onConflict: 'business_id,locale,key' })
    .select()
    .single()

  if (error) return c.json({ success: false, error: error.message }, 500)
  return c.json({ success: true, data })
})

app.delete('/api/admin/translations/:id', async (c) => {
  requireAdmin(c)
  const id = c.req.param('id')
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')

  const { error } = await supabase
    .from('translations')
    .delete()
    .eq('id', id)
    .eq('business_id', businessId)

  if (error) return c.json({ success: false, error: error.message }, 500)
  return c.json({ success: true })
})

// Analytics data
app.get('/api/admin/analytics', async (c) => {
  requireAdmin(c)
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')
  const days = parseInt(c.req.query('days') || '30')

  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const { data: events, error } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('business_id', businessId)
    .gte('created_at', startDate)
    .order('created_at', { ascending: true })

  if (error) return c.json({ success: false, error: error.message }, 500)

  // Aggregate by day
  const byDay: Record<string, number> = {}
  const byPage: Record<string, number> = {}
  const byEvent: Record<string, number> = {}

  events?.forEach((e: any) => {
    const day = e.created_at.split('T')[0]
    byDay[day] = (byDay[day] || 0) + 1
    if (e.path) byPage[e.path] = (byPage[e.path] || 0) + 1
    byEvent[e.event_name] = (byEvent[e.event_name] || 0) + 1
  })

  return c.json({
    success: true,
    data: {
      eventsByDay: Object.entries(byDay).map(([date, count]) => ({ date, count })),
      topPages: Object.entries(byPage).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count).slice(0, 10),
      topEvents: Object.entries(byEvent).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10)
    }
  })
})

// Audit logs
app.get('/api/admin/audit-logs', async (c) => {
  requireAdmin(c)
  const supabase = c.get('supabase')
  const businessId = c.get('businessId')

  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) return c.json({ success: false, error: error.message }, 500)
  return c.json({ success: true, data })
})

export default app
