# Fix AWS CLI Credentials

## Issue
Your AWS CLI credentials are invalid or expired.

## Solution

### Step 1: Get New Access Keys

1. Go to **AWS Console** → **IAM** → **Users**
2. Click on your IAM user
3. Go to **Security credentials** tab
4. Under **Access keys**, click **"Create access key"**
5. Choose **"Command Line Interface (CLI)"**
6. Copy both:
   - **Access Key ID**
   - **Secret Access Key** (shown only once!)

### Step 2: Configure AWS CLI

Run:
```bash
aws configure
```

Enter:
- **AWS Access Key ID**: [paste your new access key]
- **AWS Secret Access Key**: [paste your secret key]
- **Default region name**: `ap-south-2`
- **Default output format**: `json`

### Step 3: Verify

```bash
aws sts get-caller-identity
```

Should return your account ID and user ARN.

---

**Once fixed, I can deploy the Lambda function for you!**

