export interface Business {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  favicon_url?: string
  primary_color?: string
  accent_color?: string
  domain?: string
  custom_domain?: string
  settings?: Record<string, any>
  status: string
  plan: string
  created_at: string
}

export interface Page {
  id: string
  business_id: string
  title: string
  slug: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  og_image?: string
  content: any[]
  template: string
  status: string
  scheduled_at?: string
  is_homepage: boolean
  sort_order: number
  parent_id?: string
  created_by?: string
  updated_by?: string
  created_at: string
  updated_at: string
  page_sections?: PageSection[]
}

export interface PageSection {
  id: string
  page_id: string
  section_id: string
  sort_order: number
  settings?: Record<string, any>
  section?: Section
}

export interface Section {
  id: string
  business_id: string
  name: string
  type: 'hero' | 'features' | 'testimonials' | 'pricing' | 'cta' | 'faq' | 'team' | 'stats' | 'custom'
  content: Record<string, any>
  settings?: Record<string, any>
  sort_order: number
  is_global: boolean
  status: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  business_id: string
  title: string
  slug: string
  excerpt?: string
  content: any[]
  cover_image?: string
  meta_title?: string
  meta_description?: string
  author_id?: string
  category_id?: string
  tags?: string[]
  status: string
  published_at?: string
  scheduled_at?: string
  view_count: number
  likes_count: number
  created_at: string
  updated_at: string
  category?: BlogCategory
  author?: { full_name: string; avatar_url?: string }
}

export interface BlogCategory {
  id: string
  business_id: string
  name: string
  slug: string
  description?: string
  sort_order: number
  created_at: string
}

export interface Testimonial {
  id: string
  business_id: string
  author_name: string
  author_title?: string
  author_company?: string
  author_avatar?: string
  content: string
  rating?: number
  is_featured: boolean
  sort_order: number
  status: string
  created_at: string
}

export interface Partner {
  id: string
  business_id: string
  name: string
  logo_url: string
  website_url?: string
  description?: string
  sort_order: number
  status: string
  created_at: string
}

export interface FAQ {
  id: string
  business_id: string
  question: string
  answer: string
  category?: string
  sort_order: number
  status: string
  created_at: string
}

export interface PricingPlan {
  id: string
  business_id: string
  name: string
  description?: string
  price_monthly?: number
  price_yearly?: number
  currency: string
  features: string[]
  is_popular: boolean
  is_enterprise: boolean
  cta_text: string
  cta_url?: string
  sort_order: number
  status: string
  created_at: string
  updated_at: string
}

export interface RoadmapItem {
  id: string
  business_id: string
  title: string
  description?: string
  status: string
  quarter?: string
  year?: number
  sort_order: number
  created_at: string
}

export interface Announcement {
  id: string
  business_id: string
  title: string
  content: string
  type: string
  link_url?: string
  link_text?: string
  dismissible: boolean
  start_at?: string
  end_at?: string
  status: string
  created_at: string
}

export interface Contact {
  id: string
  business_id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  company?: string
  job_title?: string
  source?: string
  status: string
  tags?: string[]
  custom_fields?: Record<string, any>
  assigned_to?: string
  last_contacted_at?: string
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  business_id: string
  contact_id?: string
  title: string
  value?: number
  currency: string
  stage: string
  probability?: number
  expected_close_date?: string
  actual_close_date?: string
  description?: string
  assigned_to?: string
  created_at: string
  updated_at: string
  contact?: Contact
}

export interface MediaFile {
  id: string
  business_id: string
  filename: string
  original_name: string
  mime_type: string
  size: number
  url: string
  thumbnail_url?: string
  width?: number
  height?: number
  duration?: number
  alt_text?: string
  folder: string
  tags?: string[]
  uploaded_by?: string
  created_at: string
}

export interface Setting {
  id: string
  business_id: string
  key: string
  value: any
  group_name: string
  created_at: string
  updated_at: string
}

export interface Translation {
  id: string
  business_id: string
  locale: string
  key: string
  value: string
  group_name: string
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
