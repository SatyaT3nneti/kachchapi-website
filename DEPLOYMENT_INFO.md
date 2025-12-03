# Deployment Information - Kachchapi Lambda Function

## ✅ Confirmed Information

- **Sender Email (SES)**: `support@kachchapi.com`
- **From Name**: `Kachchapi Support`
- **Admin/Recipient Email**: `support@kachchapi.com`
- **IAM Permissions**: ✅ Added

## 📋 Still Need

Please provide:

2. **AWS Region**: `_________________`
   - Where to deploy Lambda and API Gateway
   - Common: `ap-south-2` (Hyderabad), `us-east-1`, `us-west-2`
   - Should match your SES region

3. **AWS Account ID** (Optional - can find automatically):
   - We can find this with: `aws sts get-caller-identity`

4. **Deployment Environment**: 
   - [ ] Production (`prod`)
   - [ ] Development (`dev`)
   - [ ] QA (`qa`)

5. **Frontend URL** (for CORS):
   - Production: `https://kachchapi.com` (already in config)
   - Or specify if different

---

## 🚀 Ready to Deploy?

Once you provide the admin email and AWS region, I can:
1. Create the deployment script with your specific values
2. Guide you through deployment
3. Update frontend configuration

