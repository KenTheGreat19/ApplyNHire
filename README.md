# ApplyNHire - 100% Free Job Portal

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)
- Git

### Installation

1. **Clone and install dependencies:**
```bash
cd ApplyNHire
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `ADMIN_EMAIL`: Your admin email address
- `RESEND_API_KEY`: Get from https://resend.com (free tier available)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: (Optional) For Google OAuth

3. **Initialize the database:**
```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🏗️ Project Structure

```
ApplyNHire/
├── app/                    # Next.js 14 App Router
│   ├── (public)/          # Public pages (homepage, job details)
│   ├── admin/             # Admin dashboard
│   ├── applicant/         # Applicant dashboard
│   ├── auth/              # Authentication pages
│   ├── employer/          # Employer dashboard & job posting
│   ├── api/               # API routes (NextAuth, job submissions)
│   ├── layout.tsx         # Root layout with header/footer
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Sticky header with auth buttons
│   ├── Footer.tsx        # Site footer
│   ├── JobCard.tsx       # Job listing card
│   └── ...
├── lib/                   # Utility functions
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## ✨ Features

### For Employers
- ✅ **Free job posting** - Post unlimited jobs, no payment required
- ✅ **Dashboard** - Manage all your job postings
- ✅ **Job statistics** - Track views and applications
- ✅ **Direct applications** - Link to your career page

### For Applicants
- ✅ **Job search** - Filter by title, location, type, salary
- ✅ **Remote jobs** - Easy remote job identification
- ✅ **Application tracking** - View all your applications
- ✅ **Direct apply** - Apply directly on company websites

### For Admins
- ✅ **Job moderation** - Approve/reject job postings
- ✅ **User management** - View all employers and applicants
- ✅ **Analytics** - Platform statistics
- ✅ **Email notifications** - Auto-notify employers of job status

## 🔐 Authentication

- **Role-based access**: APPLICANT, EMPLOYER, ADMIN
- **NextAuth.js**: Secure email/password + Google OAuth
- **Separate auth flows**: Dedicated pages for employers and applicants

## 🎨 Design System

- **Primary Blue**: `#0A66C2` (LinkedIn-inspired)
- **Success Green**: `#10B981` (Apply buttons)
- **Warning Yellow**: `#F59E0B` (Pending status)
- **Error Red**: `#EF4444` (Rejected status)
- **Dark mode**: Full support via next-themes

## 📧 Email Notifications

Powered by **Resend** (free tier: 100 emails/day):
- Job submission confirmation (to admin)
- Job approval/rejection (to employer)
- Application confirmation (to applicant)

## 🗄️ Database Schema

```prisma
User (id, email, name, role, companyName)
  ↓
Job (id, title, company, location, type, applyUrl, status, salary, employerId)
  ↓
Application (id, jobId, applicantId, appliedAt)
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

**Database**: Use Supabase (free tier) or Vercel Postgres

### Environment Variables for Vercel
```
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
GOOGLE_CLIENT_ID=optional
GOOGLE_CLIENT_SECRET=optional
```

## 📝 License

MIT License - Free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! This is a 100% free platform with no monetization.

## 📞 Support

- Create an issue on GitHub
- Email: support@applynhire.com

---

**© 2025 ApplyNHire — Free Forever**
