# Requesting AWS SES Production Access for ap-south-2

## Current Status
Your SES account in `ap-south-2` is currently in **Sandbox Mode**:
- **Max 24 Hour Send**: 200 emails
- **Max Send Rate**: 1 email per second
- **Restriction**: Can only send to verified email addresses

## Why You Need Production Access
To send emails to **any email address** (not just verified ones), you need to request production access.

## Steps to Request Production Access

### Option 1: AWS Console (Recommended)

1. **Navigate to SES Console**:
   - Go to: https://ap-south-2.console.aws.amazon.com/ses/home?region=ap-south-2
   - Or: AWS Console → Services → Simple Email Service → Select region `ap-south-2`

2. **Request Production Access**:
   - In the left sidebar, click **"Account dashboard"** or **"Sending statistics"**
   - Look for a banner or section that says **"Request production access"** or **"Move out of the Amazon SES sandbox"**
   - Click **"Request production access"** button

3. **Fill Out the Request Form**:
   - **Mail Type**: Select "Transactional" (for automated emails like callback requests)
   - **Website URL**: `https://demo.kachchapi.com`
   - **Use Case Description**: 
     ```
     We are a technology training platform (Kachchapi) that needs to send:
     1. Automated callback request notifications to our admin email (support@kachchapi.com)
     2. Acknowledgment emails to users who submit forms on our website
     3. Demo session request notifications
     
     All emails are user-initiated (form submissions) and transactional in nature.
     We have implemented proper email validation and will maintain good sending practices.
     ```
   - **Compliance**: Check the box confirming you'll comply with AWS SES policies
   - **Additional Information** (optional): Mention that you're using SES for legitimate business communications

4. **Submit the Request**:
   - Click **"Submit"**
   - AWS typically reviews requests within 24 hours

### Option 2: AWS Support Case

If you don't see the "Request production access" option:

1. Go to AWS Support Center: https://console.aws.amazon.com/support/home
2. Click **"Create case"**
3. Select:
   - **Case type**: Service limit increase
   - **Service**: Simple Email Service
   - **Limit type**: Sending limits
   - **Region**: ap-south-2
4. Fill in the request details similar to the form above
5. Submit the case

## What Happens After Approval

Once approved, your limits will increase to:
- **Max 24 Hour Send**: 50,000+ emails (or higher based on your needs)
- **Max Send Rate**: 14+ emails per second (or higher)
- **No restriction**: Can send to any valid email address

## Verification Requirements

Even in production mode, you still need:
- ✅ **From email verified**: `support@kachchapi.com` (already verified)
- ✅ **Domain verified** (optional but recommended for better deliverability)

## Check Your Status

After submitting, you can check status with:

```bash
aws ses get-send-quota --region ap-south-2
```

When approved, you'll see much higher limits.

## Important Notes

- **Processing Time**: Usually 24 hours, but can take up to 48 hours
- **No Cost**: Requesting production access is free
- **Compliance**: Make sure you're following AWS SES best practices:
  - Only send to users who have opted in
  - Include unsubscribe links in marketing emails
  - Handle bounces and complaints properly
  - Maintain good sender reputation

## Current Verified Emails

Make sure these are verified in SES Console:
- `support@kachchapi.com` (From email - should already be verified)

To verify additional emails (if needed):
```bash
aws ses verify-email-identity --email-address support@kachchapi.com --region ap-south-2
```

