import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { publicApi } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

export default function PricingSection() {
  const { data } = useQuery('pricing', () => publicApi.getPricing('nexorum'))
  const plans = data?.data?.data || []
  if (!plans.length) return null
  return (
    <section className="py-24 section-padding max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple Pricing</h2>
        <p className="text-gray-400">Start free, scale as you grow. No hidden fees.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan: any, i: number) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`card relative ${plan.is_popular ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
            {plan.is_popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}
            <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
            <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
            <div className="mb-6">
              {plan.is_enterprise ? <span className="text-3xl font-bold text-white">Custom</span> : (
                <><span className="text-4xl font-bold text-white">{formatCurrency(plan.price_monthly || 0)}</span><span className="text-gray-500">/mo</span></>
              )}
            </div>
            <ul className="space-y-3 mb-8">
              {(plan.features || []).map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400"><Check className="w-4 h-4 text-success shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-lg font-medium transition-all ${plan.is_popular ? 'bg-primary text-white hover:bg-primaryHover' : 'bg-surface border border-border text-gray-200 hover:border-primary/50'}`}>
              {plan.cta_text}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
