import { useQuery } from 'react-query'
import { adminApi } from '@/lib/api'
import DataTable from '@/components/admin/DataTable'
import { formatDate } from '@/lib/utils'

export default function AdminBlog() {
  const { data, refetch } = useQuery('admin-blog', () => adminApi.getBlogPosts())
  const posts = data?.data?.data || []
  const handleDelete = async (row: any) => { if (!confirm('Delete this post?')) return; await adminApi.deleteBlogPost(row.id); refetch() }
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Blog</h1><p className="text-gray-500">Manage blog posts</p></div>
      <DataTable data={posts} columns={[
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
        { key: 'status', label: 'Status', render: (row) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'published' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{row.status}</span> },
        { key: 'published_at', label: 'Published', render: (row) => row.published_at ? formatDate(row.published_at, 'short') : '-' }
      ]} onEdit={(row) => console.log('Edit', row)} onDelete={handleDelete} onCreate={() => console.log('Create')} searchKey="title" />
    </div>
  )
}
