import { useQuery } from 'react-query'
import { FileText, BookOpen, Users, DollarSign, Image, Activity } from 'lucide-react'
import { adminApi } from '@/lib/api'
import StatCard from '@/components/admin/StatCard'

export default function AdminDashboard() {
  const { data } = useQuery('admin-stats', () => adminApi.getStats())
  const stats = data?.data?.data || {}
  return (
    <div className="space-y-8">
      <div><h1 className="text-2xl font-bold text-white">Dashboard</h1><p className="text-gray-500">Overview of your business</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Pages" value={stats.pages || 0} icon={FileText} />
        <StatCard title="Blog Posts" value={stats.blogPosts || 0} icon={BookOpen} />
        <StatCard title="Contacts" value={stats.contacts || 0} icon={Users} />
        <StatCard title="Deals" value={stats.deals || 0} icon={DollarSign} />
        <StatCard title="Media Files" value={stats.mediaFiles || 0} icon={Image} />
        <StatCard title="Monthly Events" value={stats.monthlyEvents || 0} icon={Activity} />
      </div>
    </div>
  )
}
