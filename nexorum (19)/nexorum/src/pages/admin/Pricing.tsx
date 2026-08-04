import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'
import { formatCurrency } from '@/lib/utils'

export default function AdminPricing() {
  const { data, refetch } = useQuery('admin-pricing', () => adminApi.getPricingPlans())
  const items = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; await adminApi.deletePricingPlan(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Pricing Plans</h1><p className="text-gray-500">Manage subscription plans</p></div>
      <DataTable data={items} columns={[
        { key: 'name', label: 'Name' },
        { key: 'price_monthly', label: 'Monthly', render: (row) => row.price_monthly ? formatCurrency(row.price_monthly) : 'Custom' },
        { key: 'is_popular', label: 'Popular', render: (row) => row.is_popular ? 'Yes' : 'No' },
        { key: 'is_enterprise', label: 'Enterprise', render: (row) => row.is_enterprise ? 'Yes' : 'No' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-500/10 text-gray-400'}`}>{row.status}</span> }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="name" />
    </div>
  )
}
