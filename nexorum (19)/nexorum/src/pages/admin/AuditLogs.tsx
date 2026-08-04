import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'

export default function AdminAuditLogs() {
  const { data } = useQuery('admin-audit-logs', () => adminApi.getAuditLogs())
  const logs = data?.data?.data || []
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Audit Logs</h1><p className="text-gray-500">Security and activity logs</p></div>
      <DataTable data={logs} columns={[
        { key: 'action', label: 'Action' },
        { key: 'entity_type', label: 'Entity' },
        { key: 'entity_id', label: 'Entity ID', render: (row) => <span className="font-mono text-xs">{row.entity_id?.slice(0, 8)}...</span> },
        { key: 'ip_address', label: 'IP' },
        { key: 'created_at', label: 'Time', render: (row) => formatDate(row.created_at, 'short') }
      ]} searchKey="action" />
    </div>
  )
}
