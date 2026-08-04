
-- Seed a default business
INSERT INTO public.businesses (id, name, slug, description, plan, status, settings)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Nexorum',
  'nexorum',
  'AI-Native Business Operating System',
  'enterprise',
  'active',
  '{"brand": {"logo_text": "Nexorum", "tagline": "The Future of Business"}}'
);

-- Seed default pages
INSERT INTO public.pages (id, business_id, title, slug, status, is_homepage, sort_order, meta_title, meta_description)
VALUES 
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'Home', 'home', 'published', true, 0, 'Nexorum — AI-Native Business OS', 'Transform your business with AI-powered operating system. CRM, ERP, analytics, and automation in one platform.'),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'Features', 'features', 'published', false, 1, 'Features — Nexorum', 'Explore powerful features of Nexorum Business OS.'),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', 'Pricing', 'pricing', 'published', false, 2, 'Pricing — Nexorum', 'Flexible pricing plans for every business size.'),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', 'Blog', 'blog', 'published', false, 3, 'Blog — Nexorum', 'Latest news, insights, and updates from Nexorum.'),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000001', 'Contact', 'contact', 'published', false, 4, 'Contact — Nexorum', 'Get in touch with the Nexorum team.'),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000001', 'About', 'about', 'published', false, 5, 'About — Nexorum', 'Learn about Nexorum mission and team.');

-- Seed blog categories
INSERT INTO public.blog_categories (id, business_id, name, slug, description, sort_order)
VALUES 
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', 'Product Updates', 'product-updates', 'Latest features and improvements', 0),
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000001', 'Tutorials', 'tutorials', 'How-to guides and tutorials', 1),
  ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000001', 'Industry Insights', 'industry-insights', 'AI and business automation trends', 2);

-- Seed testimonials
INSERT INTO public.testimonials (id, business_id, author_name, author_title, author_company, content, rating, is_featured, sort_order, status)
VALUES 
  ('00000000-0000-0000-0000-000000000030', '00000000-0000-0000-0000-000000000001', 'Sarah Chen', 'CEO', 'TechFlow Inc', 'Nexorum transformed how we operate. The AI automation saved us 40 hours per week.', 5, true, 0, 'active'),
  ('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000001', 'Marcus Johnson', 'CTO', 'DataDrive', 'The CRM integration is seamless. Best business OS we have ever used.', 5, true, 1, 'active'),
  ('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000001', 'Elena Rodriguez', 'Operations Director', 'ScaleUp', 'From day one, Nexorum delivered value. The analytics dashboard is incredible.', 5, false, 2, 'active');

-- Seed partners
INSERT INTO public.partners (id, business_id, name, logo_url, website_url, description, sort_order, status)
VALUES 
  ('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000001', 'OpenAI', 'https://cdn.nexorum.app/partners/openai.svg', 'https://openai.com', 'AI Technology Partner', 0, 'active'),
  ('00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000001', 'Stripe', 'https://cdn.nexorum.app/partners/stripe.svg', 'https://stripe.com', 'Payment Processing', 1, 'active'),
  ('00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000001', 'Cloudflare', 'https://cdn.nexorum.app/partners/cloudflare.svg', 'https://cloudflare.com', 'Edge Infrastructure', 2, 'active'),
  ('00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000001', 'Supabase', 'https://cdn.nexorum.app/partners/supabase.svg', 'https://supabase.com', 'Database & Auth', 3, 'active');

-- Seed FAQ
INSERT INTO public.faqs (id, business_id, question, answer, category, sort_order, status)
VALUES 
  ('00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000001', 'What is Nexorum?', 'Nexorum is an AI-native business operating system that combines CRM, ERP, analytics, and automation in one unified platform.', 'General', 0, 'active'),
  ('00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000001', 'How does the AI automation work?', 'Our AI agents handle routine tasks, data entry, customer communications, and generate insights from your business data automatically.', 'Features', 1, 'active'),
  ('00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000001', 'Is my data secure?', 'Yes. We use enterprise-grade encryption, SOC 2 compliance, and granular access controls. Your data is never used to train AI models.', 'Security', 2, 'active'),
  ('00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000001', 'Can I integrate with existing tools?', 'Absolutely. Nexorum connects with 200+ tools including Slack, Salesforce, HubSpot, Zapier, and custom APIs.', 'Integrations', 3, 'active'),
  ('00000000-0000-0000-0000-000000000054', '00000000-0000-0000-0000-000000000001', 'What is the pricing?', 'We offer flexible plans from free tier to enterprise. Visit our pricing page for detailed information.', 'Pricing', 4, 'active');

-- Seed pricing plans
INSERT INTO public.pricing_plans (id, business_id, name, description, price_monthly, price_yearly, currency, features, is_popular, is_enterprise, sort_order, status)
VALUES 
  ('00000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000001', 'Starter', 'Perfect for small teams getting started', 29.00, 290.00, 'USD', '["Up to 5 users", "Basic CRM", "1,000 contacts", "Email support", "5GB storage", "Basic analytics"]', false, false, 0, 'active'),
  ('00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000001', 'Professional', 'For growing businesses that need more power', 79.00, 790.00, 'USD', '["Up to 25 users", "Advanced CRM", "Unlimited contacts", "Priority support", "50GB storage", "AI automation", "Custom workflows", "API access"]', true, false, 1, 'active'),
  ('00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000001', 'Enterprise', 'For large organizations with custom needs', NULL, NULL, 'USD', '["Unlimited users", "Full ERP suite", "Dedicated support", "Unlimited storage", "Custom AI models", "White-label options", "SLA guarantee", "On-premise option"]', false, true, 2, 'active');

-- Seed roadmap
INSERT INTO public.roadmap_items (id, business_id, title, description, status, quarter, year, sort_order)
VALUES 
  ('00000000-0000-0000-0000-000000000070', '00000000-0000-0000-0000-000000000001', 'AI Voice Assistant', 'Natural language voice interface for all platform operations', 'completed', 'Q2', 2024, 0),
  ('00000000-0000-0000-0000-000000000071', '00000000-0000-0000-0000-000000000001', 'WhatsApp Business Integration', 'Native WhatsApp automation and two-way messaging', 'completed', 'Q2', 2024, 1),
  ('00000000-0000-0000-0000-000000000072', '00000000-0000-0000-0000-000000000001', 'Crypto Payments', 'Accept Bitcoin, Ethereum, and stablecoins', 'in_progress', 'Q3', 2024, 2),
  ('00000000-0000-0000-0000-000000000073', '00000000-0000-0000-0000-000000000001', 'AI Agents Marketplace', 'Buy and sell custom AI agents', 'in_progress', 'Q3', 2024, 3),
  ('00000000-0000-0000-0000-000000000074', '00000000-0000-0000-0000-000000000001', 'Multi-Business Dashboard', 'Manage multiple businesses from single account', 'planned', 'Q4', 2024, 4),
  ('00000000-0000-0000-0000-000000000075', '00000000-0000-0000-0000-000000000001', 'Advanced Predictive Analytics', 'ML-powered forecasting and trend analysis', 'planned', 'Q4', 2024, 5);

-- Seed settings
INSERT INTO public.settings (id, business_id, key, value, group_name)
VALUES 
  ('00000000-0000-0000-0000-000000000080', '00000000-0000-0000-0000-000000000001', 'site_name', '"Nexorum"', 'general'),
  ('00000000-0000-0000-0000-000000000081', '00000000-0000-0000-0000-000000000001', 'site_description', '"AI-Native Business Operating System"', 'general'),
  ('00000000-0000-0000-0000-000000000082', '00000000-0000-0000-0000-000000000001', 'contact_email', '"hello@nexorum.app"', 'general'),
  ('00000000-0000-0000-0000-000000000083', '00000000-0000-0000-0000-000000000001', 'social_twitter', '"@nexorum"', 'social'),
  ('00000000-0000-0000-0000-000000000084', '00000000-0000-0000-0000-000000000001', 'social_linkedin', '"https://linkedin.com/company/nexorum"', 'social'),
  ('00000000-0000-0000-0000-000000000085', '00000000-0000-0000-0000-000000000001', 'seo_default_title', '"Nexorum — AI-Native Business OS"', 'seo'),
  ('00000000-0000-0000-0000-000000000086', '00000000-0000-0000-0000-000000000001', 'seo_default_description', '"Transform your business with AI-powered operating system."', 'seo');

-- Seed translations
INSERT INTO public.translations (id, business_id, locale, key, value, group_name)
VALUES 
  ('00000000-0000-0000-0000-000000000090', '00000000-0000-0000-0000-000000000001', 'en', 'nav.home', 'Home', 'navigation'),
  ('00000000-0000-0000-0000-000000000091', '00000000-0000-0000-0000-000000000001', 'en', 'nav.features', 'Features', 'navigation'),
  ('00000000-0000-0000-0000-000000000092', '00000000-0000-0000-0000-000000000001', 'en', 'nav.pricing', 'Pricing', 'navigation'),
  ('00000000-0000-0000-0000-000000000093', '00000000-0000-0000-0000-000000000001', 'en', 'nav.blog', 'Blog', 'navigation'),
  ('00000000-0000-0000-0000-000000000094', '00000000-0000-0000-0000-000000000001', 'en', 'nav.contact', 'Contact', 'navigation'),
  ('00000000-0000-0000-0000-000000000095', '00000000-0000-0000-0000-000000000001', 'en', 'cta.get_started', 'Get Started', 'cta'),
  ('00000000-0000-0000-0000-000000000096', '00000000-0000-0000-0000-000000000001', 'en', 'cta.learn_more', 'Learn More', 'cta'),
  ('00000000-0000-0000-0000-000000000097', '00000000-0000-0000-0000-000000000001', 'en', 'hero.title', 'The Future of Business is AI-Native', 'hero'),
  ('00000000-0000-0000-0000-000000000098', '00000000-0000-0000-0000-000000000001', 'en', 'hero.subtitle', 'One platform. Infinite possibilities. Transform your operations with intelligent automation.', 'hero');
