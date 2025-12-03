# AWS Lambda Deployment - Required Information Checklist

Use this checklist to gather all the information needed before deploying the Lambda function to AWS.

## ✅ Pre-Deployment Checklist

### 1. AWS Account Information

- [ ] **AWS Account ID**: `_________________`
  - Find it: AWS Console → Support → Account ID (top right)
  
- [ ] **AWS Region**: `_________________`
  - Recommended: `ap-south-2` (Hyderabad) or your preferred region
  - Must match your SES region

- [ ] **AWS CLI Configured**: 
  - Run: `aws configure list` to verify
  - If not configured: `aws configure`
  - Need: Access Key ID, Secret Access Key, Region

### 2. Email Configuration (AWS SES)

- [ ] **Sender Email Address**: `_________________`
  - Example: `support@kachchapi.com`
  - **Must be verified in SES Console**
  - Status: [ ] Verified [ ] Pending [ ] Not verified

- [ ] **Admin/Recipient Email**: `_________________`
  - Example: `admin@kachchapi.com`
  - Where callback requests will be sent
  - **Must be verified in SES Console**
  - Status: [ ] Verified [ ] Pending [ ] Not verified

- [ ] **Sender Display Name**: `_________________`
  - Example: `Kachchapi Support`
  - Optional, defaults to "Kachchapi Support"

- [ ] **SES Region**: `_________________`
  - Must match your Lambda region
  - Common: `ap-south-2`, `us-east-1`, `us-west-2`

- [ ] **SES Production Access**: 
  - Status: [ ] In Sandbox (limited) [ ] Production Access (unlimited)
  - If in Sandbox, you can only send to verified emails

### 3. IAM Role & Permissions

- [ ] **Lambda Execution Role Name**: `_________________`
  - Example: `lambda-ses-role`
  - Will be created during deployment if using SAM
  - Or provide existing role ARN: `arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME`

- [ ] **Required Permissions**:
  - [ ] SES: `ses:SendEmail`
  - [ ] SES: `ses:SendRawEmail`
  - [ ] CloudWatch Logs: `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`
  - [ ] Lambda: Basic execution role

### 4. Lambda Function Configuration

- [ ] **Function Name**: `kachchapi-send-email`
  - Default name, can be customized

- [ ] **Runtime**: `nodejs18.x`
  - Already configured

- [ ] **Memory Size**: `256 MB`
  - Default, can be adjusted (128-10240 MB)

- [ ] **Timeout**: `30 seconds`
  - Default, can be adjusted (max 900 seconds)

- [ ] **Environment Variables** (will be set during deployment):
  ```
  KACHCHAPI_ADMIN_EMAIL = _________________
  AWS_SES_FROM_EMAIL = _________________
  AWS_SES_FROM_NAME = _________________
  AWS_REGION = _________________
  ```

### 5. API Gateway Configuration

- [ ] **API Name**: `kachchapi-email-api`
  - Default name, can be customized

- [ ] **API Stage**: `prod` or `dev`
  - Choose: [ ] `prod` [ ] `dev` [ ] Other: `___________`

- [ ] **Endpoint Path**: `/callback-request/send-email`
  - Already configured

- [ ] **CORS Configuration**:
  - [ ] Allow Origin: `*` (all domains) or specific: `_________________`
  - [ ] Allow Methods: `POST, OPTIONS`
  - [ ] Allow Headers: `Content-Type, Authorization`

- [ ] **Custom Domain** (Optional):
  - Domain: `_________________`
  - Certificate ARN: `_________________`
  - Status: [ ] Not needed [ ] Will configure later

### 6. Deployment Method Preference

Choose your preferred deployment method:

- [ ] **Option A: AWS SAM** (Recommended - Infrastructure as Code)
  - Requires: AWS SAM CLI installed
  - Check: `sam --version`
  - Status: [ ] Installed [ ] Need to install

- [ ] **Option B: AWS CLI** (Manual - Step by step)
  - Requires: AWS CLI configured
  - Status: [ ] Ready [ ] Need setup

- [ ] **Option C: AWS Console** (GUI - Manual)
  - Requires: AWS Console access
  - Status: [ ] Ready

### 7. Frontend Integration Details

- [ ] **Current Frontend URL**: `_________________`
  - Example: `https://kachchapi.com`
  - Needed for CORS configuration

- [ ] **Environment to Update**:
  - [ ] Production (`prod`)
  - [ ] Development (`dev`)
  - [ ] QA (`qa`)
  - [ ] All environments

- [ ] **API Base URL Variable Name**:
  - Current: `REACT_APP_ENV` or `environment.api.baseUrl`
  - Will be updated to: `https://YOUR_API_GATEWAY_ID.execute-api.REGION.amazonaws.com/STAGE`

### 8. Testing & Monitoring

- [ ] **Test Email Address**: `_________________`
  - For testing the function
  - Should be verified in SES if in Sandbox

- [ ] **CloudWatch Log Group**: `/aws/lambda/kachchapi-send-email`
  - Will be created automatically

- [ ] **Alarm Email** (Optional for monitoring):
  - Email: `_________________`
  - For error notifications

### 9. Security & Access

- [ ] **API Authentication** (Optional):
  - [ ] No authentication (public)
  - [ ] API Key required
  - [ ] AWS Cognito
  - [ ] Custom authorizer
  - Status: [ ] Will add later [ ] Not needed

- [ ] **Rate Limiting** (Optional):
  - [ ] Enable throttling
  - Burst limit: `_________________`
  - Rate limit: `_________________` requests/second

### 10. Cost & Billing

- [ ] **AWS Billing Alerts**: 
  - [ ] Enabled
  - [ ] Not configured
  - Estimated monthly cost: $1-5 for low traffic

---

## 📋 Quick Information Form

Fill this out and provide it for deployment:

```
AWS Account ID: _________________
AWS Region: _________________

Email Configuration:
  Sender Email: _________________
  Admin Email: _________________
  Sender Name: _________________
  SES Region: _________________

Deployment Method: [ ] SAM [ ] AWS CLI [ ] Console

Environment: [ ] Production [ ] Development [ ] QA

Frontend URL: _________________

Additional Notes:
_________________________________
_________________________________
```

---

## 🔍 How to Find Missing Information

### AWS Account ID
```bash
aws sts get-caller-identity --query Account --output text
```
Or: AWS Console → Support (top right corner)

### Verify SES Email Status
1. Go to AWS Console → SES → Verified identities
2. Check status of your email addresses
3. If not verified, click "Create identity" and verify

### Check AWS CLI Configuration
```bash
aws configure list
aws sts get-caller-identity
```

### Check SES Region
1. Go to AWS Console → SES
2. Check the region selector (top right)
3. This should match your Lambda region

### Check IAM Permissions
```bash
aws iam get-user
aws iam list-attached-user-policies --user-name YOUR_USERNAME
```

---

## ⚠️ Important Notes

1. **SES Verification**: Both sender and recipient emails must be verified in SES before deployment
2. **Region Consistency**: Lambda, SES, and API Gateway should be in the same region for best performance
3. **IAM Permissions**: The deploying user needs permissions to create Lambda, API Gateway, IAM roles, and SES access
4. **SES Sandbox**: If in sandbox mode, you can only send to verified email addresses
5. **Cost**: First 1M Lambda requests/month are free, then $0.20 per 1M requests

---

## 🚀 Ready to Deploy?

Once you've filled out the checklist above, you can proceed with deployment using one of these methods:

1. **AWS SAM** (Recommended): See `AWS_LAMBDA_DEPLOYMENT.md` → Step 3 → Option A
2. **AWS CLI**: See `AWS_LAMBDA_DEPLOYMENT.md` → Step 3 → Option B
3. **Manual Console**: Follow AWS Console steps in deployment guide

---

## 📞 Need Help?

If you're missing any information or need help with any step, let me know which items you need assistance with!

