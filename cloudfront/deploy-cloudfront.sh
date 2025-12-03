#!/bin/bash

# Deploy Kachchapi website to AWS CloudFront
# Domain: demo.kachchapi.com

set -e

BUCKET_NAME="kachchapi-demo-website"
DISTRIBUTION_DOMAIN="demo.kachchapi.com"
REGION="ap-south-2"
BUILD_DIR="build"

echo "🚀 Deploying Kachchapi website to AWS CloudFront"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Bucket: $BUCKET_NAME"
echo "Domain: $DISTRIBUTION_DOMAIN"
echo "Region: $REGION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Build the React app
echo "📦 Building React application..."
npm run build:prod

if [ ! -d "$BUILD_DIR" ]; then
  echo "❌ Build directory not found. Build failed?"
  exit 1
fi

echo "✅ Build complete"
echo ""

# Step 2: Create S3 bucket if it doesn't exist
echo "🪣 Checking S3 bucket..."
if ! aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
  echo "✅ Bucket exists"
else
  echo "Creating S3 bucket..."
  aws s3 mb "s3://$BUCKET_NAME" --region $REGION
  
  # Enable static website hosting
  aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html
  
  # Set bucket policy for CloudFront access
  cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF
  
  aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json
  echo "✅ Bucket created and configured"
fi

# Step 3: Upload files to S3
echo "📤 Uploading files to S3..."
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" \
  --delete \
  --exclude "*.map" \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "static/*" \
  --exclude "*.js" \
  --exclude "*.css"

# Upload static assets with long cache
aws s3 sync "$BUILD_DIR/static" "s3://$BUCKET_NAME/static" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# Upload JS and CSS with long cache
aws s3 cp "$BUILD_DIR" "s3://$BUCKET_NAME" \
  --recursive \
  --exclude "*" \
  --include "*.js" \
  --include "*.css" \
  --cache-control "public, max-age=31536000, immutable"

# Upload HTML files with no cache
aws s3 cp "$BUILD_DIR" "s3://$BUCKET_NAME" \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"

echo "✅ Files uploaded"
echo ""

# Step 4: Get or create CloudFront distribution
echo "☁️  Checking CloudFront distribution..."
DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, '$DISTRIBUTION_DOMAIN')].Id" --output text)

if [ -z "$DIST_ID" ] || [ "$DIST_ID" == "None" ]; then
  echo "⚠️  CloudFront distribution not found for $DISTRIBUTION_DOMAIN"
  echo "   Please create it manually via AWS Console or use the CloudFormation template"
  echo ""
  echo "   Required configuration:"
  echo "   - Origin: s3://$BUCKET_NAME.s3.$REGION.amazonaws.com"
  echo "   - Alternate domain: $DISTRIBUTION_DOMAIN"
  echo "   - SSL Certificate: Request in ACM (us-east-1 for CloudFront)"
  echo "   - Default root object: index.html"
  echo "   - Error pages: 404 -> /index.html (200)"
else
  echo "✅ Found distribution: $DIST_ID"
  
  # Invalidate CloudFront cache
  echo "🔄 Invalidating CloudFront cache..."
  INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DIST_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)
  
  echo "✅ Cache invalidation created: $INVALIDATION_ID"
  echo "   This may take 5-15 minutes to complete"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Ensure CloudFront distribution is configured with:"
echo "   - Domain: $DISTRIBUTION_DOMAIN"
echo "   - SSL Certificate from ACM (us-east-1)"
echo "   - Origin: s3://$BUCKET_NAME"
echo "2. Update Route 53 to point $DISTRIBUTION_DOMAIN to CloudFront"
echo "3. Wait for DNS propagation (can take up to 48 hours)"

