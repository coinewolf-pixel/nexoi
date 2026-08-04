import { Link } from 'react-router-dom'
import { Zap, Twitter, Linkedin, Mail } from 'lucide-react'
import { useBusinessStore } from '@/stores/useBusinessStore'

export default function Footer() {
  const { getSetting } = useBusinessStore()
  return (
    <footer className="border-t border-border/50 bg-surface/50">
      <div className="section-padding max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-gradient">Nexorum</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">{getSetting('site_description', 'AI-Native Business Operating System')}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href={getSetting('social_twitter', '#')} className="text-gray-500 hover:text-primary"><Twitter className="w-5 h-5" /></a>
              <a href={getSetting('social_linkedin', '#')} className="text-gray-500 hover:text-primary"><Linkedin className="w-5 h-5" /></a>
              <a href={`mailto:${getSetting('contact_email', 'hello@nexorum.app')}`} className="text-gray-500 hover:text-primary"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Nexorum. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
