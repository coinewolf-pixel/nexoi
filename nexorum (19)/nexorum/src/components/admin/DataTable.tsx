import { useState } from 'react'
import { ChevronLeft, ChevronRight, Search, Plus, Pencil, Trash2 } from 'lucide-react'

interface DataTableProps {
  data: any[]
  columns: { key: string; label: string; render?: (row: any) => React.ReactNode }[]
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  onCreate?: () => void
  searchKey?: string
}

export default function DataTable({ data, columns, onEdit, onDelete, onCreate, searchKey }: DataTableProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10
  const filtered = searchKey ? data.filter((row) => String(row[searchKey]).toLowerCase().includes(search.toLowerCase())) : data
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        {searchKey && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search..." className="input-field pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        )}
        {onCreate && <button onClick={onCreate} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Create</button>}
      </div>
      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surfaceHover">
              {columns.map((col) => <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-300">{col.label}</th>)}
              {(onEdit || onDelete) && <th className="px-4 py-3 w-24" />}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={row.id || i} className="border-b border-border/50 hover:bg-surfaceHover/50 transition-colors">
                {columns.map((col) => <td key={col.key} className="px-4 py-3 text-gray-300">{col.render ? col.render(row) : String(row[col.key] || '-')}</td>)}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {onEdit && <button onClick={() => onEdit(row)} className="p-1.5 text-gray-400 hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button>}
                      {onDelete && <button onClick={() => onDelete(row)} className="p-1.5 text-gray-400 hover:text-danger transition-colors"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border border-border text-gray-400 hover:text-white disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-sm text-gray-400">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border border-border text-gray-400 hover:text-white disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  )
}
