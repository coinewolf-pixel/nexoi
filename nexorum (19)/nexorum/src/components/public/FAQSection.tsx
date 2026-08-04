import { useState } from 'react'
import { useQuery } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { publicApi } from '@/lib/api'

export default function FAQSection() {
  const { data } = useQuery('faqs', () => publicApi.getFAQs('nexorum'))
  const faqs = data?.data?.data || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  if (!faqs.length) return null
  return (
    <section className="py-24 section-padding max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked</h2>
        <p className="text-gray-400">Everything you need to know about Nexorum.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq: any, index: number) => (
          <div key={faq.id} className="card p-0 overflow-hidden">
            <button className="w-full px-6 py-4 flex items-center justify-between text-left" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
              <span className="font-medium text-white">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
