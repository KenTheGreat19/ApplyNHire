# OAuth Setup Guide

This guide will help you configure Google, Yahoo, and Outlook (Microsoft Azure AD) OAuth authentication for ApplyNHire.

## Prerequisites

- A deployed or local instance of ApplyNHire
- Access to the respective developer consoles

## 1. Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**

### Step 2: Configure OAuth Consent Screen

1. Click **OAuth consent screen** in the left sidebar
2. Select **External** user type and click **Create**
3. Fill in the required information:
   - App name: **ApplyNHire**
   - User support email: Your email
   - Developer contact email: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users (if in testing mode)
6. Click **Save and Continue**

### Step 3: Create OAuth 2.0 Credentials

1. Go to **Credentials** > **Create Credentials** > **OAuth client ID**
2. Application type: **Web application**
3. Name: **ApplyNHire Web Client**
4. Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Click **Create**
7. Copy the **Client ID** and **Client Secret**

### Step 4: Add to Environment Variables

```env
GOOGLE_CLIENT_ID="your-client-id-here"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
```

---

## 2. Microsoft Azure AD (Outlook) OAuth Setup

### Step 1: Register Application

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - Name: **ApplyNHire**
   - Supported account types: **Accounts in any organizational directory and personal Microsoft accounts**
   - Redirect URI: 
     - Platform: **Web**
     - URI: `http://localhost:3000/api/auth/callback/azure-ad`
5. Click **Register**

### Step 2: Configure Application

1. Note the **Application (client) ID** - this is your `AZURE_AD_CLIENT_ID`
2. Note the **Directory (tenant) ID** - this is your `AZURE_AD_TENANT_ID` (or use "common" for multi-tenant)

### Step 3: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and select expiry
4. Click **Add**
5. **Copy the secret value immediately** - this is your `AZURE_AD_CLIENT_SECRET`

### Step 4: Configure API Permissions

1. Go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Select **Delegated permissions**
5. Add: `openid`, `email`, `profile`
6. Click **Add permissions**

### Step 5: Add to Environment Variables

```env
AZURE_AD_CLIENT_ID="your-application-client-id"
AZURE_AD_CLIENT_SECRET="your-client-secret"
AZURE_AD_TENANT_ID="common"
```

---

## 3. Yahoo OAuth Setup

### Step 1: Create Yahoo App

1. Go to [Yahoo Developer Network](https://developer.yahoo.com/)
2. Click **My Apps** > **Create an App**
3. Fill in the application details:
   - Application Name: **ApplyNHire**
   - Application Type: **Web Application**
   - Description: Job board platform
   - Home Page URL: `http://localhost:3000` or `https://yourdomain.com`

### Step 2: Configure OAuth Settings

1. In the **API Permissions** section, enable:
   - OpenID Connect Permissions
   - Profile (Read/Write Public)
2. Add Redirect URI:
   - `http://localhost:3000/api/auth/callback/yahoo`
   - `https://yourdomain.com/api/auth/callback/yahoo`

### Step 3: Get Credentials

1. After creating the app, you'll see:
   - **Client ID (Consumer Key)**
   - **Client Secret (Consumer Secret)**
2. Copy both values

### Step 4: Add to Environment Variables

```env
YAHOO_CLIENT_ID="your-yahoo-client-id"
YAHOO_CLIENT_SECRET="your-yahoo-client-secret"
```

---

## 4. Update Your .env File

Create or update your `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_database_url"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Azure AD (Microsoft/Outlook)
AZURE_AD_CLIENT_ID="your-azure-client-id"
AZURE_AD_CLIENT_SECRET="your-azure-client-secret"
AZURE_AD_TENANT_ID="common"

# Yahoo OAuth
YAHOO_CLIENT_ID="your-yahoo-client-id"
YAHOO_CLIENT_SECRET="your-yahoo-client-secret"
```

---

## 5. Testing OAuth Integration

### Development Testing

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the sign-in page:
   - Applicant: `http://localhost:3000/auth/applicant`
   - Employer: `http://localhost:3000/auth/employer`

3. Click on one of the OAuth buttons (Google, Yahoo, or Outlook)

4. Complete the authentication flow

5. You should be redirected back to the appropriate dashboard

### Common Issues

#### Google OAuth Issues
- **Error: redirect_uri_mismatch**: Ensure your redirect URI exactly matches what's configured in Google Cloud Console
- **Error: invalid_client**: Check that your Client ID and Secret are correct

#### Azure AD Issues
- **Error: AADSTS50011**: Ensure the redirect URI is added to your app registration
- **Error: AADSTS7000215**: Make sure the client secret hasn't expired

#### Yahoo OAuth Issues
- **Error: invalid_request**: Check that your redirect URI is properly configured in the Yahoo Developer Console
- **Error: unauthorized_client**: Verify your Client ID and Secret are correct

---

## 6. Production Deployment

When deploying to production:

1. Update all redirect URIs to use your production domain
2. Update `NEXTAUTH_URL` to your production URL
3. Use environment variables in your hosting platform (Vercel, Netlify, etc.)
4. **Never commit** your `.env` file to version control
5. Regenerate secrets if they were accidentally exposed

---

## Security Best Practices

1. **Rotate Secrets Regularly**: Change your OAuth secrets periodically
2. **Use HTTPS**: Always use HTTPS in production
3. **Limit Scopes**: Only request the OAuth scopes you need
4. **Monitor Usage**: Regularly check OAuth console for suspicious activity
5. **Set Secret Expiry**: Use short-lived secrets where possible (especially Azure AD)

---

## Support

If you encounter issues:

1. Check the browser console for errors
2. Review the NextAuth documentation: https://next-auth.js.org/
3. Check provider-specific documentation:
   - [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
   - [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
   - [Yahoo OAuth](https://developer.yahoo.com/oauth2/guide/)

---

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/)
- [OpenID Connect](https://openid.net/connect/)
