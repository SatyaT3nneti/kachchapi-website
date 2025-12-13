import React, { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollegesMenuOpen, setIsCollegesMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close all menus
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsCollegesMenuOpen(false);
  };

  // Handle page change and close menus
  const handlePageChange = (page: string) => {
    onPageChange(page);
    closeAllMenus();
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const collegesMenu = [
    { name: 'Innovation Hubs Overview', href: 'innovation-hubs', action: () => handlePageChange('innovation-hubs') },
    { name: 'AI/ML Projects', href: 'ai-ml-projects', action: () => handlePageChange('ai-ml-projects') },
    { name: 'Web & Mobile Development', href: 'web-mobile-projects', action: () => handlePageChange('web-mobile-projects') },
  ];

  const navigation = [
    { name: 'Home', href: 'home', action: () => handlePageChange('home') },
    { name: 'About Us', href: 'about-us', action: () => handlePageChange('about-us') },
    { name: 'Our Services', href: 'our-services', action: () => handlePageChange('our-services') },
  ];

  return (
    <header ref={headerRef} className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-dark-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            {/* Left side - Contact info (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Mon - Fri: 9:00 AM - 6:00 PM
              </span>
              <a href="tel:+919391256768" className="flex items-center hover:text-primary-300 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +91 93912 56768
              </a>
              <a href="mailto:support@kachchapi.com" className="flex items-center hover:text-primary-300 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                support@kachchapi.com
              </a>
            </div>
            {/* Right side - Social media links (visible on all screens) */}
            <div className="flex items-center space-x-4 w-full md:w-auto justify-center md:justify-end">
              <a 
                href="https://www.facebook.com/profile.php?id=61583865612006" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary-300 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/kachchapi-technologies/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary-300 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/kachchapi1710/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary-300 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => onPageChange('home')} 
              className="flex items-center bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo.svg" 
                alt="Kachchapi Logo" 
                className="h-8 md:h-12 w-auto mr-2 md:mr-3 logo-primary"
                onError={(e) => {
                  // Fallback to text if logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.add('show');
                }}
              />
              <div className="flex flex-col items-start">
                <h1 className="text-xl md:text-3xl font-black text-primary-500 font-montserrat">
                  Kachchapi<sup className="text-xs">®</sup>
                </h1>
                <p className="text-[0.5rem] text-primary-500 font-sans mt-0.5 font-medium">
                  Learn by experience | Learn from experienced
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-sans">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className="text-dark-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer font-sans"
              >
                {item.name}
              </button>
            ))}
            
            {/* For Colleges Dropdown - Hidden for now */}
            {/* <div className="relative">
              <button
                onClick={() => {
                  setIsCollegesMenuOpen(!isCollegesMenuOpen);
                }}
                className="text-dark-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer flex items-center font-sans"
              >
                For Colleges
                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                  isCollegesMenuOpen ? 'rotate-180' : 'rotate-0'
                }`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ease-in-out ${
                isCollegesMenuOpen 
                  ? 'opacity-100 visible transform translate-y-0' 
                  : 'opacity-0 invisible transform -translate-y-2'
              }`}>
                {collegesMenu.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.action();
                      setIsCollegesMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-sans"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Contact Us Menu */}
            <button
              onClick={() => handlePageChange('contact')}
              className="text-dark-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors font-sans"
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsCollegesMenuOpen(false);
              }}
              className="text-dark-600 hover:text-primary-600"
            >
              <div className="relative">
                <XMarkIcon className={`h-6 w-6 absolute transition-all duration-200 ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                }`} />
                <Bars3Icon className={`h-6 w-6 transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t font-sans">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="text-dark-600 hover:text-primary-600 block px-3 py-2 text-base font-medium bg-transparent border-none cursor-pointer w-full text-left font-sans"
                >
                  {item.name}
                </button>
              ))}
              
              {/* For Colleges Mobile Menu - Hidden for now */}
              {/* <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide font-sans">For Colleges</div>
                {collegesMenu.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.action();
                      setIsMenuOpen(false);
                    }}
                    className="text-dark-600 hover:text-primary-600 block px-6 py-2 text-sm font-medium bg-transparent border-none cursor-pointer w-full text-left font-sans"
                  >
                    {item.name}
                  </button>
                ))}
              </div> */}

              {/* Contact Us Mobile Menu */}
              <div className="border-t border-gray-200 pt-2">
                <button
                  onClick={() => {
                    handlePageChange('contact');
                    setIsMenuOpen(false);
                  }}
                  className="text-dark-600 hover:text-primary-600 block px-6 py-2 text-sm font-medium bg-transparent border-none cursor-pointer w-full text-left font-sans"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
    </header>
  );
};

export default Header;
