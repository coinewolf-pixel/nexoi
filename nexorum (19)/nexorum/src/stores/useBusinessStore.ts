import { create } from 'zustand'
import { publicApi } from '@/lib/api'
import type { Business, Setting, Translation } from '@/types'

interface BusinessState {
  business: Business | null
  settings: Record<string, any>
  translations: Record<string, string>
  isLoading: boolean
  error: string | null
  fetchBusiness: (slug: string) => Promise<void>
  fetchSettings: (slug: string) => Promise<void>
  fetchTranslations: (slug: string, locale?: string) => Promise<void>
  getSetting: (key: string, defaultValue?: any) => any
  getTranslation: (key: string, defaultValue?: string) => string
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  business: null,
  settings: {},
  translations: {},
  isLoading: false,
  error: null,

  fetchBusiness: async (slug) => {
    set({ isLoading: true, error: null })
    try {
      const { data } = await publicApi.getBusiness(slug)
      if (data.data) {
        set({ business: data.data })
        localStorage.setItem('business_id', data.data.id)
      }
    } catch (err: any) {
      set({ error: err.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSettings: async (slug) => {
    try {
      const { data } = await publicApi.getSettings(slug)
      if (data.data) {
        set({ settings: data.data })
      }
    } catch (err: any) {
      console.error('Failed to fetch settings:', err)
    }
  },

  fetchTranslations: async (slug, locale = 'en') => {
    try {
      const { data } = await publicApi.getTranslations(slug, locale)
      if (data.data) {
        set({ translations: data.data })
      }
    } catch (err: any) {
      console.error('Failed to fetch translations:', err)
    }
  },

  getSetting: (key, defaultValue) => {
    return get().settings[key] ?? defaultValue
  },

  getTranslation: (key, defaultValue = key) => {
    return get().translations[key] ?? defaultValue
  }
}))
