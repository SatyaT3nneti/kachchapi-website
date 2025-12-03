#!/bin/bash

# Deployment script for Kachchapi Send Email Lambda Function
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-prod}
FUNCTION_NAME="kachchapi-send-email"
LAMBDA_DIR="lambda/send-email"

echo "🚀 Deploying Lambda function: $FUNCTION_NAME"
echo "📦 Environment: $ENVIRONMENT"

# Navigate to Lambda directory
cd "$LAMBDA_DIR" || exit 1

# Install dependencies
echo "📥 Installing dependencies..."
npm install --production

# Package the function
echo "📦 Packaging function..."
npm run package

# Check if function exists
if aws lambda get-function --function-name "$FUNCTION_NAME" &>/dev/null; then
  echo "✅ Function exists. Updating code..."
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file fileb://function.zip
  
  echo "⏳ Waiting for update to complete..."
  aws lambda wait function-updated --function-name "$FUNCTION_NAME"
  
  echo "✅ Function updated successfully!"
else
  echo "❌ Function does not exist. Please create it first using AWS Console or SAM/Terraform."
  echo "   Or use: aws lambda create-function (see README.md for details)"
  exit 1
fi

# Clean up
rm -f function.zip

echo "🎉 Deployment complete!"

