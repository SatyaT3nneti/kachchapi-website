import React, { useState, useEffect } from 'react';
import { sendCallbackRequestEmail, CallbackRequestData } from '../services/emailService';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    graduationYear: '',
    jobTitle: '',
    program: '',
    mobileNumber: '',
    countryCode: '+91',
    description: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    }

    if (!formData.jobTitle) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.program) {
      newErrors.program = 'Program is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare data for email
      const callbackData: CallbackRequestData = {
        email: formData.email,
        fullName: formData.fullName,
        graduationYear: formData.graduationYear,
        jobTitle: formData.jobTitle,
        program: formData.program,
        mobileNumber: formData.mobileNumber,
        countryCode: formData.countryCode,
        description: formData.description
      };

      // Send email
      const result = await sendCallbackRequestEmail(callbackData);
      
      if (result.success) {
        // Reset form
        setFormData({
          email: '',
          fullName: '',
          graduationYear: '',
          jobTitle: '',
          program: '',
          mobileNumber: '',
          countryCode: '+91',
          description: ''
        });
        // Show success message
        alert('Thank you! We have received your request and will contact you soon.');
        onClose();
      } else {
        alert(`Error: ${result.message}. Please try again or contact us directly.`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const jobTitles = [
    'Student',
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'Business Analyst',
    'Other'
  ];

  const programs = [
    'Project-Based Training',
    'Interview Preparation',
    'Career Guidance',
    'Leadership Coaching',
    'Academic Project Mentorship',
    'Corporate Training'
  ];

  const graduationYears = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Blue Background */}
          <div className="hidden md:flex md:w-2/5 bg-gradient-to-r from-dark-800 via-dark-700 to-purple-600 relative overflow-hidden">
            <div className="relative z-10 p-8 flex flex-col justify-center text-white h-full font-montserrat">
              <h2 className="text-3xl font-black mb-4 font-montserrat">Talk to our Advisor</h2>
              <p className="text-lg mb-6 font-montserrat">AND GET</p>
              <ul className="space-y-4 font-montserrat">
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Personalized Career Roadmap</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free Career Counselling</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free Access to Kachchapi Events</span>
                </li>
              </ul>
             
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[90vh] font-montserrat">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 font-montserrat">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-montserrat">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email ID"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-montserrat">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your Full Name"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Graduation Year */}
              <div>
                  <label htmlFor="graduationYear" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-montserrat">
                  Graduation Year <span className="text-red-500">*</span>
                </label>
                <select
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors ${
                    errors.graduationYear ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Year of Graduation</option>
                  {graduationYears.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
                {errors.graduationYear && (
                  <p className="mt-1 text-sm text-red-500">{errors.graduationYear}</p>
                )}
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-montserrat">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <select
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors ${
                    errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Job title*</option>
                  {jobTitles.map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
                {errors.jobTitle && (
                  <p className="mt-1 text-sm text-red-500">{errors.jobTitle}</p>
                )}
              </div>

              {/* Program */}
              <div>
                <label htmlFor="program" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-montserrat">
                  Program <span className="text-red-500">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors ${
                    errors.program ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Program*</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
                {errors.program && (
                  <p className="mt-1 text-sm text-red-500">{errors.program}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-montserrat">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="px-2 sm:px-3 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    maxLength={10}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">You'll receive an OTP on this number for verification.</p>
                {errors.mobileNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-montserrat">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your requirements or any questions you have..."
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-colors resize-none font-montserrat"
                />
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 font-montserrat">
                By continuing, I have read and agree to Kachchapi's{' '}
                <a href="#" className="text-accent-600 hover:underline">Terms</a> and{' '}
                <a href="#" className="text-accent-600 hover:underline">Privacy Policy</a>.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-montserrat text-sm sm:text-base"
              >
                {isSubmitting ? 'Submitting...' : 'Request a Call'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemoModal;

