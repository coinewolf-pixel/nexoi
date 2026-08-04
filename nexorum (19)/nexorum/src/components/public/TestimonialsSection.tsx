import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { publicApi } from '@/lib/api'

export default function TestimonialsSection() {
  const { data } = useQuery('testimonials', () => publicApi.getTestimonials('nexorum'))
  const testimonials = data?.data?.data || []
  if (!testimonials.length) return null
  return (
    <section className="py-24 section-padding max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Loved by Teams</h2>
        <p className="text-gray-400">See what our customers say about Nexorum.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t: any, i: number) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card relative">
            <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-warning text-warning" />)}
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{t.content}</p>
            <div className="flex items-center gap-3">
              {t.author_avatar ? (
                <img src={t.author_avatar} alt={t.author_name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">{t.author_name[0]}</div>
              )}
              <div>
                <div className="font-medium text-white text-sm">{t.author_name}</div>
                <div className="text-gray-500 text-xs">{t.author_title}{t.author_company && `, ${t.author_company}`}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
