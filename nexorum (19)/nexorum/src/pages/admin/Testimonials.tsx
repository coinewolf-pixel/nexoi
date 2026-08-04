import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'

export default function AdminTestimonials() {
  const { data, refetch } = useQuery('admin-testimonials', () => adminApi.getTestimonials())
  const items = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; await adminApi.deleteTestimonial(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Testimonials</h1><p className="text-gray-500">Customer reviews and testimonials</p></div>
      <DataTable data={items} columns={[
        { key: 'author_name', label: 'Author' },
        { key: 'author_company', label: 'Company' },
        { key: 'rating', label: 'Rating' },
        { key: 'is_featured', label: 'Featured', render: (row) => row.is_featured ? 'Yes' : 'No' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-500/10 text-gray-400'}`}>{row.status}</span> }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="author_name" />
    </div>
  )
}
