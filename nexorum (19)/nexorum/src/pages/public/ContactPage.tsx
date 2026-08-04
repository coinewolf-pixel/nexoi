import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'
import { publicApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await publicApi.submitContact('nexorum', form)
      setIsSent(true)
      toast.success('Message sent successfully!')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
      <div className="section-padding max-w-7xl mx-auto py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gradient mb-4">Contact Us</h1>
          <p className="text-gray-400">We'd love to hear from you. Get in touch.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            {[{ icon: Mail, title: 'Email', text: 'hello@nexorum.app' }, { icon: Phone, title: 'Phone', text: '+1 (555) 123-4567' }, { icon: MapPin, title: 'Office', text: 'San Francisco, CA' }].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-primary" /></div>
                <div><h3 className="font-medium text-white mb-1">{item.title}</h3><p className="text-gray-400 text-sm">{item.text}</p></div>
              </div>
            ))}
          </div>
          {isSent ? (
            <div className="card flex flex-col items-center justify-center text-center py-16">
              <CheckCircle className="w-16 h-16 text-success mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-4">
              <div><label className="block text-sm font-medium text-gray-300 mb-1">Name</label><input type="text" required className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-1">Email</label><input type="email" required className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-1">Subject</label><input type="text" className="input-field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-1">Message</label><textarea required rows={4} className="input-field resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2">
                {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  )
}
