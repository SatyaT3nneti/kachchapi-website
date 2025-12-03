import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserMd, 
  faAtom, 
  faRocket, 
  faLeaf, 
  faFlask, 
  faMountain,
  faCheckCircle,
  faPlay,
  faEye
} from '@fortawesome/free-solid-svg-icons';

const VRScienceExploration: React.FC = () => {
  const vrExperiences = [
    {
      title: 'Human Body Journey',
      description: 'Explore the human body from the inside out, walking through organs, blood vessels, and cellular structures.',
      duration: '2 hours',
      ageGroup: 'Ages 10-16',
      subjects: ['Biology', 'Anatomy', 'Health Science'],
      features: ['3D Organ Models', 'Interactive Dissection', 'Disease Simulation', 'Health Education'],
      icon: faUserMd
    },
    {
      title: 'Molecular World Adventure',
      description: 'Shrink down to molecular size and witness chemical reactions, atomic structures, and molecular bonding.',
      duration: '1.5 hours',
      ageGroup: 'Ages 12-18',
      subjects: ['Chemistry', 'Physics', 'Molecular Biology'],
      features: ['Atomic Visualization', 'Chemical Reactions', 'Bond Formation', 'Lab Safety'],
      icon: faAtom
    },
    {
      title: 'Space Exploration Mission',
      description: 'Travel through our solar system, land on planets, and experience the vastness of space.',
      duration: '2.5 hours',
      ageGroup: 'Ages 8-16',
      subjects: ['Astronomy', 'Physics', 'Earth Science'],
      features: ['Planet Landing', 'Gravity Simulation', 'Space Physics', 'Cosmic Phenomena'],
      icon: faRocket
    },
    {
      title: 'Ecosystem Discovery',
      description: 'Dive into different ecosystems, understand food chains, and witness environmental changes.',
      duration: '2 hours',
      ageGroup: 'Ages 8-16',
      subjects: ['Environmental Science', 'Biology', 'Ecology'],
      features: ['Habitat Exploration', 'Wildlife Interaction', 'Climate Impact', 'Conservation'],
      icon: faLeaf
    },
    {
      title: 'Physics Laboratory',
      description: 'Conduct virtual physics experiments with gravity, electricity, magnetism, and motion.',
      duration: '1.5 hours',
      ageGroup: 'Ages 10-18',
      subjects: ['Physics', 'Mathematics', 'Engineering'],
      features: ['Gravity Experiments', 'Electric Circuits', 'Magnetic Fields', 'Motion Physics'],
      icon: faFlask
    },
    {
      title: 'Geological Time Travel',
      description: 'Journey through Earth\'s geological history, witness continental drift and evolution.',
      duration: '2 hours',
      ageGroup: 'Ages 10-16',
      subjects: ['Geology', 'Earth Science', 'History'],
      features: ['Time Travel', 'Fossil Discovery', 'Geological Processes', 'Evolution'],
      icon: faMountain
    }
  ];

  const benefits = [
    'Enhanced understanding through immersive 3D visualization',
    'Safe environment for dangerous or impossible experiments',
    'Increased student engagement and motivation',
    'Better retention of complex scientific concepts',
    'Accessible learning for different learning styles',
    'Collaborative learning through shared virtual experiences'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20 overflow-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'}}>
        <div className="absolute inset-0 bg-dark-800 bg-opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Immersive Science Exploration</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Journey through the wonders of science with our immersive VR experiences that make 
            complex scientific concepts tangible, engaging, and unforgettable for students.
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
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Science VR Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of science-focused VR experiences designed 
              to ignite curiosity and deepen understanding across multiple scientific disciplines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vrExperiences.map((experience, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
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
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Subjects:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.subjects.map((subject, subIndex) => (
                      <span key={subIndex} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                  
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {experience.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
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
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Why VR Science Learning Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Virtual Reality transforms abstract scientific concepts into tangible, interactive 
              experiences that enhance learning outcomes and foster a deeper understanding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faEye} className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-dark-800 mb-4">Enhanced Learning</h3>
                <p className="text-gray-600 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Transform Science Education</h2>
          <p className="text-xl text-gray-300 mb-8">
            Bring science to life with immersive VR experiences that inspire the next generation of scientists
          </p>
          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            SCHEDULE DEMO
          </button>
        </div>
      </section>
    </div>
  );
};

export default VRScienceExploration;
