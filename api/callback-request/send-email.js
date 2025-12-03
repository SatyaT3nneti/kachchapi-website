// Serverless function to send callback request emails using AWS SES
// This can be deployed as a Netlify function, Vercel function, or Express endpoint

const AWS = require('aws-sdk');

// Email configuration from environment variables
const getEmailConfig = () => {
  return {
    adminEmail: process.env.KACHCHAPI_ADMIN_EMAIL || process.env.REACT_APP_ADMIN_EMAIL || 'admin@kachchapi.com',
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

// Handler function (for serverless deployment)
exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const config = getEmailConfig();

    // Validate required fields
    if (!data.email || !data.fullName || !data.mobileNumber) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Missing required fields' 
        }),
      };
    }

    // Create SES client
    const ses = createSESClient();

    // Email parameters for AWS SES
    const params = {
      Source: config.fromEmail, // Use just email address for better SES compatibility
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
    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: error.message || 'Failed to send email',
      }),
    };
  }
};

// Helper function to generate email template (same as frontend)
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

