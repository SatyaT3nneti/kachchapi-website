# Quick Deployment Guide - AWS Lambda

## ✅ Confirmed Configuration

- **Sender Email**: `support@kachchapi.com` ✅
- **From Name**: `Kachchapi Support` ✅
- **Admin Email**: `support@kachchapi.com` ✅
- **AWS Region**: `ap-south-2` (default - confirm if different)
- **IAM Permissions**: ✅ Added

## 🚀 Deployment Options

### Option 1: Quick Deploy Script (Easiest)

I've created a pre-configured deployment script with your settings:

```bash
cd lambda
./deploy-with-config.sh
```

This script will:
1. Package the Lambda function
2. Create the function if it doesn't exist (or update if it does)
3. Set all environment variables
4. Create IAM role if needed

**Note**: Make sure `support@kachchapi.com` is verified in AWS SES before deploying.

### Option 2: AWS SAM (Recommended for Production)

```bash
cd lambda
sam build
sam deploy --guided
```

When prompted, use these values:
- Stack name: `kachchapi-email-lambda`
- Region: `ap-south-2`
- AdminEmail: `support@kachchapi.com`
- FromEmail: `support@kachchapi.com`
- FromName: `Kachchapi Support`
- Confirm changes: `Y`
- Allow SAM CLI IAM role creation: `Y`

### Option 3: AWS CLI (Manual Step-by-Step)

See `AWS_LAMBDA_DEPLOYMENT.md` for detailed manual steps.

## 📋 Before You Deploy

1. **Verify SES Emails**:
   ```bash
   aws ses list-verified-email-addresses --region ap-south-2
   ```
   
   Make sure the email is listed:
   - ✅ `support@kachchapi.com`

2. **Test AWS Access**:
   ```bash
   aws sts get-caller-identity
   aws lambda list-functions --region ap-south-2
   ```

## 🔧 After Lambda Deployment

Once Lambda is deployed, you need to:

1. **Create API Gateway** (if not using SAM):
   - The SAM template creates this automatically
   - Or follow manual steps in `AWS_LAMBDA_DEPLOYMENT.md`

2. **Get API Gateway URL**:
   ```bash
   # If using SAM, check the output:
   aws cloudformation describe-stacks \
     --stack-name kachchapi-email-lambda \
     --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
     --output text
   ```

3. **Update Frontend**:
   - Update `src/config/environment.ts` with the API Gateway URL
   - Or set environment variable: `REACT_APP_LAMBDA_API_URL`

## 🧪 Test the Deployment

1. **Test Lambda directly**:
   ```bash
   aws lambda invoke \
     --function-name kachchapi-send-email \
     --region ap-south-2 \
     --payload '{"httpMethod":"POST","body":"{\"email\":\"test@example.com\",\"fullName\":\"Test User\",\"mobileNumber\":\"1234567890\",\"countryCode\":\"+91\",\"graduationYear\":\"2024\",\"jobTitle\":\"Engineer\",\"program\":\"Training\"}"}' \
     response.json
   
   cat response.json
   ```

2. **Test from website**:
   - Submit callback request form
   - Check CloudWatch logs: `/aws/lambda/kachchapi-send-email`
   - Verify email received at admin email

## 📝 Quick Commands Reference

```bash
# Check Lambda function
aws lambda get-function --function-name kachchapi-send-email --region ap-south-2

# View Lambda logs
aws logs tail /aws/lambda/kachchapi-send-email --follow --region ap-south-2

# Update function code
cd lambda/send-email
npm install --production
zip -r function.zip . -x '*.git*' '*.zip' 'package-lock.json'
aws lambda update-function-code \
  --function-name kachchapi-send-email \
  --zip-file fileb://function.zip \
  --region ap-south-2
```

## ❓ Need to Change Configuration?

If you need different values, edit `lambda/deploy-with-config.sh` or update the SAM template parameters.

---

**Ready to deploy?** Run:
```bash
cd lambda && ./deploy-with-config.sh
```

