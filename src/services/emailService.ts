// Email service for sending callback request emails
import { environment } from '../config/environment';

export interface CallbackRequestData {
  email: string;
  fullName: string;
  graduationYear: string;
  jobTitle: string;
  program: string;
  mobileNumber: string;
  countryCode: string;
  description: string;
}

export interface DemoSessionData {
  email: string;
  name: string;
  phone: string;
  countryCode: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

// Generate HTML email template with Kachchapi branding
export const generateEmailTemplate = (data: CallbackRequestData): string => {
  const primaryColor = '#f97316'; // Orange primary
  const darkColor = '#1e293b'; // Dark-800
  const purpleColor = '#9333ea'; // Purple accent
  
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
          <!-- Header with gradient -->
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
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: ${darkColor}; margin: 0 0 20px 0; font-size: 24px; font-weight: 700; font-family: 'Montserrat', Arial, sans-serif;">
                New Callback Request
              </h2>
              
              <p style="color: #64748b; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                You have received a new callback request from the website. Please find the details below:
              </p>
              
              <!-- Details Table -->
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
                    ${data.description}
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
          
          <!-- Footer -->
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
};

// Send email via API endpoint
export const sendCallbackRequestEmail = async (data: CallbackRequestData): Promise<EmailResponse> => {
  try {
    // Always use AWS Lambda endpoint (works for both local dev and production)
    const endpoint = environment.api.endpoints?.callbackRequest?.sendEmail || '/callback-request/send-email';
    const lambdaApiUrl = process.env.REACT_APP_LAMBDA_API_URL || 'https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod';
    const apiUrl = `${lambdaApiUrl}${endpoint}`;
    
    // Log for debugging
    console.log('Email Service - Sending request to:', apiUrl);
    console.log('Email Service - Environment:', process.env.REACT_APP_ENV || 'production');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        emailTemplate: generateEmailTemplate(data),
      }),
    }).catch((fetchError) => {
      console.error('Fetch error details:', fetchError);
      console.error('Failed URL:', apiUrl);
      throw new Error(`Network error: ${fetchError.message || 'Unable to connect to server'}`);
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Email sent successfully',
    };
  } catch (error) {
    console.error('Email service error:', error);
    if (error instanceof Error) {
      // Provide more helpful error messages
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          message: 'Network error: Unable to reach the server. Please check your internet connection and try again.',
        };
      }
      return {
        success: false,
        message: error.message || 'An error occurred while sending the email.',
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred while sending the email. Please try again or contact us directly.',
    };
  }
};

// Send demo session booking email
export const sendDemoSessionEmail = async (data: DemoSessionData): Promise<EmailResponse> => {
  try {
    const endpoint = environment.api.endpoints?.callbackRequest?.sendEmail || '/callback-request/send-email';
    const lambdaApiUrl = process.env.REACT_APP_LAMBDA_API_URL || 'https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod';
    const apiUrl = `${lambdaApiUrl}${endpoint}`;
    
    console.log('Demo Session Email Service - Sending request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        requestType: 'demo-session',
      }),
    }).catch((fetchError) => {
      console.error('Fetch error details:', fetchError);
      throw new Error(`Network error: ${fetchError.message || 'Unable to connect to server'}`);
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Email sent successfully',
    };
  } catch (error) {
    console.error('Demo session email service error:', error);
    if (error instanceof Error) {
      if (error.message.includes('Network error')) {
        return {
          success: false,
          message: error.message,
        };
      }
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred while sending the email.',
    };
  }
};

