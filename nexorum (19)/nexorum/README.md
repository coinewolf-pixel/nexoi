# Nexorum — AI-Native Business Operating System

## Stack
- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **Backend:** Cloudflare Workers + Hono
- **Database:** Supabase PostgreSQL
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime

## Quick Start

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Supabase Setup**
   - Create project at [supabase.com](https://supabase.com)
   - Run migrations from `supabase/migrations/`
   - Enable Storage bucket `media`
   - Create auth user `admin@nexorum.app` / `admin123`
   - Update `profiles.role` to `superadmin`

3. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and Cloudflare credentials.

4. **Development**
   ```bash
   npm run dev          # Vite dev server (port 3000)
   npm run deploy:api   # Deploy API to Cloudflare Workers
   npm run deploy:frontend  # Deploy frontend to Cloudflare Pages
   ```

## Deployment

### Cloudflare Workers (API)
```bash
npx wrangler deploy
```

### Cloudflare Pages (Frontend)
```bash
npm run build
npx wrangler pages deploy dist
```

## Features
- Multi-tenant SaaS architecture
- CMS with Pages, Blog, Sections
- CRM with Contacts & Deals pipeline
- Media Library with Supabase Storage
- Marketing: Testimonials, Partners, FAQ, Pricing, Roadmap
- Admin Dashboard with Analytics
- Role-based access control (RBAC)
- Audit logs & Analytics events
- Translation system
- Dark luxury UI with glassmorphism
