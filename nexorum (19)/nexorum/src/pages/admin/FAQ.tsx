import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'

export default function AdminFAQ() {
  const { data, refetch } = useQuery('admin-faqs', () => adminApi.getFAQs())
  const items = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; await adminApi.deleteFAQ(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">FAQ</h1><p className="text-gray-500">Frequently asked questions</p></div>
      <DataTable data={items} columns={[
        { key: 'question', label: 'Question', render: (row) => <span className="truncate max-w-xs block">{row.question}</span> },
        { key: 'category', label: 'Category' },
        { key: 'sort_order', label: 'Order' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-500/10 text-gray-400'}`}>{row.status}</span> }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="question" />
    </div>
  )
}
