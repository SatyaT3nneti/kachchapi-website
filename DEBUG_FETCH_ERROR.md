# Debugging "Failed to fetch" Error

## Current Status

✅ **Lambda Function**: Working (tested successfully)
✅ **API Gateway**: Deployed and accessible
✅ **CORS**: Configured
✅ **IAM Permissions**: SES Full Access attached

## The Issue

"Failed to fetch" is a generic browser error that can mean:
1. **CORS preflight failing** - Browser blocks the request
2. **Network error** - Can't reach the server
3. **Wrong URL** - Frontend calling incorrect endpoint
4. **SSL/Certificate issue** - HTTPS problems

## Debugging Steps

### 1. Check Browser Console

Open DevTools (F12) → Console tab, and look for:
- The exact error message
- What URL is being called
- Any CORS errors

### 2. Check Network Tab

1. Open DevTools (F12) → Network tab
2. Submit the form
3. Look for the request to `j1p2k4jsv5.execute-api...`
4. Check:
   - **Request URL**: Should be `https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email`
   - **Status**: Should be 200 (or check what it is)
   - **Response Headers**: Should have `Access-Control-Allow-Origin: *`
   - **Request Headers**: Check if `Origin` is set

### 3. Test in Browser Console

Run this in your browser console (on your website):

```javascript
fetch('https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    fullName: 'Test User',
    mobileNumber: '1234567890',
    countryCode: '+91',
    graduationYear: '2024',
    jobTitle: 'Engineer',
    program: 'Training'
  })
})
.then(res => {
  console.log('Status:', res.status);
  console.log('Headers:', [...res.headers.entries()]);
  return res.json();
})
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

### 4. Check What URL Frontend is Calling

The code now logs the URL being called. Check browser console for:
```
Calling Lambda endpoint: https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email
```

If you see a different URL, that's the problem.

## Common Fixes

### Fix 1: Rebuild Frontend

The code has been updated. Rebuild:

```bash
npm run build
```

Then redeploy.

### Fix 2: Check Environment Variable

If using Netlify/Vercel, make sure `REACT_APP_LAMBDA_API_URL` is set (or the code will use the default).

### Fix 3: CORS Preflight

If you see CORS errors, the OPTIONS request might be failing. Test:

```bash
curl -X OPTIONS https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email \
  -H "Origin: https://kachchapi.com" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

Should return 200 with CORS headers.

## What to Share

If still not working, please share:
1. **Browser Console error** (exact message)
2. **Network tab screenshot** (showing the failed request)
3. **What URL is being called** (from console log)
4. **Your website URL** (to verify CORS origin)

## Quick Test

The endpoint is working. Test it directly:
```bash
curl -X POST https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","fullName":"Test","mobileNumber":"1234567890","countryCode":"+91","graduationYear":"2024","jobTitle":"Engineer","program":"Training"}'
```

Should return: `{"success":true,"message":"Email sent successfully",...}`

