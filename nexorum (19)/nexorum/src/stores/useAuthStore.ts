import { create } from 'zustand'
import { supabase, getCurrentUser, getUserProfile } from '@/lib/supabase'

interface AuthState {
  user: any | null
  profile: any | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: any) => void
  setProfile: (profile: any) => void
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setProfile: (profile) => set({ profile }),

  checkAuth: async () => {
    try {
      const user = await getCurrentUser()
      if (user) {
        const profile = await getUserProfile(user.id)
        set({ user, profile, isAuthenticated: true, isLoading: false })
      } else {
        set({ user: null, profile: null, isAuthenticated: false, isLoading: false })
      }
    } catch {
      set({ user: null, profile: null, isAuthenticated: false, isLoading: false })
    }
  },

  logout: async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('supabase_access_token')
    localStorage.removeItem('business_id')
    set({ user: null, profile: null, isAuthenticated: false })
  }
}))
