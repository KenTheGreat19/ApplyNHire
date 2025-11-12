# ApplyNHire - Deployment Guide

## 🚀 Vercel Deployment (Recommended)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: ApplyNHire job portal"
git branch -M main
git remote add origin https://github.com/yourusername/ApplyNHire.git
git push -u origin main
```

### Step 2: Set Up Database

**Option A: Supabase (Recommended - Free Tier)**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string (use "Transaction" mode)
5. Replace `[YOUR-PASSWORD]` with your actual password

Your `DATABASE_URL` will look like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

**Option B: Vercel Postgres**

1. In Vercel dashboard, go to Storage
2. Create Postgres database
3. Copy `POSTGRES_PRISMA_URL` as your `DATABASE_URL`

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

### Step 4: Set Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:

```
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_secret_key_generate_with_openssl
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
ADMIN_EMAIL=your-admin-email@example.com
RESEND_API_KEY=re_xxxxx_get_from_resend.com
RESEND_FROM_EMAIL=noreply@your-domain.com
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 5: Get Resend API Key (Free)

1. Go to [resend.com](https://resend.com)
2. Sign up (free tier: 100 emails/day, 3,000/month)
3. Go to API Keys → Create API Key
4. Copy and add to Vercel environment variables

### Step 6: Run Database Migration

After deployment, open Vercel terminal or run locally:

```bash
npx prisma db push
```

Or use Vercel's integrated Prisma commands.

### Step 7: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`
4. Update `RESEND_FROM_EMAIL` to use your domain

---

## 🔐 Google OAuth Setup (Optional)

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Go to APIs & Services → Credentials
4. Click "Create Credentials" → "OAuth client ID"
5. Configure OAuth consent screen
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-domain.vercel.app/api/auth/callback/google` (production)

### 2. Add to Environment Variables

```
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
```

---

## 📦 Alternative Deployment Options

### Netlify

```bash
npm run build
# Deploy .next folder to Netlify
```

Configure build settings:
- Build command: `npm run build`
- Publish directory: `.next`
- Add same environment variables as Vercel

### Railway

1. Connect GitHub repository
2. Add Postgres plugin
3. Copy `DATABASE_URL` from Postgres plugin
4. Add environment variables
5. Deploy

### Self-Hosted (VPS)

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/ApplyNHire.git
cd ApplyNHire

# Install dependencies
npm install

# Set up .env
cp .env.example .env
nano .env  # Add your credentials

# Push database schema
npx prisma generate
npx prisma db push

# Build
npm run build

# Run with PM2
npm install -g pm2
pm2 start npm --name "applynhire" -- start
pm2 save
pm2 startup
```

---

## 🔧 Post-Deployment Checklist

- [ ] Database is accessible and schema is pushed
- [ ] All environment variables are set
- [ ] Admin email is configured
- [ ] Resend API key is working (test by posting a job)
- [ ] Test employer signup and login
- [ ] Test applicant signup and login
- [ ] Test job posting and approval flow
- [ ] Test job search and filtering
- [ ] Check responsive design on mobile
- [ ] Verify dark mode works
- [ ] Test email notifications
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

---

## 🐛 Troubleshooting

### Database Connection Issues

If you see "Can't reach database server":
- Check `DATABASE_URL` format
- Ensure database is publicly accessible
- For Supabase: Use "Transaction" pooling mode
- Try adding `?pgbouncer=true` to connection string

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Prisma Issues

```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset
```

### Email Not Sending

- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for errors
- Ensure sender domain is verified in Resend
- Check free tier limits (100/day)

---

## 📊 Monitoring

### Vercel Analytics (Free)

1. Go to project → Analytics tab
2. Enable Web Analytics
3. View visitor data, page views, and performance

### Error Tracking

Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

---

## 🔄 Updating

To deploy updates:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy.

---

## 📈 Scaling

As your platform grows:

1. **Database**: Upgrade from free tier
2. **Email**: Upgrade Resend plan or use SendGrid
3. **Search**: Add Algolia for better job search
4. **CDN**: Use Cloudflare for static assets
5. **Caching**: Add Redis for session/query caching

---

## 💡 Next Features to Add

- Job alerts via email
- Advanced search with filters
- Company profiles with logos
- Resume upload for applicants
- Applicant tracking system (ATS)
- Job application analytics
- Social media sharing
- SEO sitemap generation

---

**Need Help?** Create an issue on GitHub or contact support.

© 2025 ApplyNHire — Free Forever
