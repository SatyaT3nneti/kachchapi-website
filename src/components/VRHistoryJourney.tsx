import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMonument, 
  faBuilding, 
  faIndustry, 
  faShield, 
  faRocket, 
  faPalette,
  faCheckCircle,
  faPlay,
  faBook
} from '@fortawesome/free-solid-svg-icons';

const VRHistoryJourney: React.FC = () => {
  const vrExperiences = [
    {
      title: 'Ancient Egypt Exploration',
      description: 'Walk through the pyramids, explore pharaoh tombs, and witness the construction of the Great Sphinx.',
      duration: '2 hours',
      ageGroup: 'Ages 8-16',
      period: '3000-30 BCE',
      features: ['Pyramid Construction', 'Hieroglyph Decoding', 'Mummy Rituals', 'Daily Life Simulation'],
      icon: faMonument
    },
    {
      title: 'Medieval Castle Life',
      description: 'Experience life in a medieval castle, from knight training to royal banquets and siege warfare.',
      duration: '1.5 hours',
      ageGroup: 'Ages 10-18',
      period: '500-1500 CE',
      features: ['Knight Training', 'Castle Defense', 'Medieval Crafts', 'Royal Court Life'],
      icon: faBuilding
    },
    {
      title: 'Industrial Revolution',
      description: 'Witness the transformation from rural to urban life during the Industrial Revolution.',
      duration: '2 hours',
      ageGroup: 'Ages 12-18',
      period: '1760-1840 CE',
      features: ['Factory Life', 'Steam Engine', 'Urban Growth', 'Social Changes'],
      icon: faIndustry
    },
    {
      title: 'World War II Experience',
      description: 'Experience key moments of WWII from different perspectives - soldier, civilian, and leader.',
      duration: '2.5 hours',
      ageGroup: 'Ages 14-18',
      period: '1939-1945 CE',
      features: ['Battle Simulation', 'Home Front Life', 'Diplomatic Meetings', 'Liberation Stories'],
      icon: faShield
    },
    {
      title: 'Space Race Era',
      description: 'Relive the space race, from Sputnik to Apollo 11, experiencing the excitement of space exploration.',
      duration: '2 hours',
      ageGroup: 'Ages 10-18',
      period: '1957-1975 CE',
      features: ['Rocket Launch', 'Mission Control', 'Lunar Landing', 'Space Technology'],
      icon: faRocket
    },
    {
      title: 'Renaissance Art & Science',
      description: 'Meet Leonardo da Vinci, explore his workshop, and witness the birth of modern science and art.',
      duration: '1.5 hours',
      ageGroup: 'Ages 10-16',
      period: '1400-1600 CE',
      features: ['Art Creation', 'Scientific Discovery', 'Renaissance Culture', 'Innovation Workshop'],
      icon: faPalette
    }
  ];

  const benefits = [
    'Walk through historical events as they happened',
    'Interact with historical figures and artifacts',
    'Understand cause and effect relationships in history',
    'Develop empathy through different historical perspectives',
    'Make history tangible and memorable',
    'Foster critical thinking about historical events'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20 overflow-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'}}>
        <div className="absolute inset-0 bg-dark-800 bg-opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Virtual History Journey</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Step into the past and experience history like never before. Our immersive VR experiences 
            bring historical events, cultures, and figures to life, making history engaging and unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Book a Demo
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-dark-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              View All Experiences
            </button>
          </div>
        </div>
      </section>

      {/* VR Experiences */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Historical VR Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Travel through time and explore different historical periods, cultures, and events 
              through immersive virtual reality experiences that make history come alive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vrExperiences.map((experience, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={experience.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-800 mb-3">{experience.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{experience.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold text-dark-800">{experience.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Age Group:</span>
                    <span className="font-semibold text-dark-800">{experience.ageGroup}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Period:</span>
                    <span className="font-semibold text-dark-800">{experience.period}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {experience.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Why VR History Learning Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Virtual Reality makes history tangible and engaging, helping students develop 
              a deeper understanding and appreciation for historical events and cultures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faBook} className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-dark-800 mb-4">Immersive Learning</h3>
                <p className="text-gray-600 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Bring History to Life</h2>
          <p className="text-xl text-gray-300 mb-8">
            Transform history education with immersive VR experiences that inspire and engage students
          </p>
          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            SCHEDULE DEMO
          </button>
        </div>
      </section>
    </div>
  );
};

export default VRHistoryJourney;
