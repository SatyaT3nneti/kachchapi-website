// Environment configuration for the application
const getEnvironment = () => {
  // You can set this in your package.json scripts or manually
  const env = process.env.REACT_APP_ENV || 'local';
  
  const configs = {
    local: {
      website: {
        baseUrl: 'http://localhost:3000',
      },
      api: {
        baseUrl: 'http://localhost:5014/api',
        endpoints: {
          callbackRequest: {
            sendEmail: '/callback-request/send-email',
          },
          contactUs: {
            submit: '/contactus/submit',
            getAll: '/contactus',
            getById: (id: string) => `/contactus/${id}`,
            update: (id: string) => `/contactus/${id}`,
            delete: (id: string) => `/contactus/${id}`,
            pendingCount: '/contactus/pending/count',
            resendEmail: (id: string) => `/contactus/${id}/resend-email`,
          },
          leaders: {
            getAll: '/website/leaders',
            getById: (id: string) => `/website/leaders/${id}`,
            search: '/website/leaders',
            filter: '/website/leaders',
            stats: '/website/leaders/stats',
          },
        },
      },
      features: {
        enableContactForm: true,
        enableFormValidation: true,
        enableRealTimeValidation: true,
      },
      ui: {
        maxFormRetries: 3,
        formSubmissionTimeout: 30000,
        showSuccessMessageDuration: 5000,
      },
    },
    dev: {
      website: {
        baseUrl: 'https://demo.kachchapi.com',
      },
      api: {
        baseUrl: 'https://dev-api.kachchapi.com/api',
        endpoints: {
          callbackRequest: {
            sendEmail: '/callback-request/send-email',
          },
          contactUs: {
            submit: '/api/contactus/submit',
            getAll: '/api/contactus',
            getById: (id: string) => `/api/contactus/${id}`,
            update: (id: string) => `/api/contactus/${id}`,
            delete: (id: string) => `/api/contactus/${id}`,
            pendingCount: '/api/contactus/pending/count',
            resendEmail: (id: string) => `/api/contactus/${id}/resend-email`,
          },
          leaders: {
            getAll: '/website/leaders',
            getById: (id: string) => `/website/leaders/${id}`,
            search: '/website/leaders',
            filter: '/website/leaders',
            stats: '/website/leaders/stats',
          },
        },
      },
      features: {
        enableContactForm: true,
        enableFormValidation: true,
        enableRealTimeValidation: true,
      },
      ui: {
        maxFormRetries: 3,
        formSubmissionTimeout: 30000,
        showSuccessMessageDuration: 5000,
      },
    },
    qa: {
      website: {
        baseUrl: 'https://qa.kachchapi.com',
      },
      api: {
        baseUrl: 'https://qa-api.kachchapi.com',
        endpoints: {
          callbackRequest: {
            sendEmail: '/callback-request/send-email',
          },
          contactUs: {
            submit: '/api/contactus/submit',
            getAll: '/api/contactus',
            getById: (id: string) => `/api/contactus/${id}`,
            update: (id: string) => `/api/contactus/${id}`,
            delete: (id: string) => `/api/contactus/${id}`,
            pendingCount: '/api/contactus/pending/count',
            resendEmail: (id: string) => `/api/contactus/${id}/resend-email`,
          },
          leaders: {
            getAll: '/website/leaders',
            getById: (id: string) => `/website/leaders/${id}`,
            search: '/website/leaders',
            filter: '/website/leaders',
            stats: '/website/leaders/stats',
          },
        },
      },
      features: {
        enableContactForm: true,
        enableFormValidation: true,
        enableRealTimeValidation: true,
      },
      ui: {
        maxFormRetries: 3,
        formSubmissionTimeout: 30000,
        showSuccessMessageDuration: 5000,
      },
    },
    prod: {
      website: {
        baseUrl: 'https://kachchapi.com',
      },
      api: {
        baseUrl: 'https://api.kachchapi.com',
        endpoints: {
          callbackRequest: {
            sendEmail: '/callback-request/send-email',
            // Lambda endpoint: https://j1p2k4jsv5.execute-api.ap-south-2.amazonaws.com/prod/callback-request/send-email
          },
          contactUs: {
            submit: '/api/contactus/submit',
            getAll: '/api/contactus',
            getById: (id: string) => `/api/contactus/${id}`,
            update: (id: string) => `/api/contactus/${id}`,
            delete: (id: string) => `/api/contactus/${id}`,
            pendingCount: '/api/contactus/pending/count',
            resendEmail: (id: string) => `/api/contactus/${id}/resend-email`,
          },
          leaders: {
            getAll: '/website/leaders',
            getById: (id: string) => `/website/leaders/${id}`,
            search: '/website/leaders',
            filter: '/website/leaders',
            stats: '/website/leaders/stats',
          },
        },
      },
      features: {
        enableContactForm: true,
        enableFormValidation: true,
        enableRealTimeValidation: true,
      },
      ui: {
        maxFormRetries: 3,
        formSubmissionTimeout: 30000,
        showSuccessMessageDuration: 5000,
      },
    },
  };

  return configs[env as keyof typeof configs] || configs.local;
};

export const environment = getEnvironment();
export default environment;
