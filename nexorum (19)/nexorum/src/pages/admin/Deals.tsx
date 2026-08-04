import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function AdminDeals() {
  const { data, refetch } = useQuery('admin-deals', () => adminApi.getDeals())
  const deals = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete this deal?')) return; await adminApi.deleteDeal(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Deals</h1><p className="text-gray-500">Sales pipeline and opportunities</p></div>
      <DataTable data={deals} columns={[
        { key: 'title', label: 'Title' },
        { key: 'value', label: 'Value', render: (row) => formatCurrency(row.value || 0, row.currency) },
        { key: 'stage', label: 'Stage', render: (row) => <span className="capitalize text-gray-300">{row.stage.replace('_', ' ')}</span> },
        { key: 'probability', label: 'Probability', render: (row) => `${row.probability || 0}%` },
        { key: 'expected_close_date', label: 'Close Date', render: (row) => row.expected_close_date ? formatDate(row.expected_close_date, 'short') : '-' }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="title" />
    </div>
  )
}
