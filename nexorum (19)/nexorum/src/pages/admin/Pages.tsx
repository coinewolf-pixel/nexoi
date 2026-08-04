import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'

export default function AdminPages() {
  const { data, refetch } = useQuery('admin-pages', () => adminApi.getPages())
  const pages = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete this page?')) return; await adminApi.deletePage(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Pages</h1><p className="text-gray-500">Manage your website pages</p></div>
      <DataTable data={pages} columns={[
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'published' ? 'bg-success/10 text-success' : row.status === 'draft' ? 'bg-warning/10 text-warning' : 'bg-gray-500/10 text-gray-400'}`}>{row.status}</span> },
        { key: 'updated_at', label: 'Updated', render: (row) => formatDate(row.updated_at, 'short') }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="title" />
    </div>
  )
}
