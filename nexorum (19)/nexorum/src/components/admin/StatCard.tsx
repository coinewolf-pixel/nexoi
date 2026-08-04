import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color?: string
}

export default function StatCard({ title, value, icon: Icon, color = 'text-primary' }: StatCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{title}</span>
        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  )
}
