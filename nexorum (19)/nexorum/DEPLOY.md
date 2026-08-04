# NEXORUM — Deployment Guide

## ⚠️ CRITICAL: Drag-and-Drop DOES NOT WORK

Cloudflare Pages **drag-and-drop uploader** does NOT support:
- Projects requiring build (npm install + npm run build)
- Projects with wrangler config in root

You MUST use **Git Integration**.

---

## Method 1: Cloudflare Pages + GitHub (RECOMMENDED)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nexorum.git
git push -u origin main
```

### Step 2: Connect in Cloudflare Dashboard
1. Go to **Cloudflare Dashboard** → **Pages**
2. Click **"Create a project"**
3. Select **"Connect to Git"**
4. Choose your GitHub repo

### Step 3: Build Settings
| Setting | Value |
|---------|-------|
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `dist` |
| **Deploy command** | *(leave empty)* |

### Step 4: Environment Variables
Add these in Dashboard → Settings → Environment variables:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://api.nexorum.app
```

### Step 5: Deploy
Click **Save and Deploy**. Cloudflare will build and deploy automatically.

---

## Method 2: Local Build + Drag-and-Drop (ADVANCED)

If you REALLY want drag-and-drop, you MUST build locally first:

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. The dist/ folder is now ready
# 4. Go to Cloudflare Dashboard → Pages → Upload assets
# 5. Select ONLY the dist/ folder (NOT the whole project)
```

**Note:** You still need to deploy the API separately (see below).

---

## API Deployment (Cloudflare Workers)

The API is in `api/` folder and deploys separately:

```bash
cd api
npm install
npx wrangler deploy
```

Set these secrets in Workers dashboard:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

---

## Supabase Setup (Required)

1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → New query
3. Run files from `supabase/migrations/` in order:
   - `00000000000000_initial_schema.sql`
   - `00000000000001_rls_policies.sql`
   - `00000000000002_seed_data.sql`
4. Enable Storage → Create bucket `media`
5. Go to Authentication → Create user:
   - Email: `admin@nexorum.app`
   - Password: `admin123`
6. Run in SQL Editor:
   ```sql
   UPDATE public.profiles SET role = 'superadmin' WHERE email = 'admin@nexorum.app';
   ```

---

## Troubleshooting

### "Could not detect static files"
→ You used `wrangler deploy` instead of Pages. Use Git integration or `wrangler pages deploy dist`.

### "This uploader does not yet support projects that require a build process"
→ Drag-and-drop doesn't build. Use Git integration.

### "wrangler config file detected"
→ The old `wrangler.jsonc` was in root. It's now moved to `api/`. Use Git integration.
