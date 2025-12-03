# GoDaddy DNS Records for demo.kachchapi.com

## Overview

To deploy your website on AWS CloudFront with the domain `demo.kachchapi.com`, you need to add DNS records in GoDaddy that point to your CloudFront distribution.

## Prerequisites

Before adding DNS records, you need:
1. ✅ CloudFront distribution created
2. ✅ SSL certificate configured in CloudFront
3. ✅ CloudFront distribution domain name (e.g., `d1234abcd5678.cloudfront.net`)

## Step 1: Get Your CloudFront Distribution Domain

After creating the CloudFront distribution, you'll get a domain name like:
```
d1234abcd5678.cloudfront.net
```

**To find it:**
1. Go to AWS Console → CloudFront → Distributions
2. Find your distribution for `demo.kachchapi.com`
3. Copy the **Distribution Domain Name** (ends with `.cloudfront.net`)

Or via CLI:
```bash
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'demo.kachchapi.com')].DomainName" --output text
```

## Step 2: Add DNS Records in GoDaddy

### Option A: CNAME Record (Recommended)

1. Log in to **GoDaddy** → **My Products** → **DNS**
2. Find your domain: `kachchapi.com`
3. Click **"Add"** to create a new record
4. Configure:
   - **Type**: `CNAME`
   - **Name**: `demo`
   - **Value**: `YOUR_CLOUDFRONT_DOMAIN.cloudfront.net` (e.g., `d1234abcd5678.cloudfront.net`)
   - **TTL**: `600` (10 minutes) or `3600` (1 hour)
5. Click **"Save"**

**Example:**
```
Type: CNAME
Name: demo
Value: d1234abcd5678.cloudfront.net
TTL: 600
```

### Option B: A Record (If CloudFront provides IPv4 addresses)

CloudFront doesn't provide static IPs, so **CNAME is the correct method**.

## Step 3: Verify DNS Propagation

After adding the DNS record:

1. **Wait 5-60 minutes** for DNS propagation
2. **Check DNS propagation**:
   ```bash
   dig demo.kachchapi.com
   # or
   nslookup demo.kachchapi.com
   ```
3. **Test the website**: Visit `https://demo.kachchapi.com`

## Important Notes

### SSL Certificate

Before the DNS will work properly, ensure:
- ✅ SSL certificate is requested in **ACM (us-east-1)** for `demo.kachchapi.com`
- ✅ Certificate is validated and active
- ✅ Certificate is attached to CloudFront distribution
- ✅ CloudFront distribution has `demo.kachchapi.com` in **Alternate Domain Names (CNAMEs)**

### CloudFront Configuration

Your CloudFront distribution must have:
- **Alternate Domain Names (CNAMEs)**: `demo.kachchapi.com`
- **SSL Certificate**: Your ACM certificate for `demo.kachchapi.com`
- **Default Root Object**: `index.html`
- **Error Pages**: 404 → `/index.html` (200)

## Troubleshooting

### DNS Not Resolving

1. **Check GoDaddy DNS**:
   - Verify the CNAME record is correct
   - Check TTL (lower TTL = faster updates)
   - Ensure no conflicting records

2. **Check CloudFront**:
   - Distribution status is "Deployed"
   - Alternate domain name is configured
   - SSL certificate is attached

3. **Wait for propagation**:
   - DNS changes can take 5 minutes to 48 hours
   - Use `dig` or `nslookup` to check

### SSL Certificate Errors

- Ensure certificate is in **us-east-1** region (required for CloudFront)
- Verify certificate includes `demo.kachchapi.com`
- Check certificate status is "Issued"

### 403 Forbidden

- Check S3 bucket policy allows CloudFront access
- Verify CloudFront origin is correctly configured
- Check CloudFront distribution is deployed

## Quick Reference

**GoDaddy DNS Record:**
```
Type: CNAME
Name: demo
Value: [YOUR_CLOUDFRONT_DOMAIN].cloudfront.net
TTL: 600
```

**After adding, your website will be available at:**
```
https://demo.kachchapi.com
```

## Next Steps

1. ✅ Add CNAME record in GoDaddy
2. ✅ Wait for DNS propagation (5-60 minutes)
3. ✅ Test: `https://demo.kachchapi.com`
4. ✅ Deploy website: `./cloudfront/deploy-cloudfront.sh`

