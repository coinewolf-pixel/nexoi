import HeroSection from '@/components/public/HeroSection'
import FeatureSection from '@/components/public/FeatureSection'
import TestimonialsSection from '@/components/public/TestimonialsSection'
import PricingSection from '@/components/public/PricingSection'
import FAQSection from '@/components/public/FAQSection'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HeroSection />
      <FeatureSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
    </motion.div>
  )
}
