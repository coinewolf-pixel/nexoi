import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'

export default function AdminRoadmap() {
  const { data, refetch } = useQuery('admin-roadmap', () => adminApi.getRoadmap())
  const items = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; await adminApi.deleteRoadmapItem(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Roadmap</h1><p className="text-gray-500">Product roadmap and updates</p></div>
      <DataTable data={items} columns={[
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'completed' ? 'bg-success/10 text-success' : row.status === 'in_progress' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'}`}>{row.status.replace('_', ' ')}</span> },
        { key: 'quarter', label: 'Quarter' },
        { key: 'year', label: 'Year' }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="title" />
    </div>
  )
}
