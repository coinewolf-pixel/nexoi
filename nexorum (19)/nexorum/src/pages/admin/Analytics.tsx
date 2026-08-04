import { useState } from 'react'
import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = ['#6366f1', '#22d3ee', '#22c55e', '#f59e0b', '#ef4444']

export default function AdminAnalytics() {
  const [days, setDays] = useState(30)
  const { data } = useQuery(['admin-analytics', days], () => adminApi.getAnalytics(days))
  const analytics = data?.data?.data || { eventsByDay: [], topPages: [], topEvents: [] }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Analytics</h1><p className="text-gray-500">Website traffic and events</p></div>
        <select className="input-field w-32" value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>7 days</option>
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
        </select>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Events by Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.eventsByDay}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip contentStyle={{ background: '#12121a', border: '1px solid #2a2a3a', borderRadius: '8px' }} />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={analytics.topPages} dataKey="count" nameKey="path" cx="50%" cy="50%" outerRadius={80}>
                {analytics.topPages.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#12121a', border: '1px solid #2a2a3a', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Top Events</h3>
          <div className="space-y-3">
            {analytics.topEvents.map((e: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{e.name}</span>
                <span className="text-sm font-medium text-white">{e.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
