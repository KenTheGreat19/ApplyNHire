# ✅ ApplyNHire Testing Checklist

Use this checklist to verify all features are working correctly.

## 🚀 Initial Setup

- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Configure all environment variables in `.env`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000

## 👔 Employer Features

### Registration & Authentication
- [ ] Navigate to `/auth/employer`
- [ ] Register with email, password, name, and **company name**
- [ ] Verify redirect to `/employer/dashboard` after registration
- [ ] Log out and log back in
- [ ] Verify session persists

### Employer Dashboard
- [ ] See welcome message with your name
- [ ] See company name displayed
- [ ] Verify 4 stats cards display (Total, Pending, Approved, Rejected)
- [ ] Click "Post New Job" button

### Job Posting Form
- [ ] Form opens in modal/dialog
- [ ] Fill in all required fields:
  - [ ] Job title (min 3 characters)
  - [ ] Company name (pre-filled)
  - [ ] Location (e.g., "New York" or "Remote")
  - [ ] Employment type (select from dropdown)
  - [ ] Job description (min 50 characters)
  - [ ] **Apply URL** (e.g., `https://example.com/apply`)
- [ ] Fill optional fields (salary min/max)
- [ ] Verify apply URL validation (must be valid URL)
- [ ] See helper text: "Applicants will be redirected here to apply..."
- [ ] Submit form
- [ ] Verify success toast notification
- [ ] Verify job appears in dashboard table with "PENDING" status

### Job Management
- [ ] See job in data table with all details
- [ ] Test search by job title
- [ ] Click "View Job" - opens in new tab
- [ ] Click "Edit" button
- [ ] Modify job details in form
- [ ] Submit changes
- [ ] Verify updates appear in table
- [ ] Click "Delete" button
- [ ] See confirmation dialog
- [ ] Confirm deletion
- [ ] Verify job removed from table

### Stats Updates
- [ ] Post multiple jobs
- [ ] Verify stats cards update (Total count increases)
- [ ] Note all new jobs are "Pending"

## 🎯 Applicant Features

### Registration & Authentication
- [ ] Navigate to `/auth/applicant`
- [ ] Register with email, password, and name (no company name)
- [ ] Verify redirect to `/applicant/dashboard`
- [ ] Log out and log back in

### Applicant Dashboard
- [ ] See welcome message with your name
- [ ] See "Your Applications" section
- [ ] Initially shows empty state
- [ ] See "Browse All Jobs" button
- [ ] Click "Browse All Jobs" → redirects to homepage

### Profile Editing
- [ ] See "Your Profile" section
- [ ] Edit name field
- [ ] Edit email field
- [ ] Click "Save Changes"
- [ ] See success toast
- [ ] Refresh page, verify changes persisted

### Application Tracking
- [ ] Browse to homepage
- [ ] Find an approved job
- [ ] Click external apply link (opens in new tab)
- [ ] Return to applicant dashboard
- [ ] See applied job in list (if application was created)
- [ ] Verify shows: Title, Company, Location, Type, Applied Date
- [ ] Click "View Job" button
- [ ] Click "Application Link" button

## 👨‍💼 Admin Features

### Admin Access
- [ ] Set your email in `.env`: `ADMIN_EMAIL="your@email.com"`
- [ ] Restart server: Stop and run `npm run dev` again
- [ ] Navigate to `/admin`
- [ ] Verify access granted

### Admin Dashboard
- [ ] See "Admin Portal" title
- [ ] See 6 stats cards:
  - [ ] Total Jobs
  - [ ] Pending Jobs
  - [ ] Approved Jobs
  - [ ] Rejected Jobs
  - [ ] Total Employers
  - [ ] Total Applicants
- [ ] Verify counts are accurate

### Job Management Table
- [ ] See "All Job Postings" data table
- [ ] Verify shows ALL jobs from ALL employers
- [ ] Check columns present:
  - [ ] Title
  - [ ] Company
  - [ ] Employer Email (clickable mailto link)
  - [ ] Location
  - [ ] Type (badge)
  - [ ] Status (dropdown)
  - [ ] Apply Link (opens in new tab)
  - [ ] Posted Date
  - [ ] Updated Date
  - [ ] Actions

### Search & Filter
- [ ] Type in search box (filters by title/company/email)
- [ ] Verify results update in real-time
- [ ] Clear search
- [ ] Use status filter dropdown (All/Pending/Approved/Rejected)
- [ ] Verify only jobs with selected status show
- [ ] Click employer email link → opens mailto

### Approve Job
- [ ] Find a pending job in table
- [ ] Click green checkmark (Approve) button
- [ ] Verify status changes to "APPROVED"
- [ ] Verify "Updated" date changes to today
- [ ] Check employer's email inbox for approval notification
- [ ] Email should have:
  - [ ] "Congratulations!" subject
  - [ ] Job details
  - [ ] "View Job Posting" button
  - [ ] "Go to Dashboard" button

### Reject Job
- [ ] Find another pending job
- [ ] Click red X (Reject) button
- [ ] See rejection modal open
- [ ] Type rejection reason (e.g., "Description too short")
- [ ] Click "Reject Job"
- [ ] Verify modal closes
- [ ] Verify status changes to "REJECTED"
- [ ] Check employer's email for rejection notification
- [ ] Email should have:
  - [ ] "Requires Changes" subject
  - [ ] Job details
  - [ ] Rejection reason in highlighted box
  - [ ] "Go to Dashboard" button

### Status Dropdown
- [ ] Click status dropdown on any job
- [ ] Change to different status (Pending/Approved/Rejected)
- [ ] Verify status updates immediately
- [ ] Verify employer receives email (if changed to approved/rejected)

### Edit Job (Admin)
- [ ] Click pencil icon (Edit) button
- [ ] Job form modal opens with all fields populated
- [ ] Modify any field (e.g., title, description)
- [ ] Submit changes
- [ ] Verify changes appear in table
- [ ] Verify "Updated" date changes

### Delete Job (Admin)
- [ ] Click trash icon (Delete) button
- [ ] See confirmation dialog
- [ ] Confirm deletion
- [ ] Verify job completely removed from table
- [ ] Verify Total Jobs count decreases

## 📧 Email Notifications

### Setup Resend
- [ ] Sign up at https://resend.com
- [ ] Get API key from dashboard
- [ ] Add to `.env`: `RESEND_API_KEY="re_..."`
- [ ] Add sender email: `RESEND_FROM_EMAIL="ApplyNHire <noreply@yourdomain.com>"`
- [ ] Restart server

### Test Job Submitted Email
- [ ] As employer, post a new job
- [ ] Check admin email inbox (email set in `ADMIN_EMAIL`)
- [ ] Verify received "New Job Posted" email
- [ ] Email should include:
  - [ ] Job title and company
  - [ ] Employer name and email
  - [ ] Job details (location, type)
  - [ ] Description excerpt
  - [ ] Apply URL link
  - [ ] "Review in Admin Panel" button → `/admin`

### Test Job Approved Email
- [ ] As admin, approve a pending job
- [ ] Check employer's email inbox
- [ ] Verify received "Great News!" email
- [ ] Email should include:
  - [ ] Congratulations message
  - [ ] Job details
  - [ ] "View Job Posting" button → `/jobs/[id]`
  - [ ] "Go to Dashboard" button → `/employer/dashboard`
  - [ ] ApplyNHire footer

### Test Job Rejected Email
- [ ] As admin, reject a pending job with reason
- [ ] Check employer's email inbox
- [ ] Verify received "Requires Changes" email
- [ ] Email should include:
  - [ ] Job details
  - [ ] Rejection reason in highlighted box
  - [ ] Next steps explanation
  - [ ] "Go to Dashboard" button
  - [ ] ApplyNHire footer

## 🎨 UI/UX Features

### Dark Mode
- [ ] Check system theme preference
- [ ] Verify app respects system dark/light mode
- [ ] Toggle system theme
- [ ] Verify app theme changes automatically
- [ ] Check header has theme toggle button (moon/sun icon)

### Responsive Design
- [ ] Resize browser window to mobile size (375px)
- [ ] Verify header collapses to hamburger menu
- [ ] Test navigation on mobile
- [ ] Verify tables scroll horizontally on small screens
- [ ] Test job cards display in single column
- [ ] Check all forms are usable on mobile
- [ ] Test on tablet size (768px)

### Loading States
- [ ] Refresh employer dashboard
- [ ] See loading spinner before data loads
- [ ] Refresh admin dashboard
- [ ] See loading spinner
- [ ] Submit a form
- [ ] Button shows loading spinner during submission

### Toast Notifications
- [ ] Perform any action (create, edit, delete)
- [ ] Verify toast appears at bottom/top
- [ ] Toast auto-dismisses after few seconds
- [ ] Toast shows appropriate icon (success/error)

### Empty States
- [ ] Log in as new applicant (no applications)
- [ ] Verify "No applications yet" message
- [ ] See helpful CTA button
- [ ] Post job as employer then delete all jobs
- [ ] Verify "No jobs found" message in table

## 🔐 Security & Authorization

### Route Protection
- [ ] While logged out, try to access `/employer/dashboard`
- [ ] Verify redirects to `/auth/employer`
- [ ] Try to access `/applicant/dashboard`
- [ ] Verify redirects to `/auth/applicant`
- [ ] Try to access `/admin`
- [ ] Verify redirects to homepage (if not admin)
- [ ] Log in as applicant, try `/employer/dashboard`
- [ ] Verify access denied / redirect

### API Authorization
- [ ] Open browser DevTools → Network tab
- [ ] While logged out, try to POST to `/api/jobs`
- [ ] Verify 401 Unauthorized response
- [ ] Log in as applicant, try to POST to `/api/jobs`
- [ ] Verify 401 Unauthorized (only employers can post)
- [ ] Try to access `/api/admin/jobs` as non-admin
- [ ] Verify 401 Unauthorized

### Data Isolation
- [ ] As Employer A, post jobs
- [ ] Log out, register as Employer B
- [ ] Verify Employer B only sees their own jobs in dashboard
- [ ] Verify Employer B cannot edit Employer A's jobs
- [ ] Log in as admin
- [ ] Verify admin sees ALL jobs from both employers

## 🌐 Public Features

### Homepage
- [ ] Navigate to `/`
- [ ] See hero section with "Find Jobs. Hire Talent. 100% Free."
- [ ] See search bar with filters
- [ ] See job listings below
- [ ] Only approved jobs are visible
- [ ] Pending and rejected jobs are hidden

### Job Search
- [ ] Type job title in search (e.g., "Engineer")
- [ ] Verify results filter in real-time
- [ ] Type location (e.g., "Remote")
- [ ] Select employment type from dropdown
- [ ] Enter minimum salary
- [ ] Verify multiple filters work together
- [ ] Clear all filters
- [ ] Verify all approved jobs show again

### Job Detail Page
- [ ] Click on any job card
- [ ] Navigate to `/jobs/[id]`
- [ ] Verify shows:
  - [ ] Job title
  - [ ] Company name
  - [ ] Location badge
  - [ ] Employment type badge
  - [ ] Salary range (if provided)
  - [ ] Full description
  - [ ] Posted date (relative time)
  - [ ] Green "Apply Now" button
- [ ] Click "Apply Now"
- [ ] Verify opens apply URL in new tab
- [ ] Verify URL matches employer's applyUrl

### Header & Footer
- [ ] See "ApplyNHire" logo in header (links to home)
- [ ] See two auth buttons:
  - [ ] "For Employers" (outlined)
  - [ ] "For Applicants" (solid blue)
- [ ] Click "For Employers" → goes to `/auth/employer`
- [ ] Click "For Applicants" → goes to `/auth/applicant`
- [ ] When logged in, verify auth buttons change to "Dashboard"
- [ ] See footer with copyright and links
- [ ] Test footer links

## 📊 Database

### Prisma Studio
- [ ] Run `npx prisma studio`
- [ ] Opens at http://localhost:5555
- [ ] Browse User table
- [ ] Verify users have correct roles (APPLICANT, EMPLOYER, ADMIN)
- [ ] Browse Job table
- [ ] Verify all fields populated correctly
- [ ] Check applyUrl field exists and has URLs
- [ ] Browse Application table (if any applications)
- [ ] Verify foreign keys link correctly

## 🐛 Error Handling

### Form Validation
- [ ] Try to submit job form with empty fields
- [ ] Verify error messages appear below each field
- [ ] Try invalid email format in registration
- [ ] Try password less than minimum length
- [ ] Try invalid URL in apply URL field
- [ ] Verify all validation messages are clear

### Network Errors
- [ ] While offline, try to post job
- [ ] Verify error toast appears
- [ ] Go back online
- [ ] Retry action, verify success

### 404 Pages
- [ ] Navigate to `/jobs/nonexistent-id`
- [ ] Verify shows 404 page
- [ ] See "Back to Jobs" button

## 🚀 Production Readiness

### Environment Variables
- [ ] All required variables in `.env.example`
- [ ] No secrets committed to git
- [ ] `.env` in `.gitignore`

### Build
- [ ] Run `npm run build`
- [ ] Verify no TypeScript errors
- [ ] Verify no build errors
- [ ] Run `npm start`
- [ ] Test production build locally

### Performance
- [ ] Check Lighthouse score in Chrome DevTools
- [ ] Verify performance > 90
- [ ] Verify accessibility > 90
- [ ] Verify SEO > 90
- [ ] Test page load speed

## ✅ Final Checklist

- [ ] All employer features working
- [ ] All applicant features working
- [ ] All admin features working
- [ ] All email notifications sending
- [ ] Dark mode working
- [ ] Mobile responsive
- [ ] All routes protected correctly
- [ ] All forms validating
- [ ] All API routes responding correctly
- [ ] Database schema correct
- [ ] Search and filters working
- [ ] No console errors in browser
- [ ] Production build successful
- [ ] Ready to deploy to Vercel!

---

**🎉 If all checkboxes are ticked, your ApplyNHire portal is fully functional and ready to launch!**
