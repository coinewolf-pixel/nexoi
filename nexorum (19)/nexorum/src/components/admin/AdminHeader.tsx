import { useNavigate } from 'react-router-dom'
import { LogOut, Bell } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'

export default function AdminHeader() {
  const { profile, logout } = useAuthStore()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }
  return (
    <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-xl flex items-center justify-between px-8">
      <div />
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
            {profile?.full_name?.[0] || profile?.email?.[0] || 'A'}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-white">{profile?.full_name || profile?.email}</div>
            <div className="text-xs text-gray-500 capitalize">{profile?.role}</div>
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-danger transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
