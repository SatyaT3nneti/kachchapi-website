import React, { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface HeaderSinglePageProps {
  onOpenModal: () => void;
}

const HeaderSinglePage: React.FC<HeaderSinglePageProps> = ({ onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const navigation = [
    { name: 'Home', sectionId: 'home' },
    { name: 'Curriculum', sectionId: 'curriculum' },
    { name: 'Programs', sectionId: 'programs' },
    // { name: 'Benefits', sectionId: 'benefits' }, // Hidden for now
    // { name: 'Testimonials', sectionId: 'testimonials' }, // Hidden for now
    { name: 'FAQ', sectionId: 'faq' }
  ];

  return (
    <header 
      ref={headerRef} 
      className={`bg-black text-white sticky top-0 z-50 transition-all ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      {/* Top bar - Request a Call Banner */}
      <div className="bg-gradient-to-r from-dark-800 via-dark-700 to-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs">
            {/* Left side - Need Help text (hidden on mobile) */}
            <div className="hidden md:flex items-center">
              <span className="text-center">
                Need Help? Talk to our Academic Advisors.{' '}
                <button
                  onClick={onOpenModal}
                  className="underline decoration-amber-300 hover:decoration-amber-200 transition-colors inline-flex items-center gap-1 cursor-pointer bg-transparent border-none text-white"
                >
                  Request a Call
                  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </span>
            </div>
            {/* Right side - Social media links (visible on all screens) */}
            <div className="flex items-center space-x-4 w-full md:w-auto justify-center md:justify-end">
              <a 
                href="https://www.facebook.com/profile.php?id=61583865612006" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-amber-300 transition-colors"
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
                className="hover:text-amber-300 transition-colors"
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
                className="hover:text-amber-300 transition-colors"
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
        <div className="flex justify-between items-center py-3">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => scrollToSection('home')} 
              className="flex items-center bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img 
                src="/logo-white.svg" 
                alt="Kachchapi Logo" 
                className="h-8 md:h-10 w-auto mr-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-sm md:text-lg font-black text-white font-montserrat leading-tight" itemProp="name">
                  KACHCHAPI
                </h1>
                <p className="text-[0.3rem] md:text-[0.4rem] text-gray-300 font-sans leading-tight mt-0.5">
                  Learn by experience | Learn from experienced
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 font-sans">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-white hover:text-primary-400 px-2 py-2 text-xs font-medium transition-colors bg-transparent border-none cursor-pointer font-sans uppercase tracking-wide"
              >
                {item.name}
              </button>
            ))}
            
            <button
              onClick={onOpenModal}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors font-sans flex items-center gap-1 uppercase tracking-wide"
            >
              Request a Callback
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary-400"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-gray-800 font-sans">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-white hover:text-primary-400 block px-3 py-2 text-sm font-medium bg-transparent border-none cursor-pointer w-full text-left font-sans uppercase tracking-wide"
              >
                {item.name}
              </button>
            ))}
            
            <button
              onClick={() => {
                onOpenModal();
                setIsMenuOpen(false);
              }}
              className="bg-secondary-500 hover:bg-secondary-600 text-white block px-6 py-3 rounded-lg text-sm font-semibold w-full text-center font-sans mt-2 flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              Request a Callback
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSinglePage;

