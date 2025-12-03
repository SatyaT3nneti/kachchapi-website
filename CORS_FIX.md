# CORS Fix for "Failed to fetch" Error

## Issue
"Failed to fetch" error when submitting the callback request form.

## Root Cause
The frontend might be:
1. Not using the Lambda endpoint URL
2. Missing CORS headers in API Gateway response
3. Environment variable not set in production build

## ✅ Fixes Applied

### 1. CORS Headers Added to API Gateway
- Added CORS headers to POST method response
- API Gateway redeployed

### 2. Frontend Code Updated
- Updated `emailService.ts` to use Lambda endpoint
- Added fallback to Lambda URL

## 🔧 Additional Steps Needed

### Option 1: Set Environment Variable (Recommended)

In your build/deployment platform (Netlify, Vercel, etc.), add:

```
REACT_APP_LAMBDA_API_URL=https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod
```

**For Netlify:**
1. Go to Site settings → Environment variables
2. Add: `REACT_APP_LAMBDA_API_URL` = `https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod`
3. Redeploy

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add: `REACT_APP_LAMBDA_API_URL` = `https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod`
3. Redeploy

### Option 2: Hardcode in Code (Quick Fix)

If you can't set environment variables, update `src/services/emailService.ts`:

Change line 167 from:
```typescript
const lambdaApiUrl = process.env.REACT_APP_LAMBDA_API_URL || 'https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod';
```

To:
```typescript
const lambdaApiUrl = 'https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod';
```

### Option 3: Check Browser Console

Open browser DevTools (F12) → Console tab, and check:
1. What URL is being called?
2. What's the exact error message?
3. Any CORS errors?

## 🧪 Test the Fix

1. Rebuild your frontend:
   ```bash
   npm run build
   ```

2. Test locally:
   ```bash
   npm start
   ```
   Then test the form

3. Check Network tab in DevTools:
   - Look for the request to `j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com`
   - Check if CORS headers are present
   - Check response status

## 📋 Current Endpoint

```
https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email
```

## 🔍 Debugging

If still not working, check:

1. **Browser Console**: Look for the exact error
2. **Network Tab**: See what URL is being called
3. **CORS Headers**: Check if `Access-Control-Allow-Origin` is in response

Test endpoint directly:
```bash
curl -X POST https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email \
  -H "Content-Type: application/json" \
  -H "Origin: https://kachchapi.com" \
  -d '{"email":"test@example.com","fullName":"Test","mobileNumber":"1234567890","countryCode":"+91","graduationYear":"2024","jobTitle":"Engineer","program":"Training"}'
```

