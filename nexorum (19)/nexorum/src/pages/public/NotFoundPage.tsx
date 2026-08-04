import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, AlertTriangle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">This page doesn't exist in this dimension.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2"><Home className="w-4 h-4" /> Back Home</Link>
      </div>
    </motion.div>
  )
}
