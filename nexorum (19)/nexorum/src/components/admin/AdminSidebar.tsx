import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, BookOpen, Image, Users, DollarSign, MessageSquare, Briefcase, HelpCircle, CreditCard, Map, Megaphone, Settings, Languages, BarChart3, Shield, Zap } from 'lucide-react'

const menuItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/pages', icon: FileText, label: 'Pages' },
  { to: '/admin/blog', icon: BookOpen, label: 'Blog' },
  { to: '/admin/media', icon: Image, label: 'Media' },
  { to: '/admin/contacts', icon: Users, label: 'Contacts' },
  { to: '/admin/deals', icon: DollarSign, label: 'Deals' },
  { to: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
  { to: '/admin/partners', icon: Briefcase, label: 'Partners' },
  { to: '/admin/faq', icon: HelpCircle, label: 'FAQ' },
  { to: '/admin/pricing', icon: CreditCard, label: 'Pricing' },
  { to: '/admin/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/admin/announcements', icon: Megaphone, label: 'Announcements' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/translations', icon: Languages, label: 'Translations' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/audit-logs', icon: Shield, label: 'Audit Logs' },
]

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border z-40">
      <div className="flex items-center gap-2 h-16 px-6 border-b border-border">
        <Zap className="w-5 h-5 text-primary" />
        <span className="font-bold text-gradient">Nexorum Admin</span>
      </div>
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {menuItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/admin'}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-white hover:bg-surfaceHover'}`}>
            <item.icon className="w-4 h-4" />{item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
