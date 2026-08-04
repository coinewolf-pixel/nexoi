import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { publicApi } from '@/lib/api'
import { formatDate, truncate } from '@/lib/utils'

export default function BlogPage() {
  const { data, isLoading } = useQuery('blog-posts', () => publicApi.getBlogPosts('nexorum'))
  const posts = data?.data?.data || []
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
      <div className="section-padding max-w-7xl mx-auto py-16">
        <h1 className="text-4xl font-bold text-gradient mb-4">Blog</h1>
        <p className="text-gray-400 mb-12">Latest insights, updates, and tutorials.</p>
        {isLoading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any, i: number) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card group">
                {post.cover_image && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 -mt-2 -mx-2">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.published_at, 'short')}
                  {post.category && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{post.category.name}</span>}
                </div>
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{truncate(post.excerpt || '', 120)}</p>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:text-primaryHover transition-colors">Read more <ArrowRight className="w-4 h-4" /></Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
