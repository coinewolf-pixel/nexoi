import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { publicApi } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export default function BlogPostPage() {
  const { slug } = useParams()
  const { data, isLoading } = useQuery(['blog-post', slug], () => publicApi.getBlogPost('nexorum', slug!))
  const post = data?.data?.data
  if (isLoading) return <div className="min-h-screen pt-24 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>
  if (!post) return <div className="min-h-screen pt-24 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-white mb-2">Post not found</h1><Link to="/blog" className="text-primary hover:underline">Back to blog</Link></div></div>
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
      <article className="section-padding max-w-4xl mx-auto py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> Back to blog</Link>
        {post.cover_image && <div className="aspect-video rounded-2xl overflow-hidden mb-8"><img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" /></div>}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(post.published_at, 'short')}</span>
          {post.author && <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author.full_name}</span>}
        </div>
        <h1 className="text-4xl font-bold text-white mb-8">{post.title}</h1>
        <div className="prose prose-invert max-w-none">
          {Array.isArray(post.content) ? post.content.map((block: any, i: number) => (
            <p key={i} className="text-gray-300 leading-relaxed mb-4">{block.text || JSON.stringify(block)}</p>
          )) : <p className="text-gray-300 leading-relaxed">{post.content}</p>}
        </div>
      </article>
    </motion.div>
  )
}
