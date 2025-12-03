// Simple Express server for local testing of email functionality
// Run with: node server.js
// This allows testing the email service locally without Netlify Dev

const express = require('express');
const cors = require('cors');
const path = require('path');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Email configuration
const getEmailConfig = () => {
  return {
    adminEmail: process.env.KACHCHAPI_ADMIN_EMAIL || process.env.REACT_APP_ADMIN_EMAIL || 'support@kachchapi.com',
    fromEmail: process.env.AWS_SES_FROM_EMAIL || 'support@kachchapi.com',
    fromName: process.env.AWS_SES_FROM_NAME || 'Kachchapi Support',
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.AWS_SES_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SES_SECRET_KEY,
      region: process.env.AWS_REGION || process.env.AWS_SES_REGION || 'ap-south-2',
    },
  };
};

// Create AWS SES client
const createSESClient = () => {
  const config = getEmailConfig();
  
  AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
  });
  
  return new AWS.SES({ apiVersion: '2010-12-01' });
};

// Email template generator (same as in emailService.ts)
function generateEmailTemplate(data) {
  const primaryColor = '#f97316';
  const darkColor = '#1e293b';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Callback Request - Kachchapi</title>
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
                New Callback Request
              </h2>
              <p style="color: #64748b; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                You have received a new callback request from the website. Please find the details below:
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor}; width: 40%;">
                    Full Name
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    ${data.fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor};">
                    Email
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    <a href="mailto:${data.email}" style="color: ${primaryColor}; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor};">
                    Phone Number
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    <a href="tel:${data.countryCode}${data.mobileNumber}" style="color: ${primaryColor}; text-decoration: none;">${data.countryCode} ${data.mobileNumber}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor};">
                    Graduation Year
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    ${data.graduationYear}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor};">
                    Job Title
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    ${data.jobTitle}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor};">
                    Program/Service
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    ${data.program}
                  </td>
                </tr>
                ${data.description ? `
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor}; vertical-align: top;">
                    Description
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155; white-space: pre-wrap;">
                    ${data.description.replace(/\n/g, '<br>')}
                  </td>
                </tr>
                ` : ''}
              </table>
              <div style="background-color: #fff7ed; border-left: 4px solid ${primaryColor}; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #9a3412; font-size: 14px; font-weight: 600;">
                  ⚡ Action Required: Please contact this person at your earliest convenience.
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0f172a; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px; font-family: 'Montserrat', Arial, sans-serif;">
                © ${new Date().getFullYear()} Kachchapi Technologies. All rights reserved.
              </p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 11px;">
                This is an automated email from the Kachchapi website contact form.
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

// API endpoint for sending callback request emails
app.post('/api/callback-request/send-email', async (req, res) => {
  try {
    const data = req.body;
    const config = getEmailConfig();

    // Validate required fields
    if (!data.email || !data.fullName || !data.mobileNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Create SES client
    const ses = createSESClient();

    // Email parameters for AWS SES
    const params = {
      Source: config.fromEmail,
      Destination: {
        ToAddresses: [config.adminEmail],
      },
      Message: {
        Subject: {
          Data: `New Callback Request from ${data.fullName}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: data.emailTemplate || generateEmailTemplate(data),
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [data.email],
    };

    // Send email via AWS SES
    const result = await ses.sendEmail(params).promise();

    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.MessageId,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email',
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/api/callback-request/send-email`);
});


