import PricingSection from '@/components/public/PricingSection'
import { motion } from 'framer-motion'

export default function PricingPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
      <div className="section-padding max-w-7xl mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold text-gradient mb-4">Pricing</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your business.</p>
      </div>
      <PricingSection />
    </motion.div>
  )
}
