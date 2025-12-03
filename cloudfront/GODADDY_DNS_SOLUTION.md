# Solution for GoDaddy Root Domain with CloudFront

## Problem
GoDaddy doesn't support CNAME records for root domain (@), and CloudFront doesn't have static IP addresses for A records.

## Solution Options

### Option 1: Use Route 53 for DNS (RECOMMENDED)

This is the best solution. You'll use Route 53 for DNS management while keeping your domain registered in GoDaddy.

#### Step 1: Create Route 53 Hosted Zone

1. Go to AWS Console → Route 53
2. Click "Hosted zones" → "Create hosted zone"
3. Enter:
   - **Domain name**: `kachchapi.com`
   - **Type**: Public hosted zone
4. Click "Create hosted zone"
5. **Copy the 4 nameservers** (e.g., `ns-123.awsdns-12.com`)

#### Step 2: Update Nameservers in GoDaddy

1. Log in to GoDaddy.com
2. Go to "My Products" → `kachchapi.com`
3. Click "DNS" or "Manage DNS"
4. Scroll down to "Nameservers"
5. Click "Change" or "Edit"
6. Select "Custom" or "I'll use my own nameservers"
7. Enter the 4 Route 53 nameservers (one per line)
8. Click "Save"

**Wait 24-48 hours for nameserver propagation** (usually faster, 1-4 hours)

#### Step 3: Create Alias Record in Route 53

1. Go back to Route 53 → Hosted zones → `kachchapi.com`
2. Click "Create record"
3. Configure:
   - **Record name**: (leave blank for root domain)
   - **Record type**: A - Routes traffic to an IPv4 address
   - **Alias**: Toggle ON
   - **Route traffic to**: 
     - Select "Alias to CloudFront distribution"
     - Choose: `E1J13BV9BKDAET` (kachchapi.com)
   - **Routing policy**: Simple routing
4. Click "Create records"

#### Step 4: Create www Record (Optional)

1. Click "Create record" again
2. Configure:
   - **Record name**: `www`
   - **Record type**: A (Alias)
   - **Alias**: ON
   - **Route traffic to**: Same CloudFront distribution
3. Click "Create records"

---

### Option 2: Use www Subdomain (QUICK WORKAROUND)

If you can't use Route 53, you can point `www.kachchapi.com` to CloudFront and redirect root to www.

#### Step 1: Add www CNAME in GoDaddy

1. GoDaddy → DNS Management
2. Add CNAME record:
   - **Type**: CNAME
   - **Name**: `www`
   - **Value**: `d10n9c3i324q2a.cloudfront.net`
   - **TTL**: 3600

#### Step 2: Update CloudFront to Include www

The CloudFront distribution already supports `kachchapi.com`. You'll need to add `www.kachchapi.com` as an alias.

#### Step 3: Redirect Root to www

You can set up a redirect from `kachchapi.com` to `www.kachchapi.com` using:
- S3 bucket redirect
- Or a simple HTML redirect page

**Note**: This is a workaround. Option 1 (Route 53) is the proper solution.

---

## Recommended: Option 1 (Route 53)

Route 53 is the AWS-recommended way to handle root domains with CloudFront. It supports ALIAS records that work perfectly with CloudFront.

### Cost
- Route 53 hosted zone: $0.50/month
- DNS queries: $0.40 per million queries (first 1 billion queries/month)

### Benefits
- ✅ Proper support for root domain
- ✅ ALIAS records (no CNAME limitations)
- ✅ Integrated with AWS services
- ✅ Better performance and reliability

---

## Quick Reference

**CloudFront Distribution:**
- ID: `E1J13BV9BKDAET`
- Domain: `d10n9c3i324q2a.cloudfront.net`

**What to do:**
1. Create Route 53 hosted zone for `kachchapi.com`
2. Update nameservers in GoDaddy to Route 53 nameservers
3. Create A record (Alias) in Route 53 pointing to CloudFront distribution

