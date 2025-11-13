# Quick Start Guide - Testing the Backend

## 🚀 Getting Started

### 1. Restart the Development Server

The database has been updated with new models. Restart the dev server to ensure Prisma client is fully updated:

```powershell
# Stop the current server (Ctrl+C if running)
# Then restart:
npm run dev
```

Server will be available at: **http://localhost:3001**

---

## 🧪 Quick Tests

### Test 1: Create a Job Tag

1. Navigate to: `http://localhost:3001/employer/jobs/tags`
2. Click "Create tag" button
3. Enter:
   - Name: "Engineering"
   - Color: Blue (or pick any color)
   - Description: "Software engineering positions"
4. Click "Create Tag"
5. ✅ You should see a success toast notification
6. ✅ The tag should appear in the list

### Test 2: Invite Team Member

1. Navigate to: `http://localhost:3001/employer/users/new`
2. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Role: "Recruiter"
3. Click "Send Invitation"
4. ✅ Success message should appear
5. ✅ Redirects to dashboard

### Test 3: View Analytics

1. Navigate to: `http://localhost:3001/employer/analytics`
2. ✅ You should see real metrics from your database:
   - Total impressions
   - Job views
   - Applications
   - Conversion rate
3. Change the period dropdown (7/30/90 days)
4. ✅ Numbers should update

### Test 4: Profile Settings

1. Navigate to: `http://localhost:3001/employer/profile`
2. ✅ View account overview
3. ✅ See quick action cards
4. ✅ Company information form

---

## 🔍 Verify Database Records

### Check Created Tags

```powershell
# Open Prisma Studio to view database
npx prisma studio
```

Then check the `JobTag` table for your created tags.

### Check Team Members

In Prisma Studio, check the `TeamMember` table for invitations.

---

## 🌐 API Testing with PowerShell

### Test GET /api/employer/tags

```powershell
# List all tags
Invoke-RestMethod -Uri "http://localhost:3001/api/employer/tags" -Method Get
```

### Test POST /api/employer/tags

```powershell
# Create a new tag
$body = @{
    name = "Remote"
    color = "#10b981"
    description = "Remote positions"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/employer/tags" `
    -Method Post `
    -Body $body `
    -ContentType "application/json"
```

### Test GET /api/employer/analytics

```powershell
# Get analytics for last 30 days
Invoke-RestMethod -Uri "http://localhost:3001/api/employer/analytics?period=30" -Method Get
```

---

## 📋 Feature Checklist

Use this to verify all features are working:

### Job Tags
- [ ] Can create new tags
- [ ] Tags appear in list
- [ ] Can search tags
- [ ] Can sort tags
- [ ] Can delete tags
- [ ] Toast notifications appear
- [ ] Color picker works
- [ ] Empty state shows when no tags

### Team Members
- [ ] Can invite new member
- [ ] Form validation works
- [ ] Success notification appears
- [ ] Redirects after creation
- [ ] Role dropdown works

### Analytics
- [ ] Overview metrics display
- [ ] Period selector works
- [ ] Numbers update when period changes
- [ ] Loading spinner shows
- [ ] Trend indicators appear
- [ ] Top jobs list displays

### Interview Availability
- [ ] Can view calendar
- [ ] Day selection works
- [ ] Time slots display

### Candidate Search
- [ ] Search form appears
- [ ] Can enter search criteria
- [ ] Country dropdown works

---

## 🐛 Common Issues & Fixes

### Issue: "Property 'jobTag' does not exist"
**Solution**: Prisma client needs to be regenerated
```powershell
npx prisma generate
# Then restart dev server
npm run dev
```

### Issue: Toast notifications not showing
**Solution**: Already fixed - Toaster is in layout.tsx using Sonner

### Issue: "Unauthorized" error in API
**Solution**: Make sure you're logged in as an EMPLOYER
1. Go to `/auth/employer`
2. Login with employer credentials
3. Try again

### Issue: No data in analytics
**Solution**: Normal if you haven't created jobs yet
- The analytics will show zeros
- Create some test jobs to see data

---

## 📊 Seed Test Data (Optional)

Want to see the system with data? Run the seed script:

```powershell
node prisma/seed.js
```

This will create:
- Test employer and applicant users
- Sample jobs
- Applications
- Reviews

---

## 🎯 Success Criteria

Your backend is working correctly if:

✅ Tags can be created and appear in the list
✅ Toast notifications show for all actions
✅ Analytics page loads without errors
✅ Team member invitations can be sent
✅ All forms have loading states
✅ Error messages display when appropriate
✅ Data persists after page refresh

---

## 📞 Need Help?

Check these files for reference:
- **API Routes**: `app/api/employer/`
- **Components**: `components/employer/`
- **Database Schema**: `prisma/schema.prisma`
- **Full Documentation**: `BACKEND_IMPLEMENTATION_COMPLETE.md`

---

**Ready to test!** 🚀
Start with the tag management feature - it's the most complete example.
