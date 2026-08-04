import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBusinessStore } from '@/stores/useBusinessStore'

export default function HeroSection() {
  const { getTranslation } = useBusinessStore()
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="relative section-padding max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Native Business OS v1.0
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-gradient">{getTranslation('hero.title', 'The Future of Business is AI-Native')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {getTranslation('hero.subtitle', 'One platform. Infinite possibilities. Transform your operations with intelligent automation.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn-primary inline-flex items-center gap-2 text-lg">Get Started <ArrowRight className="w-5 h-5" /></Link>
            <button className="btn-secondary inline-flex items-center gap-2 text-lg"><Play className="w-5 h-5" /> Watch Demo</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mt-20">
          <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-surface/50 backdrop-blur-xl p-2">
            <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-surface to-surfaceHover flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto p-8">
                {[{ label: 'AI Agents', value: '24/7', color: 'text-primary' }, { label: 'Automation', value: '99.9%', color: 'text-accent' }, { label: 'Uptime', value: '∞', color: 'text-success' }].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className={`text-4xl font-bold ${s.color} mb-2`}>{s.value}</div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
