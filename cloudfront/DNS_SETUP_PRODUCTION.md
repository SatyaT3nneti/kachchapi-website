# DNS Setup for kachchapi.com Production

This guide explains where and how to add DNS entries for the production website at `kachchapi.com`.

## Where to Add DNS Entries

DNS entries must be added in the **DNS management section of your domain registrar** (where you purchased `kachchapi.com`).

### Common Domain Registrars:

1. **GoDaddy** - Most common
2. **Namecheap**
3. **Google Domains**
4. **AWS Route 53** (if using Route 53 as registrar)
5. **Other registrars** (Cloudflare, Name.com, etc.)

## Step 1: Find Your CloudFront Distribution Domain Name

After creating the CloudFront distribution, you'll get a domain name like:
- `d1234567890abcdef.cloudfront.net`

You can find this by:
1. Going to AWS CloudFront Console
2. Finding your distribution for `kachchapi.com`
3. Copy the **Distribution Domain Name**

Or run:
```bash
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'kachchapi.com')].DomainName" --output text
```

## Step 2: Add DNS Records

### Option A: GoDaddy (Most Common)

1. **Log in to GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in to your account

2. **Navigate to DNS Management**
   - Go to "My Products"
   - Find `kachchapi.com` domain
   - Click "DNS" or "Manage DNS"

3. **Add CNAME Record for Root Domain**
   - Click "Add" to create a new record
   - **Type**: Select "CNAME"
   - **Name**: Enter `@` (or leave blank, depending on GoDaddy interface)
   - **Value**: Enter your CloudFront domain (e.g., `d1234567890abcdef.cloudfront.net`)
   - **TTL**: 600 seconds (10 minutes) or 3600 (1 hour)
   - Click "Save"

4. **Add CNAME Record for www (Optional)**
   - Click "Add" again
   - **Type**: Select "CNAME"
   - **Name**: Enter `www`
   - **Value**: Enter your CloudFront domain (e.g., `d1234567890abcdef.cloudfront.net`)
   - **TTL**: 600 seconds
   - Click "Save"

**Note**: Some registrars don't allow CNAME for root domain (@). In that case:
- Use an **A Record (Alias)** if available
- Or use a DNS provider that supports ALIAS/ANAME records (like Route 53, Cloudflare)

### Option B: AWS Route 53

If you're using Route 53 as your DNS provider:

1. **Go to Route 53 Console**
   - Navigate to "Hosted zones"
   - Select your `kachchapi.com` hosted zone

2. **Create Alias Record**
   - Click "Create record"
   - **Record name**: Leave blank (for root) or enter `www`
   - **Record type**: Select "A - Routes traffic to an IPv4 address and some AWS resources"
   - **Alias**: Toggle ON
   - **Route traffic to**: 
     - Select "Alias to CloudFront distribution"
     - Choose your CloudFront distribution from the dropdown
   - Click "Create records"

### Option C: Cloudflare

1. **Log in to Cloudflare**
   - Go to https://dash.cloudflare.com
   - Select your domain `kachchapi.com`

2. **Add DNS Record**
   - Go to "DNS" section
   - Click "Add record"
   - **Type**: Select "CNAME"
   - **Name**: `@` (for root) or `www`
   - **Target**: Your CloudFront domain (e.g., `d1234567890abcdef.cloudfront.net`)
   - **Proxy status**: DNS only (gray cloud) - CloudFront handles SSL
   - Click "Save"

### Option D: Namecheap

1. **Log in to Namecheap**
   - Go to https://www.namecheap.com
   - Sign in and go to "Domain List"

2. **Access DNS Settings**
   - Click "Manage" next to `kachchapi.com`
   - Go to "Advanced DNS" tab

3. **Add CNAME Record**
   - Click "Add New Record"
   - **Type**: CNAME Record
   - **Host**: `@` (for root) or `www`
   - **Value**: Your CloudFront domain (e.g., `d1234567890abcdef.cloudfront.net`)
   - **TTL**: Automatic or 30 min
   - Click the checkmark to save

## Step 3: Verify DNS Propagation

After adding DNS records, verify they're working:

### Method 1: Using dig (Command Line)
```bash
dig kachchapi.com CNAME
# or
dig kachchapi.com A
```

### Method 2: Using Online Tools
- https://dnschecker.org
- https://www.whatsmydns.net
- https://mxtoolbox.com/DNSLookup.aspx

Enter `kachchapi.com` and check if it resolves to your CloudFront domain.

### Method 3: Using nslookup
```bash
nslookup kachchapi.com
```

## Important Notes

### Root Domain (@) Limitations
- **CNAME for root domain**: Not all DNS providers support CNAME for root domain (@)
- **Solutions**:
  - Use **ALIAS/ANAME** record if available (Route 53, Cloudflare, etc.)
  - Use **A Record** pointing to CloudFront IPs (not recommended, IPs can change)
  - Use a DNS provider that supports root CNAME (Route 53, Cloudflare)

### TTL (Time To Live)
- **Lower TTL** (300-600 seconds): Faster changes, more DNS queries
- **Higher TTL** (3600+ seconds): Slower changes, fewer DNS queries
- **Recommendation**: Start with 600 seconds, increase to 3600 after everything works

### Propagation Time
- DNS changes can take **15 minutes to 48 hours** to propagate globally
- Usually completes within **1-4 hours**
- Use DNS checker tools to monitor propagation

### SSL Certificate
- Ensure your SSL certificate in ACM covers:
  - `kachchapi.com` (required)
  - `www.kachchapi.com` (optional, if using www subdomain)

## Troubleshooting

### DNS Not Resolving
1. **Check DNS records**: Verify they're saved correctly
2. **Wait for propagation**: Can take up to 48 hours
3. **Clear DNS cache**: 
   - Windows: `ipconfig /flushdns`
   - Mac/Linux: `sudo dscacheutil -flushcache` or `sudo systemd-resolve --flush-caches`
4. **Check from different locations**: Use DNS checker tools

### CloudFront Not Accessible
1. **Verify CloudFront distribution** is deployed and enabled
2. **Check SSL certificate** is attached and valid
3. **Verify alias** is configured in CloudFront distribution
4. **Check S3 bucket** has correct permissions

### Certificate Errors
1. **Verify certificate** includes the domain you're accessing
2. **Check certificate status** in ACM (should be "Issued")
3. **Ensure certificate** is in **us-east-1** region for CloudFront

## Quick Reference

**For GoDaddy:**
- DNS Management → Add CNAME → Name: `@`, Value: `your-cloudfront-domain.cloudfront.net`

**For Route 53:**
- Hosted Zones → Create Record → Type: A (Alias) → Alias to CloudFront distribution

**For Cloudflare:**
- DNS → Add Record → Type: CNAME → Name: `@`, Target: `your-cloudfront-domain.cloudfront.net`

**For Namecheap:**
- Advanced DNS → Add New Record → Type: CNAME → Host: `@`, Value: `your-cloudfront-domain.cloudfront.net`

