# AWS CloudFront Deployment for demo.kachchapi.com

This guide explains how to deploy the Kachchapi website to AWS CloudFront with the domain `demo.kachchapi.com`.

## Architecture

```
Users → CloudFront (demo.kachchapi.com) → S3 Bucket (Static Files)
```

## Prerequisites

1. **AWS CLI** configured with appropriate permissions
2. **Domain**: `demo.kachchapi.com` (or subdomain access)
3. **SSL Certificate**: Request in ACM (us-east-1 region)
4. **Route 53**: Access to manage DNS records (if using Route 53)

## Step 1: Request SSL Certificate

1. Go to **AWS Certificate Manager (ACM)** in **us-east-1** region
2. Click **"Request a certificate"**
3. Choose **"Request a public certificate"**
4. Enter domain: `demo.kachchapi.com`
5. Add validation (DNS or Email)
6. Complete validation
7. **Note the Certificate ARN**

## Step 2: Deploy Infrastructure

### Option A: Using CloudFormation (Recommended)

```bash
cd cloudfront

# Deploy CloudFormation stack
aws cloudformation create-stack \
  --stack-name kachchapi-demo-website \
  --template-body file://cloudformation-template.yaml \
  --parameters ParameterKey=DomainName,ParameterValue=demo.kachchapi.com \
               ParameterKey=S3BucketName,ParameterValue=kachchapi-demo-website \
               ParameterKey=CertificateArn,ParameterValue=YOUR_CERTIFICATE_ARN \
  --region ap-south-2

# Wait for stack creation
aws cloudformation wait stack-create-complete \
  --stack-name kachchapi-demo-website \
  --region ap-south-2
```

### Option B: Manual Setup

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://kachchapi-demo-website --region ap-south-2
   ```

2. **Create CloudFront Distribution** via AWS Console:
   - Origin: S3 bucket
   - Alternate domain: `demo.kachchapi.com`
   - SSL Certificate: Your ACM certificate
   - Default root: `index.html`
   - Error pages: 404 → `/index.html` (200)

## Step 3: Build and Deploy

```bash
# Make script executable
chmod +x cloudfront/deploy-cloudfront.sh

# Deploy
./cloudfront/deploy-cloudfront.sh
```

Or manually:

```bash
# Build
npm run build:prod

# Upload to S3
aws s3 sync build/ s3://kachchapi-demo-website --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Step 4: Configure DNS

### If using Route 53:

1. Go to **Route 53** → **Hosted zones** → `kachchapi.com`
2. Create record:
   - Type: **A** (or **CNAME**)
   - Name: `demo`
   - Alias: **Yes**
   - Route traffic to: **CloudFront distribution**
   - Select your distribution
   - Record type: **A**

### If using external DNS:

Create a CNAME record:
- Name: `demo`
- Value: `YOUR_CLOUDFRONT_DOMAIN.cloudfront.net`
- TTL: 300

## Step 5: Verify Deployment

1. Wait for DNS propagation (5-60 minutes)
2. Visit: `https://demo.kachchapi.com`
3. Check CloudFront distribution status in AWS Console

## Updating the Website

To update the website:

```bash
./cloudfront/deploy-cloudfront.sh
```

This will:
1. Build the React app
2. Upload to S3
3. Invalidate CloudFront cache

## Configuration

### Cache Settings

- **Static assets** (JS, CSS, images): 1 year cache
- **HTML files**: No cache
- **CloudFront**: Caching optimized policy

### Error Handling

- **404 errors** → Redirect to `/index.html` (for React Router)
- **403 errors** → Redirect to `/index.html`

## Cost Estimation

- **S3**: ~$0.023 per GB storage + $0.005 per 1,000 requests
- **CloudFront**: First 1TB free, then $0.085 per GB
- **Route 53**: $0.50 per hosted zone + $0.40 per million queries

**Estimated monthly cost for low traffic**: $1-5

## Troubleshooting

### 403 Forbidden
- Check S3 bucket policy allows CloudFront OAI
- Verify CloudFront origin configuration

### SSL Certificate Issues
- Ensure certificate is in **us-east-1** region
- Verify domain validation is complete
- Check certificate is attached to CloudFront distribution

### DNS Not Resolving
- Wait for DNS propagation (up to 48 hours)
- Verify Route 53 record is correct
- Check CloudFront distribution is deployed

## Files

- `deploy-cloudfront.sh` - Deployment script
- `cloudformation-template.yaml` - Infrastructure as code
- `README.md` - This file

