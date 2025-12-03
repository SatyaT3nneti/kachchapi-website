# ✅ Ready to Deploy - AWS Lambda Function

## Configuration Summary

All configuration is complete and ready for deployment:

- ✅ **Sender Email**: `support@kachchapi.com`
- ✅ **Admin/Recipient Email**: `support@kachchapi.com`
- ✅ **From Name**: `Kachchapi Support`
- ✅ **AWS Region**: `ap-south-2`
- ✅ **IAM Permissions**: Added to your IAM user
- ✅ **SES Email**: `support@kachchapi.com` (must be verified in SES)

## 🚀 Quick Start Deployment

### Step 1: Verify SES Email

Make sure `support@kachchapi.com` is verified in AWS SES:

```bash
aws ses list-verified-email-addresses --region ap-south-2
```

If not verified:
1. Go to AWS Console → SES → Verified identities
2. Click "Create identity" → "Email address"
3. Enter `support@kachchapi.com`
4. Check your email and verify

### Step 2: Deploy Lambda Function

**Option A: Quick Deploy Script (Recommended)**

```bash
cd lambda
./deploy-with-config.sh
```

This will:
- Package the Lambda function
- Create or update the function
- Set all environment variables
- Create IAM execution role if needed

**Option B: AWS SAM**

```bash
cd lambda
sam build
sam deploy --guided
```

When prompted:
- Stack name: `kachchapi-email-lambda`
- Region: `ap-south-2`
- AdminEmail: `support@kachchapi.com` (default)
- FromEmail: `support@kachchapi.com` (default)
- FromName: `Kachchapi Support` (default)
- Confirm: `Y`
- Allow IAM role creation: `Y`

### Step 3: Create API Gateway (if not using SAM)

If you used the quick deploy script, you'll need to create API Gateway manually:

```bash
# Get Lambda function ARN
LAMBDA_ARN=$(aws lambda get-function \
  --function-name kachchapi-send-email \
  --region ap-south-2 \
  --query 'Configuration.FunctionArn' \
  --output text)

# Create REST API
API_ID=$(aws apigateway create-rest-api \
  --name kachchapi-email-api \
  --endpoint-configuration types=REGIONAL \
  --query 'id' \
  --output text)

# Get root resource
ROOT_ID=$(aws apigateway get-resources \
  --rest-api-id $API_ID \
  --query 'items[0].id' \
  --output text)

# Create /callback-request resource
RESOURCE_ID=$(aws apigateway create-resource \
  --rest-api-id $API_ID \
  --parent-id $ROOT_ID \
  --path-part callback-request \
  --query 'id' \
  --output text)

# Create /send-email resource
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
  --uri "arn:aws:apigateway:ap-south-2:lambda:path/2015-03-31/functions/$LAMBDA_ARN/invocations"

# Enable CORS
aws apigateway put-method \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method OPTIONS \
  --authorization-type NONE

aws apigateway put-integration \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method OPTIONS \
  --type MOCK \
  --request-templates '{"application/json":"{\"statusCode\":200}"}'

aws apigateway put-method-response \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters 'method.response.header.Access-Control-Allow-Headers=true,method.response.header.Access-Control-Allow-Methods=true,method.response.header.Access-Control-Allow-Origin=true'

aws apigateway put-integration-response \
  --rest-api-id $API_ID \
  --resource-id $EMAIL_RESOURCE_ID \
  --http-method OPTIONS \
  --status-code 200 \
  --response-parameters '{"method.response.header.Access-Control-Allow-Origin":"'"'"'*'"'"'","method.response.header.Access-Control-Allow-Methods":"'"'"'POST,OPTIONS'"'"'","method.response.header.Access-Control-Allow-Headers":"'"'"'Content-Type,Authorization'"'"'"}'

# Deploy API
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name prod

# Get API URL
echo "API Gateway URL: https://$API_ID.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email"
```

### Step 4: Update Frontend Configuration

Once you have the API Gateway URL, update your frontend:

**Option A: Update environment.ts**

Edit `src/config/environment.ts`:

```typescript
prod: {
  // ... existing config
  api: {
    baseUrl: 'https://YOUR_API_ID.execute-api.ap-south-2.amazonaws.com/prod',
    endpoints: {
      callbackRequest: {
        sendEmail: '/callback-request/send-email',
      },
      // ... other endpoints
    },
  },
}
```

**Option B: Environment Variable**

Set in your build environment:
```bash
REACT_APP_LAMBDA_API_URL=https://YOUR_API_ID.execute-api.ap-south-2.amazonaws.com/prod
```

### Step 5: Test

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
   - Check email at `support@kachchapi.com`
   - Check CloudWatch logs: `/aws/lambda/kachchapi-send-email`

## 📋 Files Updated

All configuration files have been updated with:
- ✅ Admin email: `support@kachchapi.com`
- ✅ Sender email: `support@kachchapi.com`
- ✅ Region: `ap-south-2`

## 🎯 Next Steps

1. Verify `support@kachchapi.com` in SES
2. Run deployment script: `cd lambda && ./deploy-with-config.sh`
3. Create API Gateway (if not using SAM)
4. Update frontend with API Gateway URL
5. Test and verify

## 📞 Need Help?

- Check `QUICK_DEPLOY.md` for detailed steps
- Check `AWS_LAMBDA_DEPLOYMENT.md` for comprehensive guide
- Check CloudWatch logs if errors occur

---

**Ready?** Start with Step 1 above! 🚀

