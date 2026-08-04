import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const BUSINESS_SLUG = 'nexorum'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token and business ID to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('supabase_access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers['X-Business-ID'] = localStorage.getItem('business_id') || '00000000-0000-0000-0000-000000000001'
  return config
})

// Public API
export const publicApi = {
  getBusiness: (slug: string) => api.get(`/businesses/${slug}`),
  getPages: (slug: string) => api.get(`/businesses/${slug}/pages`),
  getPage: (slug: string, pageSlug: string) => api.get(`/businesses/${slug}/pages/${pageSlug}`),
  getBlogPosts: (slug: string, params?: { page?: number; limit?: number; category?: string }) => 
    api.get(`/businesses/${slug}/blog`, { params }),
  getBlogPost: (slug: string, postSlug: string) => api.get(`/businesses/${slug}/blog/${postSlug}`),
  getTestimonials: (slug: string) => api.get(`/businesses/${slug}/testimonials`),
  getPartners: (slug: string) => api.get(`/businesses/${slug}/partners`),
  getFAQs: (slug: string) => api.get(`/businesses/${slug}/faqs`),
  getPricing: (slug: string) => api.get(`/businesses/${slug}/pricing`),
  getRoadmap: (slug: string) => api.get(`/businesses/${slug}/roadmap`),
  getAnnouncements: (slug: string) => api.get(`/businesses/${slug}/announcements`),
  getSettings: (slug: string, group?: string) => api.get(`/businesses/${slug}/settings`, { params: { group } }),
  getTranslations: (slug: string, locale?: string) => api.get(`/businesses/${slug}/translations`, { params: { locale } }),
  trackEvent: (slug: string, data: any) => api.post(`/businesses/${slug}/analytics`, data),
  submitContact: (slug: string, data: any) => api.post(`/businesses/${slug}/contact`, data)
}

// Admin API
export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  getPages: () => api.get('/admin/pages'),
  createPage: (data: any) => api.post('/admin/pages', data),
  updatePage: (id: string, data: any) => api.patch(`/admin/pages/${id}`, data),
  deletePage: (id: string) => api.delete(`/admin/pages/${id}`),

  getBlogPosts: () => api.get('/admin/blog_posts'),
  createBlogPost: (data: any) => api.post('/admin/blog_posts', data),
  updateBlogPost: (id: string, data: any) => api.patch(`/admin/blog_posts/${id}`, data),
  deleteBlogPost: (id: string) => api.delete(`/admin/blog_posts/${id}`),

  getMedia: (folder?: string) => api.get('/admin/media', { params: { folder } }),
  createMedia: (data: any) => api.post('/admin/media', data),
  deleteMedia: (id: string) => api.delete(`/admin/media/${id}`),
  getUploadUrl: (data: any) => api.post('/admin/media/upload-url', data),

  getContacts: () => api.get('/admin/contacts'),
  createContact: (data: any) => api.post('/admin/contacts', data),
  updateContact: (id: string, data: any) => api.patch(`/admin/contacts/${id}`, data),
  deleteContact: (id: string) => api.delete(`/admin/contacts/${id}`),

  getDeals: () => api.get('/admin/deals'),
  createDeal: (data: any) => api.post('/admin/deals', data),
  updateDeal: (id: string, data: any) => api.patch(`/admin/deals/${id}`, data),
  deleteDeal: (id: string) => api.delete(`/admin/deals/${id}`),

  getTestimonials: () => api.get('/admin/testimonials'),
  createTestimonial: (data: any) => api.post('/admin/testimonials', data),
  updateTestimonial: (id: string, data: any) => api.patch(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id: string) => api.delete(`/admin/testimonials/${id}`),

  getPartners: () => api.get('/admin/partners'),
  createPartner: (data: any) => api.post('/admin/partners', data),
  updatePartner: (id: string, data: any) => api.patch(`/admin/partners/${id}`, data),
  deletePartner: (id: string) => api.delete(`/admin/partners/${id}`),

  getFAQs: () => api.get('/admin/faqs'),
  createFAQ: (data: any) => api.post('/admin/faqs', data),
  updateFAQ: (id: string, data: any) => api.patch(`/admin/faqs/${id}`, data),
  deleteFAQ: (id: string) => api.delete(`/admin/faqs/${id}`),

  getPricingPlans: () => api.get('/admin/pricing_plans'),
  createPricingPlan: (data: any) => api.post('/admin/pricing_plans', data),
  updatePricingPlan: (id: string, data: any) => api.patch(`/admin/pricing_plans/${id}`, data),
  deletePricingPlan: (id: string) => api.delete(`/admin/pricing_plans/${id}`),

  getRoadmap: () => api.get('/admin/roadmap'),
  createRoadmapItem: (data: any) => api.post('/admin/roadmap', data),
  updateRoadmapItem: (id: string, data: any) => api.patch(`/admin/roadmap/${id}`, data),
  deleteRoadmapItem: (id: string) => api.delete(`/admin/roadmap/${id}`),

  getAnnouncements: () => api.get('/admin/announcements'),
  createAnnouncement: (data: any) => api.post('/admin/announcements', data),
  updateAnnouncement: (id: string, data: any) => api.patch(`/admin/announcements/${id}`, data),
  deleteAnnouncement: (id: string) => api.delete(`/admin/announcements/${id}`),

  getSettings: () => api.get('/admin/settings'),
  saveSetting: (data: any) => api.post('/admin/settings', data),

  getTranslations: (locale?: string) => api.get('/admin/translations', { params: { locale } }),
  saveTranslation: (data: any) => api.post('/admin/translations', data),
  deleteTranslation: (id: string) => api.delete(`/admin/translations/${id}`),

  getAnalytics: (days?: number) => api.get('/admin/analytics', { params: { days } }),
  getAuditLogs: () => api.get('/admin/audit-logs')
}

export default api
