import { useState } from 'react'
import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import { Image, Trash2, Upload } from 'lucide-react'

export default function AdminMedia() {
  const [folder] = useState('root')
  const { data, refetch } = useQuery(['admin-media', folder], () => adminApi.getMedia(folder))
  const files = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete this file?')) return; await adminApi.deleteMedia(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Media</h1><p className="text-gray-500">Manage images, videos, and files</p></div>
        <button className="btn-primary flex items-center gap-2"><Upload className="w-4 h-4" /> Upload</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {files.map((file: any) => (
          <div key={file.id} className="card p-3 group relative">
            {file.mime_type.startsWith('image/') ? (
              <img src={file.url} alt={file.original_name} className="w-full aspect-square object-cover rounded-lg mb-2" />
            ) : (
              <div className="w-full aspect-square bg-surfaceHover rounded-lg flex items-center justify-center mb-2"><Image className="w-8 h-8 text-gray-500" /></div>
            )}
            <p className="text-xs text-gray-400 truncate">{file.original_name}</p>
            <button onClick={() => handleDelete(file)} className="absolute top-2 right-2 p-1.5 bg-danger/80 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
