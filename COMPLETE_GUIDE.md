# ApplyNHire - Complete Setup & Feature Guide

## ✅ COMPLETED FEATURES

### 1. Core Infrastructure ✅
- Next.js 14 with App Router
- TypeScript configuration
- Tailwind CSS + shadcn/ui components
- Prisma ORM with PostgreSQL
- Dark mode support
- Mobile responsive design
- SEO optimization (sitemap, robots.txt, meta tags)

### 2. Authentication System ✅
- NextAuth.js with JWT sessions
- Email/password authentication with bcryptjs
- Google OAuth integration
- Separate auth flows for employers and applicants
- Role-based access control (APPLICANT, EMPLOYER, ADMIN)
- Registration API with validation

### 3. Public Pages ✅
- **Homepage** (`/`): Hero section with search functionality
- **Job Search**: Filter by title, location, type, salary
- **Job Listings**: Server-side rendering with Prisma queries
- **Job Detail Pages** (`/jobs/[id]`): Full job information with apply button
- **Header**: Sticky navigation with two separate auth buttons
- **Footer**: Links and copyright

### 4. Employer Features ✅
- **Employer Dashboard** (`/employer/dashboard`):
  - Stats cards (Total, Pending, Approved, Rejected jobs)
  - Data table with all employer's jobs
  - Filter and search functionality
  - Pagination support
  
- **Job Management**:
  - Post new jobs via dialog form
  - Edit existing jobs
  - Delete jobs with confirmation
  - View application counts
  - Real-time status tracking (pending/approved/rejected)
  
- **Job Posting Form**:
  - Required fields: title, company, location, type, description, **applyUrl**
  - Optional: salary range (min/max)
  - Apply URL validation (must be valid URL)
  - Help text for apply link requirement
  - Real-time form validation with zod

### 5. Applicant Features ✅
- **Applicant Dashboard** (`/applicant/dashboard`):
  - View all applied jobs
  - Job cards with title, company, location, type
  - Applied date tracking
  - Quick links to job details and application pages
  - Profile editing section (name, email)
  - "Browse All Jobs" CTA

- **Application Tracking**:
  - Track application status
  - View application history
  - Access external apply links

### 6. Admin Portal ✅
- **Admin Dashboard** (`/admin`):
  - Access restricted to email in `ADMIN_EMAIL` env variable
  - Comprehensive statistics:
    - Total jobs, Pending, Approved, Rejected
    - Total employers, Total applicants
  
- **Job Management Table**:
  - View ALL jobs in the system
  - Columns: ID, Title, Company, Employer Email, Location, Type, Status, Apply Link, Posted Date, Updated Date, Actions
  - Search by title, company, or employer email
  - Filter by status (all/pending/approved/rejected)
  - Sortable columns
  
- **Admin Actions**:
  - **Approve**: One-click approval with auto-email to employer
  - **Reject**: Opens modal for rejection reason, sends email with reason
  - **Edit**: Opens job form to modify any field
  - **Delete**: Hard delete with confirmation dialog
  - **Status Dropdown**: Quick status changes with email notifications
  
- **Email Notifications**:
  - Employer receives approval email with job link
  - Employer receives rejection email with reason
  - Admin receives notification when new job is submitted

### 7. Email System ✅
- **Resend Integration** (configure with API key):
  - Job submitted notification (to admin)
  - Job approved email (to employer)
  - Job rejected email with reason (to employer)
  - Professional HTML email templates
  - ApplyNHire branding in emails
  - CTA buttons linking to dashboard/jobs

### 8. API Routes ✅
- `/api/jobs` - GET (employer's jobs), POST (create job)
- `/api/jobs/[id]` - GET, PATCH (update), DELETE
- `/api/applications` - GET (applicant's applications), POST (create)
- `/api/admin/jobs` - GET (all jobs for admin)
- `/api/admin/jobs/[id]/status` - PATCH (approve/reject)
- `/api/admin/stats` - GET (platform statistics)
- `/api/email/job-submitted` - POST (notify admin)
- `/api/email/job-approved` - POST (notify employer)
- `/api/email/job-rejected` - POST (notify employer with reason)

## 🚀 HOW TO RUN

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Resend account for emails (optional but recommended)

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file by copying `.env.example`:
```powershell
copy .env.example .env
```

Edit `.env` and fill in:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `ADMIN_EMAIL`: Your admin email address
- `RESEND_API_KEY`: Get from https://resend.com (sign up free)
- `RESEND_FROM_EMAIL`: Your verified sender email
- `NEXT_PUBLIC_APP_URL`: http://localhost:3000 (or your domain)

### Step 3: Setup Database
```powershell
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# (Optional) View database in Prisma Studio
npx prisma studio
```

### Step 4: Run Development Server
```powershell
npm run dev
```

Open http://localhost:3000 in your browser!

## 📧 EMAIL SETUP (RESEND)

1. Go to https://resend.com and sign up
2. Verify your domain (or use their test domain for development)
3. Get your API key from dashboard
4. Add to `.env`:
   ```
   RESEND_API_KEY="re_your_api_key_here"
   RESEND_FROM_EMAIL="ApplyNHire <noreply@yourdomain.com>"
   ```

**Test Mode**: Resend provides 100 free emails/day in development

## 👤 USER ROLES & ACCESS

### Applicants
- Register at `/auth/applicant`
- Dashboard: `/applicant/dashboard`
- Can: Browse jobs, view details, track applications

### Employers
- Register at `/auth/employer` (requires company name)
- Dashboard: `/employer/dashboard`
- Can: Post jobs, edit own jobs, delete own jobs, view stats

### Admin
- No registration - set your email in `ADMIN_EMAIL` env variable
- Dashboard: `/admin`
- Can: Approve/reject ALL jobs, edit ANY job, delete ANY job, view platform stats

## 📊 DATABASE SCHEMA

### User
- id, email, name, password (hashed)
- role: APPLICANT | EMPLOYER | ADMIN
- companyName (for employers)
- timestamps

### Job
- id, title, company, location, type
- description, applyUrl, salaryMin, salaryMax
- status: pending | approved | rejected
- employerId (foreign key)
- timestamps

### Application
- id, jobId, applicantId
- appliedAt timestamp

## 🎨 DESIGN FEATURES

- **Brand Color**: LinkedIn Blue (#0A66C2)
- **Dark Mode**: Automatic with system preference
- **Responsive**: Mobile-first design, works on all devices
- **Animations**: Smooth transitions and loading states
- **Icons**: Lucide React icon library
- **Toasts**: Sonner for notifications
- **Skeletons**: Loading states for better UX

## 🔒 SECURITY FEATURES

- Password hashing with bcryptjs (10 rounds)
- JWT sessions with NextAuth.js
- Role-based route protection
- Server-side session validation
- CSRF protection (NextAuth built-in)
- Environment variable security
- SQL injection prevention (Prisma ORM)

## 📁 KEY FILES

```
app/
├── page.tsx                          # Homepage
├── jobs/[id]/page.tsx               # Job detail pages
├── auth/employer/page.tsx           # Employer auth
├── auth/applicant/page.tsx          # Applicant auth
├── employer/dashboard/              # Employer dashboard
├── applicant/dashboard/             # Applicant dashboard
├── admin/                           # Admin portal
└── api/                             # API routes

components/
├── ui/                              # shadcn/ui components
├── Header.tsx                       # Navigation header
├── Footer.tsx                       # Footer
├── JobCard.tsx                      # Job listing cards
├── SearchBar.tsx                    # Search filters
├── JobsDataTable.tsx               # Employer jobs table
├── JobFormDialog.tsx               # Post/edit job form
└── ApplyButton.tsx                 # External apply button

lib/
├── prisma.ts                        # Prisma client
├── auth.ts                          # NextAuth config
└── utils.ts                         # Utility functions

prisma/
└── schema.prisma                    # Database schema
```

## ✅ PRODUCTION CHECKLIST

Before deploying to production:

1. ✅ Set strong `NEXTAUTH_SECRET`
2. ✅ Use production database (Supabase/Neon/etc)
3. ✅ Update `NEXT_PUBLIC_APP_URL` to your domain
4. ✅ Verify Resend domain for production emails
5. ✅ Set correct `ADMIN_EMAIL`
6. ✅ Enable Google OAuth (optional)
7. ✅ Run `npx prisma generate` and `npx prisma db push`
8. ✅ Test all email notifications
9. ✅ Check all auth flows (employer, applicant, admin)
10. ✅ Deploy to Vercel (recommended)

## 🚀 DEPLOYMENT TO VERCEL

```powershell
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

## 📚 TECHNOLOGY STACK

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Emails**: Resend
- **Forms**: react-hook-form + zod
- **Tables**: @tanstack/react-table
- **Icons**: lucide-react
- **Dates**: date-fns
- **Toasts**: sonner
- **Deployment**: Vercel

## 🎯 KEY FEATURES SUMMARY

✅ 100% Free forever - no payment processing
✅ External apply links - candidates apply on company sites
✅ Admin approval workflow for all jobs
✅ Email notifications for employers and admin
✅ Separate employer and applicant dashboards
✅ Full job management (CRUD operations)
✅ Search and filter functionality
✅ Role-based access control
✅ Dark mode support
✅ Mobile responsive
✅ SEO optimized
✅ Production ready

## 💡 ADMIN TIPS

1. **First-time setup**: Register as employer first to test, then set your email in `ADMIN_EMAIL` and restart server
2. **Approving jobs**: Jobs start as "pending" - approve them from admin panel at `/admin`
3. **Email testing**: Use Resend's test domain for development
4. **Database inspection**: Use `npx prisma studio` to view/edit database directly

## 🐛 TROUBLESHOOTING

**TypeScript errors before npm install?**
→ Normal! Run `npm install` first.

**Database connection error?**
→ Check `DATABASE_URL` in `.env` is correct.

**Admin dashboard not accessible?**
→ Ensure `ADMIN_EMAIL` matches your registered email, restart server.

**Emails not sending?**
→ Verify `RESEND_API_KEY` and domain, check Resend dashboard for errors.

**Port 3000 in use?**
→ Change port: `npm run dev -- -p 3001`

---

**🎉 You're all set! Visit http://localhost:3000 to see your job portal in action!**

For questions or issues, check the documentation in this file.
