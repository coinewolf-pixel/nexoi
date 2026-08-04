import { motion } from 'framer-motion'
import { Target, Users, Rocket, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
      <div className="section-padding max-w-4xl mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold text-gradient mb-6">About Nexorum</h1>
        <p className="text-xl text-gray-400 leading-relaxed mb-16">We're building the operating system for the AI era. Our mission is to democratize enterprise-grade business automation and make it accessible to every company, regardless of size or technical expertise.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {[{ icon: Target, title: 'Our Mission', text: 'Empower every business with AI-native tools that were previously only available to tech giants.' }, { icon: Users, title: 'Our Team', text: 'World-class engineers, designers, and AI researchers from Google, OpenAI, Stripe, and more.' }, { icon: Rocket, title: 'Our Vision', text: 'A world where businesses operate at the speed of thought, powered by intelligent agents.' }, { icon: Heart, title: 'Our Values', text: 'Customer obsession, radical transparency, and relentless pursuit of excellence.' }].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
