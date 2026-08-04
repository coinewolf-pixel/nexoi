import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { useBusinessStore } from '@/stores/useBusinessStore'

export default function PublicLayout() {
  const { fetchBusiness, fetchSettings, fetchTranslations } = useBusinessStore()

  useEffect(() => {
    fetchBusiness('nexorum')
    fetchSettings('nexorum')
    fetchTranslations('nexorum')
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
