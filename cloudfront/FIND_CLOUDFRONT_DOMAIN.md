# Finding Your CloudFront Distribution Domain Name

## Current Status

**Production Distribution for kachchapi.com**: ❌ Not created yet

**Demo Distribution**: ✅ Already exists
- Distribution ID: `E2FUSXUQ5BEYXC`
- Domain: `d2govpu0w1xqz.cloudfront.net`
- Alias: `demo.kachchapi.com`

## Step 1: Create Production CloudFront Distribution

You need to create a CloudFront distribution for `kachchapi.com` first. Choose one method:

### Option A: Using CloudFormation (Recommended)

```bash
aws cloudformation create-stack \
  --stack-name kachchapi-production \
  --template-body file://cloudfront/cloudformation-production.yaml \
  --parameters ParameterKey=CertificateArn,ParameterValue=YOUR_CERT_ARN \
  --region us-east-1
```

**Note**: Replace `YOUR_CERT_ARN` with your ACM certificate ARN for `kachchapi.com` (must be in us-east-1).

### Option B: Manual Creation via AWS Console

1. Go to AWS CloudFront Console: https://console.aws.amazon.com/cloudfront/
2. Click "Create Distribution"
3. Configure:
   - **Origin Domain**: `kachchapi-production-website.s3.ap-south-2.amazonaws.com`
   - **Origin Access**: Create new Origin Access Identity (OAI)
   - **Alternate Domain Names (CNAMEs)**: `kachchapi.com`
   - **SSL Certificate**: Select your ACM certificate for `kachchapi.com`
   - **Default Root Object**: `index.html`
   - **Error Pages**: 
     - 404 → `/index.html` (200)
     - 403 → `/index.html` (200)
4. Click "Create Distribution"
5. Wait for deployment (15-20 minutes)

## Step 2: Find Your CloudFront Distribution Domain Name

After creating the distribution, find the domain name using one of these methods:

### Method 1: AWS Console
1. Go to CloudFront Console
2. Find your distribution for `kachchapi.com`
3. Copy the **Distribution Domain Name** (looks like: `d1234567890abcdef.cloudfront.net`)

### Method 2: AWS CLI Command

```bash
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'kachchapi.com')].{Id:Id,DomainName:DomainName,Status:Status}" --output table
```

### Method 3: Get Distribution ID First, Then Domain

```bash
# Get Distribution ID
DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'kachchapi.com')].Id" --output text)

# Get Domain Name
aws cloudfront get-distribution --id $DIST_ID --query "Distribution.DomainName" --output text
```

## Step 3: DNS Entry to Add

Once you have your CloudFront Distribution Domain Name, add this DNS record:

### For GoDaddy:
- **Type**: CNAME
- **Name**: `@` (or leave blank)
- **Value**: `YOUR_CLOUDFRONT_DOMAIN.cloudfront.net` (e.g., `d1234567890abcdef.cloudfront.net`)
- **TTL**: 600 or 3600

### For Route 53:
- **Type**: A (Alias)
- **Name**: (leave blank for root)
- **Alias**: ON
- **Route traffic to**: CloudFront distribution → Select your distribution

### Example DNS Entry:
```
Type: CNAME
Name: @
Value: d1234567890abcdef.cloudfront.net
TTL: 3600
```

## Quick Check Commands

### List All Distributions:
```bash
aws cloudfront list-distributions --query "DistributionList.Items[].{Id:Id,DomainName:DomainName,Aliases:Aliases.Items,Status:Status}" --output table
```

### Check Specific Distribution:
```bash
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'kachchapi.com')]" --output json
```

### Get Distribution Status:
```bash
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'kachchapi.com')].Status" --output text
```

## What You'll See

After creating the distribution, you'll get something like:

```
Distribution ID: E2FUSXUQ5BEYXC (example)
Domain Name: d2govpu0w1xqz.cloudfront.net (example)
Status: Deployed
Aliases: kachchapi.com
```

**Use the Domain Name** (e.g., `d2govpu0w1xqz.cloudfront.net`) in your DNS CNAME record.

## Important Notes

1. **Distribution must be "Deployed"** before DNS will work (takes 15-20 minutes)
2. **SSL Certificate** must be validated and active
3. **S3 bucket** must exist and have files uploaded
4. **DNS propagation** takes 15 minutes to 48 hours after adding the record

