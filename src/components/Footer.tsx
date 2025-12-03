import React from 'react';

const Footer: React.FC = () => {
  const quickLinks = [
    'Home', 'About Us', 'Programs', 'Contact'
  ];

  const otherLinks = [
    'Project-Based Training',
    'Interview Preparation',
    'Career Guidance',
    'Leadership Coaching',
    'Academic Project Mentorship',
    'Corporate Training'
  ];

  return (
    <footer className="bg-black text-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Left */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/logo-white.svg" 
                alt="Kachchapi Logo" 
                className="h-8 w-auto mr-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-black text-white font-montserrat uppercase">
                  Kachchapi
                </h3>
                <p className="text-[0.3rem] md:text-[0.4rem] text-gray-300 font-sans leading-tight mt-0.5">
                  Learn by experience | Learn from experienced
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed font-montserrat">
              Kachchapi is an innovative learning platform that provides hands-on training in AI, software development, and project execution through Innovation Hubs and VR Academy experiences.
            </p>
            <p className="text-gray-400 text-[10px] pt-4 font-montserrat">
              © 2025 Kachchapi. All rights reserved.
            </p>
          </div>

          {/* Quick Links - Middle Left */}
          <div className="space-y-4">
            <h4 className="text-gray-400 text-xs font-semibold border-b border-primary-500 pb-2 inline-block font-montserrat">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-white hover:text-primary-500 transition-colors text-xs flex items-center font-montserrat">
                    <span className="mr-2">»</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links - Middle Right */}
          <div className="space-y-4">
            <h4 className="text-gray-400 text-xs font-semibold border-b border-primary-500 pb-2 inline-block font-montserrat">
              Programs & Services
            </h4>
            <ul className="space-y-2">
              {otherLinks.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-white hover:text-primary-500 transition-colors text-xs flex items-center font-montserrat">
                    <span className="mr-2">»</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us - Right */}
          <div className="space-y-4">
            <h4 className="text-gray-400 text-xs font-semibold border-b border-primary-500 pb-2 inline-block font-montserrat">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-white font-montserrat">
              <p>
                Kachchapi Technologies, Ahub,<br />
                Andhra University North Gate,<br />
                Andhra University, Maddilapalem,<br />
                Visakhapatnam, AP, INDIA 530013
              </p>
              <p>
                <span className="text-gray-400">Support:</span> +91 93912 56768
              </p>
              <p>
                <span className="text-gray-400">Email:</span> support@kachchapi.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-500 text-[10px] font-montserrat">
              © 2025 Kachchapi. All rights reserved.
            </p>
            <div className="flex space-x-4 text-[10px] text-gray-500 font-montserrat">
              <a href="#" className="hover:text-primary-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
