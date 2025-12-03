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
    { name: 'Benefits', sectionId: 'benefits' },
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
      <div className="bg-gradient-to-r from-dark-800 via-dark-700 to-purple-600 text-white py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center text-xs">
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
                <h1 className="text-sm md:text-lg font-black text-white font-montserrat leading-tight">
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

