import React, { useState } from 'react';
import contactUsService, { ContactRequest } from '../services/contactUsService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactRequest>({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    requestBody: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const officeLocations = [
    {
      name: "Visakhapatnam, AP",
      address: "Kachchapi Technologies, Ahub, Andhra University North Gate, Andhra University, Maddilapalem, Visakhapatnam, AP, INDIA 530013"
    }
  ];

  const contactInfo = [
    {
      icon: "📍",
      label: "Location Address:",
      value: "Kachchapi Technologies, Ahub, Andhra University North Gate, Andhra University, Maddilapalem, Visakhapatnam, AP, INDIA 530013"
    },
    {
      icon: "📞", 
      label: "Phone Numbers:",
      value: "+91 93912 56768"
    },
    {
      icon: "✉️",
      label: "Email Address:",
      value: "support@kachchapi.com"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    
    // Clear submit status when user makes changes
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize and validate form data
    const sanitizedData = contactUsService.sanitizeContactData(formData);
    const validation = contactUsService.validateContactData(sanitizedData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      const response = await contactUsService.submitContactRequest(sanitizedData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message
        });
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          subject: '',
          requestBody: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find(error => error.toLowerCase().includes(fieldName.toLowerCase()));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Google Map */}
      <section className="relative bg-gray-100">
        <div className="relative h-[500px] md:h-[600px] w-full">
          <iframe
            src="https://www.google.com/maps?q=17.7321504,83.3212534&hl=en&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Kachchapi Technologies Location - Ahub, Andhra University North Gate"
          ></iframe>
          {/* Overlay with title and breadcrumb */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-dark-800/80 to-transparent z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col lg:flex-row justify-between items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
                </div>
                <div className="text-lg text-gray-200">
                  Home → Contact Us
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Office Location */}
          <div className="mb-16">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
                <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark-800 mb-3">Visakhapatnam, AP</h3>
                <p className="text-gray-600">Kachchapi Technologies, Ahub, Andhra University North Gate, Andhra University, Maddilapalem, Visakhapatnam, AP, INDIA 530013</p>
              </div>
            </div>
          </div>

          {/* Contact Information and Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-dark-800 mb-4">
                  Reachout to us for more information
                </h2>
                <p className="text-gray-600">
                  Connect with us to discover how we can help transform your learning journey through our innovative educational platforms.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">{info.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">{info.label}</p>
                        <p className="text-dark-800 font-semibold">{info.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">CONTACT US</span>
                <h3 className="text-2xl font-bold text-dark-800 mt-2 mb-2">
                  Send Your Message
                </h3>
                <p className="text-gray-600">
                  Our team is ready to answer all your questions.
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`mb-4 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              {/* Validation Errors */}
              {errors.length > 0 && (
                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg border border-red-200">
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Your Name.."
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      getFieldError('name') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('name') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('name')}</p>
                  )}
                </div>

                <div>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Your Email.."
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      getFieldError('email') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('email') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
                  )}
                </div>

                <div>
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    placeholder="Phone No.."
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      getFieldError('phone') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('phone') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
                  )}
                </div>

                <div>
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Your Subject.."
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      getFieldError('subject') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {getFieldError('subject') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('subject')}</p>
                  )}
                </div>

                <div>
                  <textarea 
                    name="requestBody"
                    placeholder="Enter Your Message..."
                    value={formData.requestBody}
                    onChange={handleInputChange}
                    className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      getFieldError('message') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={6}
                  ></textarea>
                  {getFieldError('message') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('message')}</p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary-500 hover:bg-primary-600'
                  } text-white`}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

