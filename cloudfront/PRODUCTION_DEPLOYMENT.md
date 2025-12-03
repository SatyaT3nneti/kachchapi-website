# Production Deployment Guide for kachchapi.com

This guide explains how to deploy the Kachchapi website to production at `kachchapi.com` using AWS CloudFront.

## Prerequisites

1. **AWS CLI configured** with appropriate credentials
2. **SSL Certificate** in ACM (us-east-1) for `kachchapi.com`
3. **DNS access** to update records for `kachchapi.com`

## Step 1: Request SSL Certificate

1. Go to AWS Certificate Manager (ACM) in **us-east-1** region
2. Request a public certificate for:
   - `kachchapi.com`
   - `www.kachchapi.com` (optional, for www subdomain)
3. Validate the certificate via DNS or email
4. Note the Certificate ARN

## Step 2: Create CloudFront Distribution (Option A: Using CloudFormation)

```bash
aws cloudformation create-stack \
  --stack-name kachchapi-production \
  --template-body file://cloudfront/cloudformation-production.yaml \
  --parameters ParameterKey=CertificateArn,ParameterValue=YOUR_CERT_ARN \
  --region us-east-1
```

Replace `YOUR_CERT_ARN` with your ACM certificate ARN.

## Step 2: Create CloudFront Distribution (Option B: Manual via AWS Console)

1. Go to CloudFront in AWS Console
2. Create Distribution:
   - **Origin Domain**: `kachchapi-production-website.s3.ap-south-2.amazonaws.com`
   - **Origin Access**: Create Origin Access Identity (OAI)
   - **Alternate Domain Names (CNAMEs)**: `kachchapi.com`
   - **SSL Certificate**: Select your ACM certificate for `kachchapi.com`
   - **Default Root Object**: `index.html`
   - **Error Pages**: 
     - 404 → `/index.html` (200)
     - 403 → `/index.html` (200)
   - **Price Class**: All (or choose based on your needs)
   - **HTTP Version**: HTTP/2 and HTTP/3
   - **IPv6**: Enabled

3. Note the CloudFront Distribution Domain Name (e.g., `d1234567890.cloudfront.net`)

## Step 3: Update S3 Bucket Policy

The deployment script will automatically create the bucket and set the policy. If you need to update it manually:

```json
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
      "Resource": "arn:aws:s3:::kachchapi-production-website/*"
    }
  ]
}
```

## Step 4: Deploy to Production

Run the production deployment script:

```bash
npm run deploy:production
```

Or directly:

```bash
bash cloudfront/deploy-production.sh
```

This will:
1. Build the React application
2. Create S3 bucket if it doesn't exist
3. Upload files to S3
4. Invalidate CloudFront cache

## Step 5: Configure DNS

Update your DNS records (in GoDaddy, Route 53, or your DNS provider):

### Option A: Using CNAME (Recommended)
- **Type**: CNAME
- **Name**: `@` (or leave blank for root domain)
- **Value**: Your CloudFront Distribution Domain Name (e.g., `d1234567890.cloudfront.net`)
- **TTL**: 3600 (or as recommended)

### Option B: Using A Record (Alias)
If using Route 53:
- **Type**: A (Alias)
- **Name**: `@` (or leave blank)
- **Alias Target**: Select your CloudFront distribution
- **Alias Hosted Zone**: Z2FDTNDATAQYW2 (CloudFront hosted zone)

### For www subdomain (optional):
- **Type**: CNAME
- **Name**: `www`
- **Value**: Your CloudFront Distribution Domain Name

## Step 6: Verify Deployment

1. Wait for DNS propagation (can take up to 48 hours, usually much faster)
2. Visit `https://kachchapi.com` in your browser
3. Verify SSL certificate is working
4. Check that all pages load correctly

## Important Notes

- **Separate from Demo**: Production uses a separate S3 bucket (`kachchapi-production-website`) and CloudFront distribution from demo (`kachchapi-demo-website`)
- **SSL Certificate**: Must be in **us-east-1** region for CloudFront
- **Cache Invalidation**: The script automatically invalidates CloudFront cache, but it takes 5-15 minutes
- **DNS Propagation**: Changes can take up to 48 hours, but usually complete within a few hours

## Troubleshooting

### Distribution not found
If the script says distribution not found, create it manually via AWS Console or CloudFormation first.

### SSL Certificate Issues
- Ensure certificate is in **us-east-1** region
- Verify certificate is validated and active
- Check that the domain matches exactly

### DNS Issues
- Verify CNAME/A record points to correct CloudFront domain
- Check DNS propagation: `dig kachchapi.com` or use online tools
- Ensure TTL is not too high (3600 seconds recommended)

### 403 Forbidden Errors
- Check S3 bucket policy allows CloudFront access
- Verify Origin Access Identity (OAI) is configured correctly
- Ensure bucket is not publicly accessible (should only be accessible via CloudFront)

## Maintenance

### Regular Deployments
Simply run:
```bash
npm run deploy:production
```

### Manual Cache Invalidation
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Check Distribution Status
```bash
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'kachchapi.com')]"
```

