# Troubleshooting "Failed to fetch" Error

## Quick Fix

The code has been updated to always use the Lambda endpoint. **Rebuild and redeploy your frontend:**

```bash
npm run build
```

Then redeploy to your hosting platform (Netlify/Vercel/etc.)

## Common Causes

### 1. CORS Issue ✅ FIXED
- CORS headers have been added to API Gateway
- API has been redeployed

### 2. Wrong URL Being Called
The frontend should now call:
```
https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email
```

### 3. Browser Console Check

Open browser DevTools (F12) and check:

**Console Tab:**
- Look for any error messages
- Check what URL is being called

**Network Tab:**
1. Submit the form
2. Look for the request to `j1p2k4jsv5.execute-api...`
3. Check:
   - Request URL
   - Status code
   - Response headers (should have `Access-Control-Allow-Origin: *`)

## Test the Endpoint

Test directly from browser console:

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
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

## If Still Not Working

1. **Check if endpoint is accessible:**
   ```bash
   curl -X POST https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","fullName":"Test","mobileNumber":"1234567890","countryCode":"+91","graduationYear":"2024","jobTitle":"Engineer","program":"Training"}'
   ```

2. **Check Lambda logs:**
   ```bash
   aws logs tail /aws/lambda/kachchapi-send-email --follow --region ap-south-2
   ```

3. **Verify API Gateway deployment:**
   - Go to AWS Console → API Gateway
   - Check if API is deployed to `prod` stage
   - Test the endpoint from API Gateway console

## Next Steps

1. Rebuild frontend: `npm run build`
2. Redeploy to hosting platform
3. Test the form
4. Check browser console for errors
5. Share the exact error message if still failing

