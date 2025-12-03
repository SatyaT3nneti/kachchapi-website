# Kachchapi Send Email Lambda Function

AWS Lambda function to send callback request emails via AWS SES.

## Prerequisites

- AWS CLI configured with appropriate credentials
- Node.js 18.x or higher
- AWS SES configured with verified email addresses
- IAM role with SES permissions (or AWS credentials with SES access)

## Setup

1. Install dependencies:
```bash
cd lambda/send-email
npm install
```

2. Package the function:
```bash
npm run package
```

## Deployment

### Option 1: Using AWS CLI (Manual)

1. Create the Lambda function (first time only):
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

2. Update function code (subsequent deployments):
```bash
npm run deploy
```

### Option 2: Using AWS SAM (Infrastructure as Code)

See `template.yaml` in the parent directory for SAM template.

### Option 3: Using Terraform

See `terraform/` directory for Terraform configuration.

## Environment Variables

Set these in Lambda function configuration:

- `KACHCHAPI_ADMIN_EMAIL`: Email address to receive callback requests
- `AWS_SES_FROM_EMAIL`: Verified SES email address to send from
- `AWS_SES_FROM_NAME`: Display name for sender
- `AWS_REGION`: AWS region (default: ap-south-2)

**Note**: If using IAM role (recommended), you don't need `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY`.

## IAM Permissions

The Lambda execution role needs the following permissions:

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
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

## API Gateway Integration

After deploying the Lambda function, create an API Gateway REST API:

1. Create REST API in API Gateway
2. Create POST method pointing to the Lambda function
3. Enable CORS
4. Deploy the API to a stage (e.g., `prod`, `dev`)
5. Note the API Gateway endpoint URL

## Testing

Test the function locally using the AWS SAM CLI or test directly in Lambda console:

```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"test@example.com\",\"fullName\":\"Test User\",\"mobileNumber\":\"1234567890\",\"countryCode\":\"+91\",\"graduationYear\":\"2024\",\"jobTitle\":\"Engineer\",\"program\":\"Training\"}"
}
```

## Monitoring

- CloudWatch Logs: `/aws/lambda/kachchapi-send-email`
- CloudWatch Metrics: Monitor invocations, errors, duration

