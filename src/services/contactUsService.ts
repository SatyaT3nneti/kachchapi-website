import environment from '../config/environment';

// ContactUs API Service
export interface ContactRequest {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  requestBody: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ApiError {
  message: string;
  status?: number;
}

class ContactUsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = environment.api.baseUrl;
  }

  async submitContactRequest(contactData: ContactRequest): Promise<ContactResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), environment.ui.formSubmissionTimeout);

      const response = await fetch(`${this.baseUrl}${environment.api.endpoints.contactUs.submit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: 'Contact request submitted successfully! We will get back to you soon.',
        data,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            message: 'Request timed out. Please check your connection and try again.',
          };
        }
        return {
          success: false,
          message: error.message,
        };
      }
      
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  }

  // Method to validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Method to validate phone number (basic validation)
  validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Method to validate required fields
  validateContactData(data: ContactRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name.trim()) {
      errors.push('Name is required');
    } else if (data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!data.email.trim()) {
      errors.push('Email is required');
    } else if (!this.validateEmail(data.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!data.phoneNumber.trim()) {
      errors.push('Phone number is required');
    } else if (!this.validatePhoneNumber(data.phoneNumber)) {
      errors.push('Please enter a valid phone number');
    }

    if (!data.subject.trim()) {
      errors.push('Subject is required');
    } else if (data.subject.trim().length < 5) {
      errors.push('Subject must be at least 5 characters long');
    }

    if (!data.requestBody.trim()) {
      errors.push('Message is required');
    } else if (data.requestBody.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Method to sanitize input data
  sanitizeContactData(data: ContactRequest): ContactRequest {
    return {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phoneNumber: data.phoneNumber.trim(),
      subject: data.subject.trim(),
      requestBody: data.requestBody.trim(),
    };
  }
}

export default new ContactUsService();
