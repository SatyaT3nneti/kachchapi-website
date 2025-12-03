#!/bin/bash

# Create CloudFront distribution for production after SSL certificate is validated

set -e

CERT_ARN="arn:aws:acm:us-east-1:323041436850:certificate/c111ff7d-a099-4216-9e50-8d29a58fd1b4"
BUCKET_NAME="kachchapi-production-website"
DOMAIN="kachchapi.com"

echo "🔍 Checking SSL certificate status..."
CERT_STATUS=$(aws acm describe-certificate --certificate-arn $CERT_ARN --region us-east-1 --query "Certificate.Status" --output text)

if [ "$CERT_STATUS" != "ISSUED" ]; then
  echo "⚠️  Certificate is still $CERT_STATUS"
  echo "   Please wait a few more minutes for DNS validation to complete"
  echo "   Then run this script again"
  exit 1
fi

echo "✅ Certificate is validated!"
echo ""

echo "☁️  Creating CloudFront distribution..."

# Create distribution config
cat > /tmp/cloudfront-config.json <<EOF
{
  "CallerReference": "kachchapi-production-$(date +%s)",
  "Comment": "Kachchapi production website distribution",
  "DefaultRootObject": "index.html",
  "Enabled": true,
  "Aliases": {
    "Quantity": 1,
    "Items": ["$DOMAIN"]
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$BUCKET_NAME",
        "DomainName": "$BUCKET_NAME.s3.ap-south-2.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BUCKET_NAME",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "CustomErrorResponses": {
    "Quantity": 2,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      },
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }
    ]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "$CERT_ARN",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "PriceClass": "PriceClass_All",
  "HttpVersion": "http2and3",
  "IsIPV6Enabled": true
}
EOF

# Create distribution
RESULT=$(aws cloudfront create-distribution --distribution-config file:///tmp/cloudfront-config.json)

DIST_ID=$(echo $RESULT | jq -r '.Distribution.Id')
DIST_DOMAIN=$(echo $RESULT | jq -r '.Distribution.DomainName')

echo "✅ CloudFront distribution created!"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  CLOUDFRONT DISTRIBUTION CREATED"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Distribution ID: $DIST_ID"
echo "Domain Name: $DIST_DOMAIN"
echo "Status: Deploying (takes 15-20 minutes)"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  FINAL DNS ENTRY TO ADD"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Add this CNAME record in your DNS provider (GoDaddy):"
echo ""
echo "Type: CNAME"
echo "Name: @ (or leave blank for root domain)"
echo "Value: $DIST_DOMAIN"
echo "TTL: 3600"
echo ""
echo "═══════════════════════════════════════════════════════════════"

