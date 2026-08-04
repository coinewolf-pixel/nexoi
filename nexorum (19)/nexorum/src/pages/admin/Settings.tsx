import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { adminApi } from '@/lib/api'
import { Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminSettings() {
  const { data } = useQuery('admin-settings', () => adminApi.getSettings())
  const settings = data?.data?.data || []
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState<Record<string, string>>({})

  const saveMutation = useMutation((s: any) => adminApi.saveSetting(s), {
    onSuccess: () => { queryClient.invalidateQueries('admin-settings'); toast.success('Saved!') },
    onError: () => toast.error('Failed to save')
  })

  const handleSave = (key: string, group: string) => {
    const value = editing[key]
    if (value === undefined) return
    saveMutation.mutate({ key, value: JSON.parse(value), group_name: group })
  }

  const grouped = settings.reduce((acc: any, s: any) => {
    acc[s.group_name] = acc[s.group_name] || []
    acc[s.group_name].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      <div><h1 className="text-2xl font-bold text-white">Settings</h1><p className="text-gray-500">Configure your business settings</p></div>
      {Object.entries(grouped).map(([group, items]: [string, any]) => (
        <div key={group} className="card">
          <h3 className="text-lg font-semibold text-white mb-4 capitalize">{group}</h3>
          <div className="space-y-4">
            {items.map((s: any) => (
              <div key={s.key} className="flex items-center gap-4">
                <label className="w-40 text-sm text-gray-400 shrink-0">{s.key}</label>
                <input type="text" className="input-field flex-1" defaultValue={JSON.stringify(s.value)} onChange={(e) => setEditing({ ...editing, [s.key]: e.target.value })} />
                <button onClick={() => handleSave(s.key, s.group_name)} className="btn-primary px-3 py-2" disabled={saveMutation.isLoading}>
                  {saveMutation.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
