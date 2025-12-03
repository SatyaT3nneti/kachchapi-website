# AWS Lambda Deployment Guide

This guide explains how to deploy the callback request email function to AWS Lambda and integrate it with your website.

## Overview

We're converting the Netlify function to an AWS Lambda function that will be called via API Gateway. This provides:
- Better scalability
- Cost-effective serverless architecture
- Full AWS ecosystem integration
- Better control over infrastructure

## Architecture

```
Website (Frontend) → API Gateway → Lambda Function → AWS SES → Email
```

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Node.js 18.x** or higher
4. **AWS SES** configured with verified email addresses:
   - From email: `support@kachchapi.com` (sender and recipient)
   - Admin email: `support@kachchapi.com` (receives callback requests)

## Step 1: Prepare AWS SES

1. Go to AWS SES Console
2. Verify your email address:
   - Verify `support@kachchapi.com` (sender and recipient)
3. If in SES Sandbox, request production access for higher sending limits

## Step 2: Create IAM Role for Lambda

1. Go to IAM Console → Roles → Create Role
2. Select "AWS service" → "Lambda"
3. Attach policies:
   - `AWSLambdaBasicExecutionRole` (for CloudWatch logs)
   - Create custom policy for SES:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

4. Name the role: `lambda-ses-role`
5. Note the role ARN (e.g., `arn:aws:iam::123456789012:role/lambda-ses-role`)

## Step 3: Deploy Lambda Function

### Option A: Using AWS SAM (Recommended)

1. Install AWS SAM CLI:
```bash
# macOS
brew install aws-sam-cli

# Or follow: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
```

2. Build and deploy:
```bash
cd lambda
sam build
sam deploy --guided
```

Follow the prompts to configure:
- Stack name: `kachchapi-email-lambda`
- AWS Region: `ap-south-2` (or your preferred region)
- AdminEmail: `support@kachchapi.com`
- FromEmail: `support@kachchapi.com`
- Confirm changes: Yes
- Allow SAM CLI IAM role creation: Yes

3. Note the API Gateway URL from the output:
```
ApiUrl = https://xxxxxxxxxx.execute-api.ap-south-2.amazonaws.com/prod
```

### Option B: Using AWS CLI (Manual)

1. Navigate to Lambda directory:
```bash
cd lambda/send-email
npm install --production
```

2. Package the function:
```bash
npm run package
```

3. Create the Lambda function:
```bash
aws lambda create-function \
  --function-name kachchapi-send-email \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-ses-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 256 \
  --environment Variables="{
    KACHCHAPI_ADMIN_EMAIL=admin@kachchapi.com,
    AWS_SES_FROM_EMAIL=support@kachchapi.com,
    AWS_SES_FROM_NAME=Kachchapi Support,
    AWS_REGION=ap-south-2
  }"
```

4. Create API Gateway REST API:
```bash
# Create API
API_ID=$(aws apigateway create-rest-api \
  --name kachchapi-email-api \
  --query 'id' \
  --output text)

# Get root resource ID
ROOT_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --query 'items[0].id' \
  --output text)

# Create resource
RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part callback-request \
  --query 'id' \
  --output text)

EMAIL_RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $RESOURCE_ID \
  --path-part send-email \
  --query 'id' \
  --output text)

# Create POST method
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE

# Set Lambda integration
aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:ap-south-2:lambda:path/2015-03-31/functions/arn:aws:lambda:ap-south-2:YOUR_ACCOUNT_ID:function:kachchapi-send-email/invocations

# Enable CORS
aws apigateway put-method-response \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters method.response.header.Access-Control-Allow-Headers=false,method.response.header.Access-Control-Allow-Methods=false,method.response.header.Access-Control-Allow-Origin=false

# Deploy API
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod

# Get API URL
echo "API URL: https://$API_ID.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email"
```

## Step 4: Update Frontend Configuration

Update your environment configuration to use the Lambda endpoint:

1. Update `src/config/environment.ts`:

```typescript
prod: {
  // ... existing config
  api: {
    baseUrl: 'https://YOUR_API_GATEWAY_ID.execute-api.ap-south-2.amazonaws.com/prod',
    endpoints: {
      callbackRequest: {
        sendEmail: '/callback-request/send-email',
      },
      // ... other endpoints
    },
  },
}
```

Or set environment variable:
```bash
REACT_APP_LAMBDA_API_URL=https://YOUR_API_GATEWAY_ID.execute-api.ap-south-2.amazonaws.com/prod
```

2. Update `src/services/emailService.ts` to use the Lambda endpoint:

The service already supports this - just ensure the `baseUrl` in environment config points to your API Gateway URL.

## Step 5: Test the Deployment

1. Test from Lambda Console:
   - Go to Lambda Console → Functions → `kachchapi-send-email`
   - Create test event:
   ```json
   {
     "httpMethod": "POST",
     "body": "{\"email\":\"test@example.com\",\"fullName\":\"Test User\",\"mobileNumber\":\"1234567890\",\"countryCode\":\"+91\",\"graduationYear\":\"2024\",\"jobTitle\":\"Engineer\",\"program\":\"Training\"}"
   }
   ```
   - Execute and verify email is sent

2. Test from your website:
   - Submit a callback request form
   - Check CloudWatch logs for any errors
   - Verify email is received at admin email

## Step 6: Update CORS (if needed)

If you encounter CORS errors, ensure API Gateway has CORS enabled:

```bash
aws apigateway put-integration-response \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method POST \
  --status-code 200 \
  --response-parameters '{"method.response.header.Access-Control-Allow-Origin":"'"'"'*'"'"'"}'
```

## Monitoring

1. **CloudWatch Logs**: `/aws/lambda/kachchapi-send-email`
2. **CloudWatch Metrics**: Monitor invocations, errors, duration
3. **API Gateway Metrics**: Monitor API calls, latency, errors

## Cost Estimation

- **Lambda**: First 1M requests/month free, then $0.20 per 1M requests
- **API Gateway**: First 1M requests/month free, then $3.50 per 1M requests
- **SES**: $0.10 per 1,000 emails (after free tier)

**Estimated monthly cost for 10,000 requests**: ~$1-2

## Troubleshooting

### Error: "User is not authorized to perform: ses:SendEmail"

**Solution**: Ensure Lambda execution role has SES permissions.

### Error: "Email address is not verified"

**Solution**: Verify the sender email address in SES Console.

### CORS errors from browser

**Solution**: Ensure API Gateway CORS is properly configured and includes OPTIONS method.

### Function timeout

**Solution**: Increase Lambda timeout (current: 30 seconds, max: 900 seconds).

## Updating the Function

For subsequent deployments:

```bash
cd lambda/send-email
npm install --production
npm run package
npm run deploy
```

Or using SAM:
```bash
cd lambda
sam build
sam deploy
```

## Security Best Practices

1. **Use IAM roles** instead of access keys in environment variables
2. **Enable API Gateway throttling** to prevent abuse
3. **Add API key** or **Cognito authentication** for production
4. **Enable CloudWatch alarms** for error rates
5. **Use AWS Secrets Manager** for sensitive configuration (if needed)

## Next Steps

- Set up CloudWatch alarms for monitoring
- Configure API Gateway custom domain
- Add rate limiting/throttling
- Set up automated deployments via CI/CD

