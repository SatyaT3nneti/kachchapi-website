import React, { useEffect } from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    duration: string;
    level: string;
    details?: string[];
    benefits?: string[];
  } | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
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

  if (!isOpen || !service) return null;

  // Default details and benefits if not provided
  const defaultDetails = service.details || [
    'Comprehensive curriculum designed by industry experts',
    'Hands-on projects and real-world applications',
    'Personalized mentorship and guidance',
    'Industry-relevant skills and knowledge'
  ];

  const defaultBenefits = service.benefits || [
    'Expert guidance from experienced professionals',
    'Practical, project-based learning approach',
    'Career support and placement assistance',
    'Flexible learning schedules'
  ];

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
              <h2 className="text-3xl font-black mb-4 font-montserrat">{service.title}</h2>
              <p className="text-lg mb-6 font-montserrat opacity-90">Program Overview</p>
              <ul className="space-y-4 font-montserrat">
                {defaultBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Content */}
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

            <div className="space-y-6 font-montserrat">
              {/* Service Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 font-montserrat">
                  {service.title}
                </h3>
                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {service.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    {service.level}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 font-montserrat">About This Program</h4>
                <p className="text-gray-700 leading-relaxed font-montserrat">
                  {service.description}
                </p>
              </div>

              {/* Program Details */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 font-montserrat">What You'll Learn</h4>
                <ul className="space-y-2">
                  {defaultDetails.map((detail, index) => (
                    <li key={index} className="flex items-start text-gray-700 font-montserrat">
                      <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4 font-montserrat">
                  Ready to get started? Book a free consultation with our advisors to learn more about this program.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    // Scroll to the form or trigger the callback modal
                    const formSection = document.getElementById('home');
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors font-montserrat text-sm sm:text-base"
                >
                  Book a Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;

