import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'

export default function AdminPartners() {
  const { data, refetch } = useQuery('admin-partners', () => adminApi.getPartners())
  const items = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; await adminApi.deletePartner(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Partners</h1><p className="text-gray-500">Partner logos and links</p></div>
      <DataTable data={items} columns={[
        { key: 'name', label: 'Name' },
        { key: 'website_url', label: 'Website', render: (row) => row.website_url ? <a href={row.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{row.website_url}</a> : '-' },
        { key: 'sort_order', label: 'Order' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-500/10 text-gray-400'}`}>{row.status}</span> }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="name" />
    </div>
  )
}
