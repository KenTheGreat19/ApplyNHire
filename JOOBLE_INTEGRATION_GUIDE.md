# Jooble API Integration Guide

## Overview
This integration allows you to fetch job postings from Jooble, review them in an admin dashboard, and display approved jobs as advertisements on your website.

## Security
✅ **API Key is secure** - Stored in `.env` file (server-side only)
✅ **Never exposed to client** - All API calls happen server-side
✅ **Gitignored** - `.env` file is excluded from version control

## Setup Complete

### 1. Environment Variables
Your Jooble API key is already configured in `.env`:
```
JOOBLE_API_KEY=3c1af94e-4e00-4dd8-b148-31592556555a
```

### 2. Database Schema
The `JoobleJob` table has been created with the following fields:
- `id` - Unique identifier
- `title` - Job title/position
- `description` - Job description
- `location` - Job exact location
- `company` - Employer/company name
- `link` - Direct link to Jooble job posting
- `salary` - Salary information (if available)
- `type` - Employment type (Full-time, Part-time, etc.)
- `snippet` - Brief job summary
- `source` - Job source
- `status` - PENDING / APPROVED / REJECTED
- `approvedBy` - Admin who approved (optional)
- `approvedAt` - Approval timestamp (optional)
- `rejectedBy` - Admin who rejected (optional)
- `rejectedAt` - Rejection timestamp (optional)
- `createdAt` - When fetched from Jooble
- `updatedAt` - Last updated

## How to Use

### For Admins

#### 1. Access Admin Dashboard
Navigate to: `/admin/jooble`

#### 2. Fetch Jobs from Jooble
- Enter search keywords (e.g., "software developer")
- Enter location (e.g., "New York")
- Click "Fetch Jobs"
- Jobs will be saved with status "PENDING"

#### 3. Review & Approve/Reject
- View all pending jobs in the dashboard
- Review job details (title, company, location, description)
- Click "Approve" to make visible as advertisement
- Click "Reject" to hide from public view
- Click "View on Jooble" to see original posting

#### 4. Manage Approved Jobs
- View all approved jobs
- Reject previously approved jobs if needed
- Monitor which jobs are currently displayed

### For Applicants (Public)

#### Job Advertisements Display
Approved Jooble jobs appear as advertisements in:
- **Home Page** - Between job listings and trending jobs section
- **Job Detail Pages** - In the sidebar (3 random ads)

#### Advertisement Features
- Shows job title, company, location
- Displays brief snippet/description
- "Apply on Jooble" button links directly to Jooble
- Opens in new tab when clicked
- Clearly labeled as "Featured Jobs from Jooble"

## API Endpoints

### Fetch Jobs (Admin Only)
```
POST /api/admin/jooble/fetch
Body: { keywords: string, location: string }
Response: { message: string, count: number, jobs: JoobleJob[] }
```

### Approve Job (Admin Only)
```
POST /api/admin/jooble/approve
Body: { jobId: string }
Response: { message: string, job: JoobleJob }
```

### Reject Job (Admin Only)
```
POST /api/admin/jooble/reject
Body: { jobId: string }
Response: { message: string, job: JoobleJob }
```

### Get Approved Jobs (Public)
```
GET /api/jooble/approved?limit=10&random=true
Response: JoobleJob[]
```

## Files Created/Modified

### New Files
- `app/api/admin/jooble/fetch/route.ts` - Fetch jobs from Jooble
- `app/api/admin/jooble/approve/route.ts` - Approve pending jobs
- `app/api/admin/jooble/reject/route.ts` - Reject jobs
- `app/api/jooble/approved/route.ts` - Get approved jobs (public)
- `app/admin/jooble/page.tsx` - Admin dashboard UI
- `components/JoobleAdDisplay.tsx` - Advertisement component

### Modified Files
- `prisma/schema.prisma` - Added JoobleJob model
- `.env` - Added JOOBLE_API_KEY
- `.env.example` - Documented JOOBLE_API_KEY
- `app/page.tsx` - Added JoobleAdDisplay to home page
- `app/jobs/[id]/page.tsx` - Already had JoobleAdDisplay

## Testing

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Admin Workflow
1. Navigate to `http://localhost:3000/admin/jooble`
2. Enter keywords: "developer"
3. Enter location: "Remote"
4. Click "Fetch Jobs"
5. Approve a few jobs
6. Check they appear in "Approved Jobs" section

### 3. Test Public Display
1. Navigate to home page
2. Scroll down - you should see "Featured Jobs from Jooble" section
3. Navigate to any job detail page
4. Check sidebar for Jooble advertisements

### 4. Test Apply Flow
1. Click "Apply on Jooble" on any advertisement
2. Should open Jooble job page in new tab
3. User applies directly on Jooble (not your site)

## Customization

### Change Ad Display Count
Edit `JoobleAdDisplay` component usage:
```tsx
<JoobleAdDisplay limit={6} random={true} />
```

### Change Ad Styling
Edit `components/JoobleAdDisplay.tsx`:
- Modify Card styling
- Change button colors
- Adjust layout

### Add More Search Fields
Edit `app/admin/jooble/page.tsx`:
- Add more input fields (salary range, job type, etc.)
- Update fetch API call

### Filter Ads by Location/Type
Edit `app/api/jooble/approved/route.ts`:
- Add query parameters
- Filter results before returning

## Troubleshooting

### "Failed to fetch jobs"
- Check JOOBLE_API_KEY in `.env` is correct
- Verify Jooble API is accessible
- Check console for error details

### No ads showing
- Ensure you've approved at least one job in admin dashboard
- Check browser console for errors
- Verify API endpoint `/api/jooble/approved` returns data

### Database errors
- Run `npx prisma generate`
- Run `npx prisma db push`
- Restart development server

## Production Deployment

### 1. Set Environment Variable
Add to your hosting platform (Vercel, Netlify, etc.):
```
JOOBLE_API_KEY=3c1af94e-4e00-4dd8-b148-31592556555a
```

### 2. Deploy
- Push code to Git (`.env` is gitignored, API key is safe)
- Deploy normally
- Set environment variable in hosting dashboard

### 3. Verify
- Access `/admin/jooble` on production
- Fetch and approve jobs
- Check ads display correctly

## Support
For Jooble API documentation: https://jooble.org/api/about
