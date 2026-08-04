import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'

export default function AdminAnnouncements() {
  const { data, refetch } = useQuery('admin-announcements', () => adminApi.getAnnouncements())
  const items = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; await adminApi.deleteAnnouncement(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Announcements</h1><p className="text-gray-500">Site-wide announcements and banners</p></div>
      <DataTable data={items} columns={[
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.type === 'warning' ? 'bg-warning/10 text-warning' : row.type === 'success' ? 'bg-success/10 text-success' : row.type === 'error' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>{row.type}</span> },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-500/10 text-gray-400'}`}>{row.status}</span> },
        { key: 'created_at', label: 'Created', render: (row) => formatDate(row.created_at, 'short') }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="title" />
    </div>
  )
}
