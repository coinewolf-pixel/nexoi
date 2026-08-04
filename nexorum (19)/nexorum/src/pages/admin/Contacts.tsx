import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'

export default function AdminContacts() {
  const { data, refetch } = useQuery('admin-contacts', () => adminApi.getContacts())
  const contacts = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete this contact?')) return; await adminApi.deleteContact(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Contacts</h1><p className="text-gray-500">CRM contacts and leads</p></div>
      <DataTable data={contacts} columns={[
        { key: 'first_name', label: 'Name', render: (row) => `${row.first_name || ''} ${row.last_name || ''}` },
        { key: 'email', label: 'Email' },
        { key: 'company', label: 'Company' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'customer' ? 'bg-success/10 text-success' : row.status === 'lead' ? 'bg-primary/10 text-primary' : 'bg-gray-500/10 text-gray-400'}`}>{row.status}</span> },
        { key: 'created_at', label: 'Created', render: (row) => formatDate(row.created_at, 'short') }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="email" />
    </div>
  )
}
