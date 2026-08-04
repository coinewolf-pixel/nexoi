import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import HomePage from './pages/public/HomePage'
import FeaturesPage from './pages/public/FeaturesPage'
import PricingPage from './pages/public/PricingPage'
import BlogPage from './pages/public/BlogPage'
import BlogPostPage from './pages/public/BlogPostPage'
import ContactPage from './pages/public/ContactPage'
import AboutPage from './pages/public/AboutPage'
import NotFoundPage from './pages/public/NotFoundPage'
import AdminDashboard from './pages/admin/Dashboard'
import AdminPages from './pages/admin/Pages'
import AdminBlog from './pages/admin/Blog'
import AdminMedia from './pages/admin/Media'
import AdminContacts from './pages/admin/Contacts'
import AdminDeals from './pages/admin/Deals'
import AdminTestimonials from './pages/admin/Testimonials'
import AdminPartners from './pages/admin/Partners'
import AdminFAQ from './pages/admin/FAQ'
import AdminPricing from './pages/admin/Pricing'
import AdminRoadmap from './pages/admin/Roadmap'
import AdminAnnouncements from './pages/admin/Announcements'
import AdminSettings from './pages/admin/Settings'
import AdminTranslations from './pages/admin/Translations'
import AdminAnalytics from './pages/admin/Analytics'
import AdminAuditLogs from './pages/admin/AuditLogs'
import LoginPage from './pages/auth/LoginPage'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pages" element={<AdminPages />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="deals" element={<AdminDeals />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="faq" element={<AdminFAQ />} />
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="roadmap" element={<AdminRoadmap />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="translations" element={<AdminTranslations />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
