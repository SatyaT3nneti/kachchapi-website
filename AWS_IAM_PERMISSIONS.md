# Adding Permissions to Your Existing IAM User

This guide shows you how to add the necessary permissions to your existing IAM user for deploying and managing the Lambda function.

## Required Permissions

Your IAM user needs the following permissions:

### 1. Lambda Permissions
- Create, update, and manage Lambda functions
- Invoke Lambda functions
- Manage Lambda function versions and aliases

### 2. API Gateway Permissions
- Create, update, and manage REST APIs
- Create resources, methods, and integrations
- Deploy APIs to stages

### 3. SES Permissions
- Send emails via SES
- (Optional) Manage SES identities

### 4. IAM Permissions (if creating Lambda execution role)
- Create IAM roles
- Attach policies to roles
- Pass roles to Lambda

### 5. CloudWatch Logs Permissions
- Create log groups
- Write logs
- (Usually included in basic Lambda execution role)

## Option 1: Using AWS Managed Policies (Easiest)

### Step 1: Attach Managed Policies to Your IAM User

1. Go to **AWS Console** → **IAM** → **Users**
2. Click on your IAM user
3. Click **"Add permissions"** → **"Attach policies directly"**
4. Search and attach these policies:

#### Required Policies:
- ✅ **AWSLambda_FullAccess** - Full access to Lambda functions
- ✅ **AmazonAPIGatewayAdministrator** - Full access to API Gateway
- ✅ **AmazonSESFullAccess** - Full access to SES (or create custom policy below)
- ✅ **IAMFullAccess** - Full access to IAM (if creating Lambda execution role)
  - ⚠️ **Note**: IAMFullAccess is very powerful. Consider creating a custom policy with limited permissions (see Option 2)

#### Alternative (More Secure):
Instead of `IAMFullAccess`, you can create a custom policy that only allows:
- Creating roles for Lambda
- Attaching policies to those roles
- Passing roles to Lambda

### Step 2: Verify Permissions

Test your permissions:
```bash
aws lambda list-functions
aws apigateway get-rest-apis
aws ses get-account-sending-enabled
```

## Option 2: Create Custom Policy (More Secure - Recommended)

Create a custom policy with only the permissions you need:

### Step 1: Create Custom Policy

1. Go to **AWS Console** → **IAM** → **Policies**
2. Click **"Create policy"**
3. Click **"JSON"** tab
4. Paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LambdaFullAccess",
      "Effect": "Allow",
      "Action": [
        "lambda:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "APIGatewayFullAccess",
      "Effect": "Allow",
      "Action": [
        "apigateway:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SESSendEmail",
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail",
        "ses:GetAccountSendingEnabled",
        "ses:GetSendQuota",
        "ses:GetSendStatistics"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SESIdentityManagement",
      "Effect": "Allow",
      "Action": [
        "ses:CreateEmailIdentity",
        "ses:DeleteEmailIdentity",
        "ses:GetEmailIdentity",
        "ses:ListEmailIdentities",
        "ses:VerifyEmailIdentity"
      ],
      "Resource": "*"
    },
    {
      "Sid": "IAMRoleManagement",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:GetRole",
        "iam:ListRoles",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:ListAttachedRolePolicies",
        "iam:PassRole",
        "iam:PutRolePolicy",
        "iam:GetRolePolicy",
        "iam:ListRolePolicies"
      ],
      "Resource": [
        "arn:aws:iam::*:role/lambda-*",
        "arn:aws:iam::*:role/*lambda*"
      ],
      "Condition": {
        "StringEquals": {
          "iam:PassedToService": "lambda.amazonaws.com"
        }
      }
    },
    {
      "Sid": "CloudWatchLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CloudWatchMetrics",
      "Effect": "Allow",
      "Action": [
        "cloudwatch:PutMetricData",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:ListMetrics"
      ],
      "Resource": "*"
    }
  ]
}
```

5. Click **"Next"**
6. Name the policy: `KachchapiLambdaDeploymentPolicy`
7. Add description: `Permissions for deploying and managing Kachchapi Lambda email function`
8. Click **"Create policy"**

### Step 2: Attach Policy to Your IAM User

1. Go to **IAM** → **Users** → Your user
2. Click **"Add permissions"** → **"Attach policies directly"**
3. Search for `KachchapiLambdaDeploymentPolicy`
4. Select it and click **"Next"** → **"Add permissions"**

## Option 3: Using AWS CLI

### Attach Managed Policies via CLI

```bash
# Attach Lambda full access
aws iam attach-user-policy \
  --user-name YOUR_IAM_USERNAME \
  --policy-arn arn:aws:iam::aws:policy/AWSLambda_FullAccess

# Attach API Gateway administrator
aws iam attach-user-policy \
  --user-name YOUR_IAM_USERNAME \
  --policy-arn arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator

# Attach SES full access
aws iam attach-user-policy \
  --user-name YOUR_IAM_USERNAME \
  --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess

# Attach IAM full access (if creating Lambda execution role)
aws iam attach-user-policy \
  --user-name YOUR_IAM_USERNAME \
  --policy-arn arn:aws:iam::aws:policy/IAMFullAccess
```

### Create and Attach Custom Policy via CLI

1. Save the custom policy JSON above to a file: `kachchapi-lambda-policy.json`

2. Create the policy:
```bash
aws iam create-policy \
  --policy-name KachchapiLambdaDeploymentPolicy \
  --policy-document file://kachchapi-lambda-policy.json \
  --description "Permissions for deploying and managing Kachchapi Lambda email function"
```

3. Note the policy ARN from output (e.g., `arn:aws:iam::123456789012:policy/KachchapiLambdaDeploymentPolicy`)

4. Attach to your user:
```bash
aws iam attach-user-policy \
  --user-name YOUR_IAM_USERNAME \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/KachchapiLambdaDeploymentPolicy
```

## Verify Permissions

After adding permissions, verify they work:

```bash
# Test Lambda access
aws lambda list-functions

# Test API Gateway access
aws apigateway get-rest-apis

# Test SES access
aws ses get-account-sending-enabled

# Test IAM access (if needed)
aws iam list-roles --max-items 5
```

## Minimal Permissions (If You Want to Be More Restrictive)

If you want to be more restrictive and only allow specific resources:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LambdaFunctionManagement",
      "Effect": "Allow",
      "Action": [
        "lambda:CreateFunction",
        "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration",
        "lambda:GetFunction",
        "lambda:ListFunctions",
        "lambda:InvokeFunction",
        "lambda:DeleteFunction"
      ],
      "Resource": "arn:aws:lambda:*:*:function:kachchapi-*"
    },
    {
      "Sid": "APIGatewayManagement",
      "Effect": "Allow",
      "Action": [
        "apigateway:POST",
        "apigateway:GET",
        "apigateway:PUT",
        "apigateway:PATCH",
        "apigateway:DELETE"
      ],
      "Resource": "arn:aws:apigateway:*::/restapis/*"
    },
    {
      "Sid": "SESSendEmail",
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

## Important Notes

1. **IAM User vs IAM Role**: 
   - **IAM User**: For programmatic access (CLI, SDK) - what you're using
   - **IAM Role**: For AWS services (like Lambda execution role) - different from your user

2. **Lambda Execution Role**: 
   - This is a separate IAM role that the Lambda function itself uses
   - Your IAM user needs permissions to create/update this role
   - The Lambda execution role needs SES permissions

3. **Security Best Practice**: 
   - Use the custom policy (Option 2) instead of full access policies when possible
   - Limit permissions to only what's needed
   - Regularly review and audit permissions

## Troubleshooting

### Error: "User is not authorized to perform: lambda:CreateFunction"
**Solution**: Add Lambda permissions (AWSLambda_FullAccess or custom policy)

### Error: "User is not authorized to perform: apigateway:POST"
**Solution**: Add API Gateway permissions (AmazonAPIGatewayAdministrator)

### Error: "User is not authorized to perform: iam:CreateRole"
**Solution**: Add IAM permissions (IAMFullAccess or limited IAM policy)

### Error: "User is not authorized to perform: ses:SendEmail"
**Solution**: Add SES permissions (AmazonSESFullAccess or custom SES policy)

## Next Steps

Once permissions are added:

1. Verify permissions work (run test commands above)
2. Proceed with Lambda deployment (see `AWS_LAMBDA_DEPLOYMENT.md`)
3. The Lambda function will need its own execution role (we'll create this during deployment)

---

**Need Help?** If you encounter any permission errors, share the error message and I can help you identify which specific permission is missing.

