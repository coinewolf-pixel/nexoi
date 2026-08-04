import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { adminApi } from '@/lib/api'
import { Save, Trash2, Plus } from 'lucide-react'
import DataTable from '@/components/admin/DataTable'
import toast from 'react-hot-toast'

export default function AdminTranslations() {
  const [locale, setLocale] = useState('en')
  const { data, refetch } = useQuery(['admin-translations', locale], () => adminApi.getTranslations(locale))
  const items = data?.data?.data || []

  const saveMutation = useMutation((t: any) => adminApi.saveTranslation(t), {
    onSuccess: () => { refetch(); toast.success('Saved!') },
    onError: () => toast.error('Failed to save')
  })

  const deleteMutation = useMutation((id: string) => adminApi.deleteTranslation(id), {
    onSuccess: () => { refetch(); toast.success('Deleted!') },
    onError: () => toast.error('Failed to delete')
  })

  const [newTrans, setNewTrans] = useState({ key: '', value: '', group_name: 'general' })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Translations</h1><p className="text-gray-500">Manage content translations</p></div>
        <select className="input-field w-32" value={locale} onChange={(e) => setLocale(e.target.value)}>
          <option value="en">English</option>
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>
      </div>
      <div className="card space-y-4">
        <h3 className="font-semibold text-white">Add New</h3>
        <div className="flex gap-4">
          <input placeholder="Key" className="input-field flex-1" value={newTrans.key} onChange={(e) => setNewTrans({ ...newTrans, key: e.target.value })} />
          <input placeholder="Value" className="input-field flex-1" value={newTrans.value} onChange={(e) => setNewTrans({ ...newTrans, value: e.target.value })} />
          <button onClick={() => { saveMutation.mutate({ ...newTrans, locale }); setNewTrans({ key: '', value: '', group_name: 'general' }) }} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button>
        </div>
      </div>
      <DataTable data={items} columns={[
        { key: 'key', label: 'Key' },
        { key: 'value', label: 'Value', render: (row) => <span className="truncate max-w-xs block">{row.value}</span> },
        { key: 'group_name', label: 'Group' }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={(row) => deleteMutation.mutate(row.id)} searchKey="key" />
    </div>
  )
}
