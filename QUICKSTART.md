# 🚀 Quick Start Guide - ApplyNHire

## Step-by-Step Setup (5 minutes)

### 1️⃣ Install Dependencies

Open PowerShell in the ApplyNHire directory and run:

```powershell
npm install
```

This will install all required packages (may take 2-3 minutes).

### 2️⃣ Configure Environment Variables

The `.env` file already exists with default values. Update these critical fields:

```env
# Database - Use Supabase (free) or local PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/applynhire"

# Auth Secret - Generate a new one
NEXTAUTH_SECRET="development-secret-key-change-in-production"

# Admin Email - Your email for admin access
ADMIN_EMAIL="your-email@example.com"

# Resend API (optional for now, get free key at resend.com)
RESEND_API_KEY=""
```

**Quick PostgreSQL Setup Options:**

**A) Supabase (Recommended - Free, Cloud):**
1. Go to https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy "Connection string" (use Transaction mode)
5. Paste as `DATABASE_URL` in `.env`

**B) Local PostgreSQL:**
```powershell
# Install PostgreSQL from https://www.postgresql.org/download/windows/
# Then create database:
psql -U postgres
CREATE DATABASE applynhire;
# Update .env with: postgresql://postgres:yourpassword@localhost:5432/applynhire
```

### 3️⃣ Initialize Database

```powershell
npx prisma generate
npx prisma db push
```

This creates all tables in your database.

### 4️⃣ Start Development Server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

---

## 🎯 What's Working Now

After installation, you can:

### ✅ Browse Jobs (Homepage)
- Search by title, location, type, salary
- View job cards in responsive grid
- Click to see full job details

### ✅ Authentication
- **Employers:** http://localhost:3000/auth/employer
  - Sign up with company name
  - Login to account
  
- **Applicants:** http://localhost:3000/auth/applicant
  - Sign up and apply to jobs
  - Track applications

### ✅ Job Details
- Click any job card
- See full description
- External "Apply on Company Website" button

### ✅ UI Features
- Dark mode toggle (moon/sun icon in header)
- Responsive mobile design
- Loading skeletons
- Toast notifications

---

## 🚧 To Build Next

These features need to be implemented:

1. **Employer Dashboard** (`/employer/dashboard`)
   - View posted jobs
   - Post new jobs
   - Edit/delete jobs

2. **Applicant Dashboard** (`/applicant/dashboard`)
   - View applied jobs
   - Edit profile

3. **Admin Portal** (`/admin`)
   - Approve/reject jobs
   - Manage users
   - Platform statistics

4. **Email Notifications**
   - Job submission alerts
   - Approval/rejection emails

---

## 📝 Create Test Data

To test the app, you can manually add jobs via Prisma Studio:

```powershell
npm run db:studio
```

This opens a GUI at http://localhost:5555 where you can:
1. Create a test user (with role "EMPLOYER")
2. Add test jobs (set status to "approved" to show on homepage)

Or use SQL:

```sql
-- Create test employer
INSERT INTO "User" (id, email, name, password, role, "companyName") 
VALUES ('test1', 'employer@test.com', 'John Doe', '$2a$10$...', 'EMPLOYER', 'TechCorp');

-- Create test job
INSERT INTO "Job" (id, title, company, location, type, description, "applyUrl", status, "employerId") 
VALUES (
  'job1', 
  'Senior Developer', 
  'TechCorp', 
  'Remote', 
  'full_time', 
  'We are hiring a senior developer...', 
  'https://techcorp.com/careers', 
  'approved', 
  'test1'
);
```

---

## 🔧 Troubleshooting

### "Cannot find module" errors
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### Database connection errors
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- For Supabase: Use "Transaction" pooling mode

### Prisma errors
```powershell
npx prisma generate
npx prisma db push --force-reset
```

### Port 3000 already in use
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

---

## 📚 Project Structure

```
ApplyNHire/
├── app/
│   ├── page.tsx              ← Homepage with search & job grid
│   ├── layout.tsx            ← Root layout with header/footer
│   ├── auth/
│   │   ├── employer/         ← Employer login/signup
│   │   └── applicant/        ← Applicant login/signup
│   ├── jobs/[id]/            ← Job detail pages
│   └── api/auth/             ← NextAuth & registration
├── components/
│   ├── Header.tsx            ← Sticky header with auth buttons
│   ├── Footer.tsx            ← Footer with links
│   ├── JobCard.tsx           ← Job listing card
│   ├── SearchBar.tsx         ← Search filters
│   └── ui/                   ← shadcn/ui components
├── lib/
│   ├── prisma.ts             ← Database client
│   ├── auth.ts               ← NextAuth configuration
│   └── utils.ts              ← Helper functions
└── prisma/
    └── schema.prisma         ← Database schema
```

---

## 🎨 Color Palette

- **Primary Blue:** `#0A66C2` (LinkedIn-inspired)
- **Success Green:** `#10B981` (Apply buttons)
- **Warning Yellow:** `#F59E0B` (Pending)
- **Error Red:** `#EF4444` (Rejected)

---

## 🔑 Admin Access

To become admin:
1. Create account (employer or applicant)
2. Update `.env`: `ADMIN_EMAIL=your-email@example.com`
3. Restart server
4. Visit `/admin` (will be built)

---

## 📖 Documentation

- **README.md** - Project overview
- **DEPLOYMENT.md** - Vercel deployment guide
- **PROJECT_STATUS.md** - What's done, what's next

---

## 🆘 Get Help

- Check TypeScript errors in VS Code
- Read error messages in terminal
- Check browser console (F12)
- Review Prisma Studio for database issues

---

## 🎉 You're All Set!

Your ApplyNHire platform is running! 

**Current URL:** http://localhost:3000

**Next Steps:**
1. Create test employer account
2. Browse the homepage
3. Test dark mode
4. Check mobile responsiveness
5. Start building employer dashboard

Happy coding! 🚀
