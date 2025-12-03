# AWS CLI Setup for Deployment

## Current Status

Your AWS CLI credentials need to be configured. Let's set this up first.

## Step 1: Configure AWS CLI

You need to run:

```bash
aws configure
```

This will prompt you for:
1. **AWS Access Key ID**: Your IAM user's access key
2. **AWS Secret Access Key**: Your IAM user's secret key
3. **Default region**: `ap-south-2` (or your preferred region)
4. **Default output format**: `json` (recommended)

## Step 2: Get Your AWS Credentials

If you don't have access keys:

1. Go to **AWS Console** → **IAM** → **Users**
2. Click on your IAM user
3. Go to **Security credentials** tab
4. Click **"Create access key"**
5. Choose **"Command Line Interface (CLI)"**
6. Download or copy:
   - Access Key ID
   - Secret Access Key

⚠️ **Important**: Keep these credentials secure! Never commit them to git.

## Step 3: Verify Configuration

After configuring, test with:

```bash
aws sts get-caller-identity
```

This should return your AWS account ID and user ARN.

## Step 4: Verify SES Email

Check if your email is verified:

```bash
aws ses list-identities --region ap-south-2
```

Or check verified emails:

```bash
aws ses list-verified-email-addresses --region ap-south-2
```

Make sure `support@kachchapi.com` is in the list.

## Alternative: Use AWS Console

If you prefer using the AWS Console instead of CLI:

1. I can provide step-by-step Console instructions
2. Or you can use the AWS Console to deploy manually

## Next Steps

Once AWS CLI is configured:

1. Run: `cd lambda && ./deploy-with-config.sh`
2. Or use AWS SAM: `sam build && sam deploy --guided`
3. Or I can guide you through Console deployment

---

**Need help?** Let me know once you've configured AWS CLI, or if you'd prefer Console-based deployment!

