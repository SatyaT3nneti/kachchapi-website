// AWS Lambda function to send callback request emails using AWS SES
// This function is deployed to AWS Lambda and called via API Gateway

const AWS = require('aws-sdk');

// Email configuration from environment variables
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
  
  // Use IAM role credentials (recommended for Lambda)
  // Lambda automatically provides credentials via the execution role
  // Get region from Lambda environment (AWS_REGION is automatically set)
  const region = process.env.AWS_REGION || config.aws.region || 'ap-south-2';
  
  AWS.config.update({
    region: region,
  });
  
  return new AWS.SES({ apiVersion: '2010-12-01' });
};

// Helper function to generate demo session booking email template for admin
function generateDemoSessionAdminTemplate(data) {
  const primaryColor = '#f97316';
  const darkColor = '#1e293b';
  const purpleColor = '#9333ea';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Live Demo Session Request - Kachchapi</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(to right, #1e293b 0%, #334155 50%, #9333ea 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 32px; font-weight: 900; font-family: 'Montserrat', Arial, sans-serif; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                KACHCHAPI
              </h1>
              <p style="color: #e2e8f0; margin: 0; font-size: 12px; font-family: 'Plus Jakarta Sans', Arial, sans-serif; letter-spacing: 1px;">
                Learn by experience | Learn from experienced
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${darkColor}; margin: 0 0 20px 0; font-size: 24px; font-weight: 700; font-family: 'Montserrat', Arial, sans-serif;">
                🎯 New Live Demo Session Request
              </h2>
              <p style="color: #64748b; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Someone is interested in booking a free live demo session with Kachchapi Founders & Top Instructors.
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: ${darkColor};">
                    Name
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    ${data.name}
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
                    Phone
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155;">
                    ${data.countryCode} ${data.phone}
                  </td>
                </tr>
              </table>
              <div style="background-color: #fff7ed; border-left: 4px solid ${primaryColor}; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #9a3412; font-size: 14px; font-weight: 600;">
                  ⚡ Action Required: Please contact this person to schedule their live demo session.
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
                This is an automated email from the Kachchapi website demo session booking form.
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

// Helper function to generate demo session acknowledgement email template for the user
function generateDemoSessionAcknowledgementTemplate(data, config) {
  const primaryColor = '#f97316';
  const darkColor = '#1e293b';
  const purpleColor = '#9333ea';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Interest - Kachchapi</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(to right, #1e293b 0%, #334155 50%, #9333ea 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 32px; font-weight: 900; font-family: 'Montserrat', Arial, sans-serif; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                KACHCHAPI
              </h1>
              <p style="color: #e2e8f0; margin: 0; font-size: 12px; font-family: 'Plus Jakarta Sans', Arial, sans-serif; letter-spacing: 1px;">
                Learn by experience | Learn from experienced
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${darkColor}; margin: 0 0 20px 0; font-size: 24px; font-weight: 700; font-family: 'Montserrat', Arial, sans-serif;">
                Thank You for Your Interest, ${data.name}!
              </h2>
              <p style="color: #64748b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                We have received your request to book a <strong>Free Live Demo Session</strong> with Kachchapi Founders & Top Instructors. We're excited to show you how we can help you become a future-ready software developer with AI skills!
              </p>
              <div style="background-color: #f0f9ff; border-left: 4px solid ${primaryColor}; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: ${darkColor}; font-size: 16px; font-weight: 600;">
                  What happens next?
                </p>
                <ul style="margin: 10px 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                  <li>Our team will review your request</li>
                  <li>We'll contact you within 24-48 hours to schedule your live demo session</li>
                  <li>You'll get to interact with our founders and top instructors</li>
                  <li>We'll discuss your learning goals and how Kachchapi can help you</li>
                </ul>
              </div>
              <div style="background-color: #fff7ed; border: 1px solid ${primaryColor}; padding: 20px; margin: 20px 0; border-radius: 4px; text-align: center;">
                <p style="margin: 0; color: ${darkColor}; font-size: 14px; line-height: 1.6;">
                  <strong>Your Demo Session Request:</strong><br>
                  Name: ${data.name}<br>
                  Email: ${data.email}<br>
                  Phone: ${data.countryCode} ${data.phone}
                </p>
              </div>
              <p style="color: #64748b; margin: 30px 0 20px 0; font-size: 16px; line-height: 1.6;">
                If you have any urgent questions, feel free to reach out to us directly at 
                <a href="mailto:support@kachchapi.com" style="color: ${primaryColor}; text-decoration: none; font-weight: 600;">support@kachchapi.com</a>
              </p>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.6;">
                We look forward to meeting you in the demo session!
              </p>
              <p style="color: #64748b; margin: 20px 0 0 0; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: ${darkColor}; font-family: 'Montserrat', Arial, sans-serif;">The Kachchapi Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0f172a; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px; font-family: 'Montserrat', Arial, sans-serif;">
                © ${new Date().getFullYear()} Kachchapi Technologies. All rights reserved.
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

// Helper function to generate acknowledgement email template for the user
function generateAcknowledgementTemplate(data, config) {
  const primaryColor = '#f97316';
  const darkColor = '#1e293b';
  const purpleColor = '#9333ea';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Interest - Kachchapi</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(to right, #1e293b 0%, #334155 50%, #9333ea 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 32px; font-weight: 900; font-family: 'Montserrat', Arial, sans-serif; font-style: normal; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                KACHCHAPI
              </h1>
              <p style="color: #e2e8f0; margin: 0; font-size: 12px; font-family: 'Plus Jakarta Sans', Arial, sans-serif; letter-spacing: 1px;">
                Learn by experience | Learn from experienced
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${darkColor}; margin: 0 0 20px 0; font-size: 24px; font-weight: 700; font-family: 'Montserrat', Arial, sans-serif;">
                Thank You, ${data.fullName}!
              </h2>
              <p style="color: #64748b; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                We have received your callback request and are excited to help you on your learning journey.
              </p>
              <div style="background-color: #f0f9ff; border-left: 4px solid ${primaryColor}; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: ${darkColor}; font-size: 16px; font-weight: 600;">
                  What happens next?
                </p>
                <ul style="margin: 10px 0; padding-left: 20px; color: #475569; line-height: 1.8;">
                  <li>Our team will review your request</li>
                  <li>We'll contact you within 24-48 hours</li>
                  <li>We'll discuss your requirements and answer any questions</li>
                </ul>
              </div>
              <div style="background-color: #fff7ed; border: 1px solid ${primaryColor}; padding: 20px; margin: 20px 0; border-radius: 4px; text-align: center;">
                <p style="margin: 0; color: ${darkColor}; font-size: 14px; line-height: 1.6;">
                  <strong>Your Request Details:</strong><br>
                  Program: ${data.program}<br>
                  ${data.jobTitle ? `Job Title: ${data.jobTitle}<br>` : ''}
                  ${data.graduationYear ? `Graduation Year: ${data.graduationYear}` : ''}
                </p>
              </div>
              <p style="color: #64748b; margin: 30px 0 20px 0; font-size: 16px; line-height: 1.6;">
                If you have any urgent questions, feel free to reach out to us directly at 
                <a href="mailto:support@kachchapi.com" style="color: ${primaryColor}; text-decoration: none; font-weight: 600;">support@kachchapi.com</a>
              </p>
              <p style="color: #64748b; margin: 0; font-size: 14px; line-height: 1.6;">
                We look forward to speaking with you soon!
              </p>
              <p style="color: #64748b; margin: 20px 0 0 0; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: ${darkColor}; font-family: 'Montserrat', Arial, sans-serif;">The Kachchapi Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #0f172a; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px; font-family: 'Montserrat', Arial, sans-serif;">
                © ${new Date().getFullYear()} Kachchapi Technologies. All rights reserved.
              </p>
              <p style="color: #64748b; margin: 5px 0 0 0; font-size: 11px;">
                This is an automated confirmation email. Please do not reply to this email.
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

// Helper function to generate email template
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
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Plus+Jakarta+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(to right, #1e293b 0%, #334155 50%, #9333ea 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 32px; font-weight: 900; font-family: 'Montserrat', Arial, sans-serif; font-style: normal; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                KACHCHAPI
              </h1>
              <p style="color: #e2e8f0; margin: 0; font-size: 12px; font-family: 'Plus Jakarta Sans', Arial, sans-serif; letter-spacing: 1px;">
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

// Lambda handler function
exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS' || event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  const httpMethod = event.httpMethod || event.requestContext?.http?.method || event.requestContext?.httpMethod;
  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false,
        message: 'Method not allowed. Only POST requests are supported.' 
      }),
    };
  }

  try {
    // Parse request body (handle both API Gateway v1 and v2 formats)
    let data;
    if (typeof event.body === 'string') {
      data = JSON.parse(event.body);
    } else {
      data = event.body || {};
    }

    const config = getEmailConfig();

    // Check request type: 'demo-session' or 'callback-request' (default)
    const requestType = data.requestType || 'callback-request';

    // Create SES client
    const ses = createSESClient();

    let adminParams, acknowledgementParams;

    if (requestType === 'demo-session') {
      // Validate required fields for demo session
      if (!data.email || !data.name || !data.phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false,
            message: 'Missing required fields: email, name, and phone are required' 
          }),
        };
      }

      // Email parameters for admin notification (demo session)
      adminParams = {
        Source: config.fromEmail,
        Destination: {
          ToAddresses: [config.adminEmail],
        },
        Message: {
          Subject: {
            Data: `New Live Demo Session Request from ${data.name}`,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: generateDemoSessionAdminTemplate(data),
              Charset: 'UTF-8',
            },
          },
        },
        ReplyToAddresses: [data.email],
      };

      // Email parameters for user acknowledgement (demo session)
      acknowledgementParams = {
        Source: config.fromEmail,
        Destination: {
          ToAddresses: [data.email],
        },
        Message: {
          Subject: {
            Data: `Thank You for Your Interest in Our Live Demo Session - Kachchapi`,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: generateDemoSessionAcknowledgementTemplate(data, config),
              Charset: 'UTF-8',
            },
          },
        },
      };
    } else {
      // Validate required fields for callback request
      if (!data.email || !data.fullName || !data.mobileNumber) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false,
            message: 'Missing required fields: email, fullName, and mobileNumber are required' 
          }),
        };
      }

      // Email parameters for admin notification (callback request)
      adminParams = {
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

      // Email parameters for user acknowledgement (callback request)
      acknowledgementParams = {
        Source: config.fromEmail,
        Destination: {
          ToAddresses: [data.email],
        },
        Message: {
          Subject: {
            Data: `Thank You for Your Interest - Kachchapi`,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: generateAcknowledgementTemplate(data, config),
              Charset: 'UTF-8',
            },
          },
        },
      };
    }

    // Send both emails
    const [adminResult, ackResult] = await Promise.all([
      ses.sendEmail(adminParams).promise(),
      ses.sendEmail(acknowledgementParams).promise()
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Emails sent successfully',
        adminMessageId: adminResult.MessageId,
        acknowledgementMessageId: ackResult.MessageId,
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
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      }),
    };
  }
};

