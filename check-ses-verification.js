// Script to check SES email verification status across regions
const AWS = require('aws-sdk');
require('dotenv').config();

const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-south-1'];

const config = {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SES_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SES_SECRET_KEY,
  },
  email: 'support@kachchapi.com',
};

async function checkVerificationStatus(region) {
  AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: region,
  });

  const ses = new AWS.SES({ apiVersion: '2010-12-01' });

  try {
    const result = await ses.getIdentityVerificationAttributes({
      Identities: [config.email],
    }).promise();

    const verificationStatus = result.VerificationAttributes[config.email];
    
    if (verificationStatus) {
      console.log(`✅ ${region}: ${verificationStatus.VerificationStatus}`);
      return verificationStatus.VerificationStatus === 'Success';
    } else {
      console.log(`❌ ${region}: Not found`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${region}: Error - ${error.message}`);
    return false;
  }
}

async function checkAllRegions() {
  console.log(`Checking verification status for ${config.email}...\n`);
  
  for (const region of regions) {
    await checkVerificationStatus(region);
  }
}

checkAllRegions();






