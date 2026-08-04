import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBusinessStore } from '@/stores/useBusinessStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { getTranslation } = useBusinessStore()

  const links = [
    { to: '/', label: getTranslation('nav.home', 'Home') },
    { to: '/features', label: getTranslation('nav.features', 'Features') },
    { to: '/pricing', label: getTranslation('nav.pricing', 'Pricing') },
    { to: '/blog', label: getTranslation('nav.blog', 'Blog') },
    { to: '/contact', label: getTranslation('nav.contact', 'Contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gradient">Nexorum</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.to} to={link.to}
                className={`text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-primary' : 'text-gray-400 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="btn-primary text-sm">{getTranslation('cta.get_started', 'Get Started')}</Link>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50">
            <div className="section-padding py-4 space-y-3">
              {links.map((link) => (
                <Link key={link.to} to={link.to} className="block text-gray-400 hover:text-white py-2" onClick={() => setIsOpen(false)}>{link.label}</Link>
              ))}
              <Link to="/login" className="btn-primary block text-center text-sm">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
