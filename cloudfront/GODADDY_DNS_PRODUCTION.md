# GoDaddy DNS Configuration for Production (kachchapi.com)

## ⚠️ Important Limitations

GoDaddy doesn't support CNAME records for the root domain (`kachchapi.com`). Since CloudFront uses dynamic IP addresses that can change, using GoDaddy nameservers requires manual maintenance.

## CloudFront Distribution Details

- **CloudFront Domain**: `d10n9c3i324q2a.cloudfront.net`
- **Distribution ID**: `E1J13BV9BKDAET`
- **SSL Certificate**: Configured for `kachchapi.com` and `www.kachchapi.com`

## GoDaddy DNS Records to Add

### 1. For www.kachchapi.com (CNAME Record)

```
Type: CNAME
Name: www
Value: d10n9c3i324q2a.cloudfront.net
TTL: 600 (10 minutes) or 3600 (1 hour)
```

### 2. For kachchapi.com (A Records)

Since GoDaddy doesn't support CNAME for root domain, you need to add multiple A records pointing to CloudFront IPs.

**⚠️ WARNING**: CloudFront IPs can change. You'll need to monitor and update these manually.

**Current CloudFront IPs** (as of deployment):
```
Type: A
Name: @ (or leave blank for root domain)
Value: 18.239.111.102
TTL: 600

Type: A
Name: @
Value: 18.239.111.40
TTL: 600

Type: A
Name: @
Value: 18.239.111.21
TTL: 600

Type: A
Name: @
Value: 18.239.111.105
TTL: 600
```

## Steps to Configure in GoDaddy

1. **Log in to GoDaddy**
   - Go to https://www.godaddy.com
   - Navigate to "My Products" → "Domains"
   - Click on `kachchapi.com`

2. **Access DNS Management**
   - Click on "DNS" or "Manage DNS"
   - Scroll to "Records" section

3. **Add CNAME for www**
   - Click "Add" button
   - Type: Select "CNAME"
   - Name: Enter `www`
   - Value: Enter `d10n9c3i324q2a.cloudfront.net`
   - TTL: 600 (or 3600)
   - Click "Save"

4. **Add A Records for Root Domain**
   - Click "Add" button
   - Type: Select "A"
   - Name: Leave blank or enter `@`
   - Value: Enter one of the CloudFront IPs (e.g., `18.239.111.102`)
   - TTL: 600
   - Click "Save"
   - Repeat for each CloudFront IP (add 4 separate A records)

5. **Remove Old Records** (if any)
   - Delete any existing A records pointing to old IPs
   - Keep MX records if you have email configured

6. **Save Changes**
   - Wait 5-15 minutes for DNS to propagate

## How to Get Current CloudFront IPs

If CloudFront IPs change, you can get the current IPs by running:

```bash
dig d10n9c3i324q2a.cloudfront.net +short
```

Or use online tools:
- https://dnschecker.org/#A/d10n9c3i324q2a.cloudfront.net
- https://www.whatsmydns.net/#A/d10n9c3i324q2a.cloudfront.net

## Monitoring and Maintenance

Since CloudFront IPs can change, you should:

1. **Monitor DNS Resolution**
   - Periodically check if `kachchapi.com` resolves correctly
   - Use: `dig kachchapi.com +short` or online DNS checkers

2. **Update A Records When IPs Change**
   - If CloudFront IPs change, update the A records in GoDaddy
   - This is why Route 53 (with Alias records) is recommended

## Alternative: Use Route 53 (Recommended)

Instead of managing DNS in GoDaddy, you can:

1. Keep Route 53 hosted zone (already created)
2. In GoDaddy, update nameservers to Route 53 nameservers:
   - `ns-1826.awsdns-36.co.uk`
   - `ns-214.awsdns-26.com`
   - `ns-980.awsdns-58.net`
   - `ns-1185.awsdns-20.org`

This way, Route 53 automatically handles CloudFront IP changes using Alias records.

## Verification

After configuring DNS:

1. **Wait 5-15 minutes** for DNS propagation
2. **Test DNS resolution**:
   ```bash
   dig kachchapi.com +short
   dig www.kachchapi.com +short
   ```
3. **Test website**:
   - https://kachchapi.com
   - https://www.kachchapi.com

Both should load your website from CloudFront.

## Troubleshooting

If `kachchapi.com` doesn't work:

1. **Check DNS propagation**: https://dnschecker.org/#A/kachchapi.com
2. **Verify A records** in GoDaddy match current CloudFront IPs
3. **Clear DNS cache**: 
   ```bash
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```
4. **Check CloudFront distribution** is deployed:
   ```bash
   aws cloudfront get-distribution --id E1J13BV9BKDAET --query 'Distribution.Status'
   ```

