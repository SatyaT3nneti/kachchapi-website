# Required AWS Permissions for CloudFront Deployment

Your IAM user (`SES_API`) needs additional permissions to create S3 buckets and CloudFront distributions.

## Add These Permissions

Go to **AWS Console** → **IAM** → **Users** → `SES_API` → **Add permissions**

### Option 1: Attach Managed Policies (Easiest)

Attach these policies:
- ✅ **AmazonS3FullAccess** - For S3 bucket operations
- ✅ **CloudFrontFullAccess** - For CloudFront distribution management
- ✅ **AWSCertificateManagerFullAccess** - For SSL certificate management (if needed)

### Option 2: Custom Policy (More Secure)

Create a custom policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3BucketManagement",
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:GetBucketLocation",
        "s3:ListBucket",
        "s3:PutBucketPolicy",
        "s3:PutBucketVersioning",
        "s3:PutBucketCors",
        "s3:PutBucketWebsite",
        "s3:GetBucketPolicy",
        "s3:GetBucketVersioning",
        "s3:GetBucketCors",
        "s3:GetBucketWebsite"
      ],
      "Resource": "arn:aws:s3:::kachchapi-demo-website"
    },
    {
      "Sid": "S3ObjectManagement",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::kachchapi-demo-website",
        "arn:aws:s3:::kachchapi-demo-website/*"
      ]
    },
    {
      "Sid": "CloudFrontFullAccess",
      "Effect": "Allow",
      "Action": [
        "cloudfront:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "ACMCertificateAccess",
      "Effect": "Allow",
      "Action": [
        "acm:ListCertificates",
        "acm:DescribeCertificate",
        "acm:RequestCertificate"
      ],
      "Resource": "*"
    }
  ]
}
```

## After Adding Permissions

Once permissions are added, I can:
1. Create the S3 bucket
2. Upload the website files
3. Create CloudFront distribution
4. Configure everything for demo.kachchapi.com

