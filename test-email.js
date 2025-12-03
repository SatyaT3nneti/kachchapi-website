// Test script to send a test email via AWS SES
// Run with: node test-email.js

const AWS = require('aws-sdk');

// Load environment variables (you may need to install dotenv: npm install dotenv)
// Or set them directly here for testing
require('dotenv').config();

// Email configuration
const config = {
  adminEmail: 'support@kachchapi.com', // Test email recipient
  fromEmail: process.env.AWS_SES_FROM_EMAIL || 'support@kachchapi.com',
  fromName: process.env.AWS_SES_FROM_NAME || 'Kachchapi Support',
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SES_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SES_SECRET_KEY,
    region: process.env.AWS_REGION || process.env.AWS_SES_REGION || 'ap-south-2',
  },
};

// Create AWS SES client
// Force ap-south-2 region
const region = 'ap-south-2';
AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: region,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// Generate test email template
function generateTestEmailTemplate() {
  const primaryColor = '#f97316';
  const darkColor = '#1e293b';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Email - Kachchapi</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(to right, #1e293b 0%, #334155 50%, #9333ea 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 900; font-family: 'Montserrat', Arial, sans-serif; text-transform: uppercase; letter-spacing: 2px;">
                KACHCHAPI
              </h1>
              <p style="color: #e2e8f0; margin: 5px 0 0 0; font-size: 12px; font-family: 'Plus Jakarta Sans', Arial, sans-serif;">
                Learn by experience | Learn from experienced
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${darkColor}; margin: 0 0 20px 0; font-size: 24px; font-weight: 700; font-family: 'Montserrat', Arial, sans-serif;">
                Test Email - Email Service Working! ✅
              </h2>
              <p style="color: #64748b; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                This is a test email to verify that the Kachchapi email service is configured correctly and working properly.
              </p>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #166534; font-size: 14px; font-weight: 600;">
                  ✅ Email service is operational!
                </p>
                <p style="margin: 5px 0 0 0; color: #15803d; font-size: 13px;">
                  The callback request form will now send emails to the admin when users submit requests.
                </p>
              </div>

              <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 4px;">
                <h3 style="color: ${darkColor}; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                  Test Details:
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px; font-weight: 600; color: ${darkColor};">From:</td>
                    <td style="padding: 8px; color: #334155;">${config.fromName} &lt;${config.fromEmail}&gt;</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: 600; color: ${darkColor};">To:</td>
                    <td style="padding: 8px; color: #334155;">${config.adminEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: 600; color: ${darkColor};">Region:</td>
                    <td style="padding: 8px; color: #334155;">${config.aws.region}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: 600; color: ${darkColor};">Timestamp:</td>
                    <td style="padding: 8px; color: #334155;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0f172a; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px; font-family: 'Montserrat', Arial, sans-serif;">
                © ${new Date().getFullYear()} Kachchapi Technologies. All rights reserved.
              </p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 11px;">
                This is a test email from the Kachchapi email service.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Send test email
async function sendTestEmail() {
  try {
    console.log('🚀 Starting email test...');
    console.log('Configuration:');
    console.log(`  From: ${config.fromName} <${config.fromEmail}>`);
    console.log(`  To: ${config.adminEmail}`);
    console.log(`  Region: ${region}`);
    console.log('');

    const params = {
      Source: config.fromEmail, // Use just email address, not display name format
      Destination: {
        ToAddresses: [config.adminEmail],
      },
      Message: {
        Subject: {
          Data: 'Test Email - Kachchapi Email Service',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: generateTestEmailTemplate(),
            Charset: 'UTF-8',
          },
        },
      },
    };

    console.log('📧 Sending email via AWS SES...');
    const result = await ses.sendEmail(params).promise();
    
    console.log('✅ Email sent successfully!');
    console.log(`   Message ID: ${result.MessageId}`);
    console.log('');
    console.log(`📬 Check the inbox at ${config.adminEmail}`);
    console.log('   (It may take a few moments to arrive)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(`   ${error.message}`);
    console.error('');
    
    if (error.code === 'MessageRejected') {
      console.error('⚠️  The email address may not be verified in AWS SES.');
      console.error('   Please verify the email address in AWS SES console.');
    } else if (error.code === 'InvalidParameterValue') {
      console.error('⚠️  Check your AWS credentials and region configuration.');
    } else if (error.code === 'AccessDenied') {
      console.error('⚠️  The AWS access key does not have permission to send emails.');
      console.error('   Ensure the IAM user has ses:SendEmail permission.');
    }
    
    console.error('');
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Run the test
sendTestEmail();

