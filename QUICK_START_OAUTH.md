# Quick Start Guide - Testing OAuth Locally

## For Development Testing (Without Real OAuth Credentials)

The application is fully functional with email/password authentication. OAuth buttons will appear but require setup to work.

## Current State

✅ **Working Now:**
- Email/password sign-in (applicant & employer)
- Policy pages accessible:
  - http://localhost:3001/terms
  - http://localhost:3001/privacy
  - http://localhost:3001/cookies
- OAuth UI components visible
- All forms and validations working

⚠️ **Requires Setup to Work:**
- Google sign-in (needs credentials)
- Yahoo sign-in (needs credentials)
- Outlook sign-in (needs credentials)

## To Test Email/Password Authentication

### Applicant Login:
1. Go to: http://localhost:3001/auth/applicant
2. Click "Sign up" to create an account
3. Fill in name, email, and password
4. Click "Create Account"
5. You'll be auto-logged in and redirected to applicant dashboard

### Employer Login:
1. Go to: http://localhost:3001/auth/employer
2. Click "Sign up" to create an account
3. Fill in all required fields including company info
4. Click "Create Account"
5. You'll be auto-logged in and redirected to employer dashboard

## To View Policy Pages

Simply visit:
- http://localhost:3001/terms
- http://localhost:3001/privacy
- http://localhost:3001/cookies

All are accessible without authentication.

## To Enable OAuth (Optional)

Follow the detailed instructions in `OAUTH_SETUP_GUIDE.md`.

Quick steps:
1. Get OAuth credentials from provider consoles
2. Add to `.env.local` file
3. Restart dev server
4. Test OAuth buttons

## Visual Reference

The sign-in page now looks like this:

```
┌─────────────────────────────────────┐
│        [Icon] Applicant Login       │
│   Welcome back! Find your dream job.│
├─────────────────────────────────────┤
│                                     │
│  [G] Continue with Google           │
│  [Y] Continue with Yahoo            │
│  [M] Continue with Outlook          │
│                                     │
│  ─────── Or continue with email ────│
│                                     │
│  Email: [___________________]       │
│  Password: [_______________]        │
│  [        Sign In         ]         │
│                                     │
├─────────────────────────────────────┤
│ By clicking 'Continue' you agree to │
│ our Terms, Cookie, and Privacy      │
│ policies...                         │
│                                     │
│ Don't have an account? Sign up      │
│ Want to post jobs? Employer login → │
└─────────────────────────────────────┘
```

## Troubleshooting

**Q: OAuth buttons don't work**
A: Expected! Set up OAuth credentials first (see OAUTH_SETUP_GUIDE.md)

**Q: "Sign In" button text instead of "Login"**
A: This is intentional - matches modern UX patterns like Indeed

**Q: Policy links not working**
A: Make sure dev server is running and try hard refresh (Ctrl+F5)

**Q: Changes not showing up**
A: Clear `.next` folder and restart:
```bash
Remove-Item -Recurse -Force .next; npm run dev
```

## What's Next?

1. ✅ Test email/password authentication
2. ✅ Review policy pages
3. ⏳ Set up OAuth credentials (optional)
4. ⏳ Deploy to production
5. ⏳ Configure production OAuth apps

---

Everything is ready for testing! The OAuth functionality is fully implemented and just needs credentials to work.
