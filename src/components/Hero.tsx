import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faRocket, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat text-white py-20 overflow-hidden" 
      style={{
        backgroundImage: imageLoaded ? 'url("/resources/main-bg.png")' : 'linear-gradient(135deg, #4a206c 0%, #2f1444 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'crisp-edges',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Hidden image to preload and check if it exists */}
      <img 
        src="/resources/main-bg.png" 
        alt=""
        className="hidden"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-dark-800 bg-opacity-60"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
              Learn by Experience,{' '}
              <span className="text-white">Learn from Experienced</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
            Practical, industry-ready training in AI, Software Development & Project Execution.
            Empowering students and institutions with hands-on learning, real projects, and skilled mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                Explore Innovation Hubs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
