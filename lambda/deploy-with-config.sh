#!/bin/bash

# Deployment script for Kachchapi Send Email Lambda Function
# Pre-configured with your settings

set -e

# Configuration - Update these if needed
FUNCTION_NAME="kachchapi-send-email"
ADMIN_EMAIL="support@kachchapi.com"
FROM_EMAIL="support@kachchapi.com"
FROM_NAME="Kachchapi Support"
AWS_REGION="ap-south-2"
STAGE="prod"

echo "🚀 Deploying Kachchapi Send Email Lambda Function"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Function Name: $FUNCTION_NAME"
echo "Admin Email: $ADMIN_EMAIL"
echo "From Email: $FROM_EMAIL"
echo "From Name: $FROM_NAME"
echo "Region: $AWS_REGION"
echo "Stage: $STAGE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Navigate to Lambda directory
cd "$(dirname "$0")/send-email" || exit 1

# Install dependencies
echo "📥 Installing dependencies..."
npm install --production

# Package the function
echo "📦 Packaging function..."
zip -r function.zip . -x '*.git*' '*.zip' 'package-lock.json' 'README.md' '*.md' 'deploy*.sh' > /dev/null 2>&1

# Check if function exists
if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$AWS_REGION" &>/dev/null; then
  echo "✅ Function exists. Updating code..."
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file fileb://function.zip \
    --region "$AWS_REGION"
  
  echo "⏳ Waiting for update to complete..."
  aws lambda wait function-updated --function-name "$FUNCTION_NAME" --region "$AWS_REGION"
  
  echo "🔄 Updating environment variables..."
  aws lambda update-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --region "$AWS_REGION" \
    --environment "Variables={KACHCHAPI_ADMIN_EMAIL=$ADMIN_EMAIL,AWS_SES_FROM_EMAIL=$FROM_EMAIL,AWS_SES_FROM_NAME=$FROM_NAME,AWS_REGION=$AWS_REGION}"
  
  echo "✅ Function updated successfully!"
else
  echo "❌ Function does not exist."
  echo ""
  echo "Creating Lambda function..."
  echo ""
  echo "⚠️  You need to provide an IAM role ARN for the Lambda execution role."
  echo "   The role needs permissions for SES and CloudWatch Logs."
  echo ""
  read -p "Enter IAM Role ARN (or press Enter to create one): " ROLE_ARN
  
  if [ -z "$ROLE_ARN" ]; then
    echo ""
    echo "Creating IAM role..."
    ROLE_NAME="kachchapi-lambda-execution-role"
    
    # Create trust policy
    cat > /tmp/trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
    
    # Create role
    ROLE_ARN=$(aws iam create-role \
      --role-name "$ROLE_NAME" \
      --assume-role-policy-document file:///tmp/trust-policy.json \
      --query 'Role.Arn' \
      --output text)
    
    echo "✅ Created IAM role: $ROLE_ARN"
    
    # Attach SES policy
    echo "Attaching SES permissions..."
    aws iam attach-role-policy \
      --role-name "$ROLE_NAME" \
      --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess
    
    # Attach basic Lambda execution policy
    aws iam attach-role-policy \
      --role-name "$ROLE_NAME" \
      --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    echo "✅ Permissions attached"
    sleep 5  # Wait for IAM propagation
  fi
  
  # Create Lambda function
  echo ""
  echo "Creating Lambda function..."
  aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime nodejs18.x \
    --role "$ROLE_ARN" \
    --handler index.handler \
    --zip-file fileb://function.zip \
    --timeout 30 \
    --memory-size 256 \
    --region "$AWS_REGION" \
    --environment "Variables={KACHCHAPI_ADMIN_EMAIL=$ADMIN_EMAIL,AWS_SES_FROM_EMAIL=$FROM_EMAIL,AWS_SES_FROM_NAME=$FROM_NAME,AWS_REGION=$AWS_REGION}" \
    --description "Kachchapi callback request email sender via AWS SES"
  
  echo "✅ Lambda function created!"
fi

# Clean up
rm -f function.zip
rm -f /tmp/trust-policy.json

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Create API Gateway REST API and connect it to this Lambda function"
echo "2. Update frontend configuration with API Gateway URL"
echo ""
echo "To get the function ARN:"
echo "  aws lambda get-function --function-name $FUNCTION_NAME --region $AWS_REGION --query 'Configuration.FunctionArn' --output text"

