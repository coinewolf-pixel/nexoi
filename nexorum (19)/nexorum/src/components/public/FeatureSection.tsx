import { motion } from 'framer-motion'
import { Brain, Workflow, BarChart3, Shield, Zap, Globe } from 'lucide-react'

const features = [
  { icon: Brain, title: 'AI Employees', description: 'Hire AI agents that work 24/7, handle customer support, sales, and operations autonomously.' },
  { icon: Workflow, title: 'Smart Automation', description: 'Build complex workflows with visual builder. Connect 200+ apps without writing code.' },
  { icon: BarChart3, title: 'Predictive Analytics', description: 'ML-powered insights that forecast trends, detect anomalies, and recommend actions.' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 compliant, end-to-end encryption, granular RBAC, and audit logs.' },
  { icon: Zap, title: 'Real-time Sync', description: 'Supabase Realtime ensures all your data stays synchronized across all devices.' },
  { icon: Globe, title: 'Omnichannel', description: 'Unified inbox for WhatsApp, Email, SMS, Voice, and Social Media.' },
]

export default function FeatureSection() {
  return (
    <section className="py-24 section-padding max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">A complete operating system for modern businesses, powered by artificial intelligence.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="card glow-border group">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
