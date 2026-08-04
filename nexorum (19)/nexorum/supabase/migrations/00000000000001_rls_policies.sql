
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PROFILES
-- ============================================================

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
  );

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_insert_trigger" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================
-- BUSINESSES
-- ============================================================

CREATE POLICY "businesses_select_members" ON public.businesses
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members WHERE business_id = id AND user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

CREATE POLICY "businesses_update_owner" ON public.businesses
  FOR UPDATE USING (
    owner_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.business_members WHERE business_id = id AND user_id = auth.uid() AND role IN ('owner', 'admin'))
  );

CREATE POLICY "businesses_insert_auth" ON public.businesses
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================
-- BUSINESS MEMBERS
-- ============================================================

CREATE POLICY "business_members_select" ON public.business_members
  FOR SELECT USING (
    user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin'))
  );

CREATE POLICY "business_members_manage" ON public.business_members
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin'))
  );

-- ============================================================
-- PAGES (public read for published)
-- ============================================================

CREATE POLICY "pages_select_public" ON public.pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "pages_select_admin" ON public.pages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

CREATE POLICY "pages_manage_admin" ON public.pages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ============================================================
-- BLOG POSTS (public read for published)
-- ============================================================

CREATE POLICY "blog_posts_select_public" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "blog_posts_select_admin" ON public.blog_posts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

CREATE POLICY "blog_posts_manage_admin" ON public.blog_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ============================================================
-- SECTIONS
-- ============================================================

CREATE POLICY "sections_select_public" ON public.sections
  FOR SELECT USING (status = 'active');

CREATE POLICY "sections_manage_admin" ON public.sections
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ============================================================
-- MEDIA
-- ============================================================

CREATE POLICY "media_select_public" ON public.media
  FOR SELECT USING (true);

CREATE POLICY "media_manage_admin" ON public.media
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
  );

-- ============================================================
-- TESTIMONIALS, PARTNERS, FAQ, PRICING, ROADMAP, ANNOUNCEMENTS
-- ============================================================

CREATE POLICY "marketing_select_public" ON public.testimonials
  FOR SELECT USING (status = 'active');
CREATE POLICY "marketing_manage_admin" ON public.testimonials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

CREATE POLICY "partners_select_public" ON public.partners
  FOR SELECT USING (status = 'active');
CREATE POLICY "partners_manage_admin" ON public.partners
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

CREATE POLICY "faqs_select_public" ON public.faqs
  FOR SELECT USING (status = 'active');
CREATE POLICY "faqs_manage_admin" ON public.faqs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

CREATE POLICY "pricing_select_public" ON public.pricing_plans
  FOR SELECT USING (status = 'active');
CREATE POLICY "pricing_manage_admin" ON public.pricing_plans
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

CREATE POLICY "roadmap_select_public" ON public.roadmap_items
  FOR SELECT USING (true);
CREATE POLICY "roadmap_manage_admin" ON public.roadmap_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

CREATE POLICY "announcements_select_public" ON public.announcements
  FOR SELECT USING (status = 'active' AND (start_at IS NULL OR start_at <= NOW()) AND (end_at IS NULL OR end_at >= NOW()));
CREATE POLICY "announcements_manage_admin" ON public.announcements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

-- ============================================================
-- CRM
-- ============================================================

CREATE POLICY "crm_select_members" ON public.contacts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid())
  );
CREATE POLICY "crm_manage_members" ON public.contacts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

CREATE POLICY "deals_select_members" ON public.deals
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid())
  );
CREATE POLICY "deals_manage_members" ON public.deals
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin', 'manager'))
  );

CREATE POLICY "activities_select_members" ON public.activities
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid())
  );
CREATE POLICY "activities_manage_members" ON public.activities
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid())
  );

-- ============================================================
-- AUDIT & ANALYTICS (admin only)
-- ============================================================

CREATE POLICY "audit_logs_select_admin" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin'))
  );

CREATE POLICY "analytics_select_admin" ON public.analytics_events
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin'))
  );

CREATE POLICY "analytics_insert_public" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- SETTINGS & TRANSLATIONS
-- ============================================================

CREATE POLICY "settings_select_public" ON public.settings
  FOR SELECT USING (true);
CREATE POLICY "settings_manage_admin" ON public.settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin'))
  );

CREATE POLICY "translations_select_public" ON public.translations
  FOR SELECT USING (true);
CREATE POLICY "translations_manage_admin" ON public.translations
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.business_members bm WHERE bm.business_id = business_id AND bm.user_id = auth.uid() AND bm.role IN ('owner', 'admin'))
  );
