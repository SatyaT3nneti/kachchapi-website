import React from 'react';

const VRLearning: React.FC = () => {
  const vrExperiences = [
    {
      icon: '🔬',
      title: 'Immersive Science Exploration',
      description: 'Journey through the human body, explore molecular structures, and witness chemical reactions in a safe, interactive environment.',
      duration: '2 hours',
      ageGroup: 'Ages 8-16',
      subjects: ['Biology', 'Chemistry', 'Physics']
    },
    {
      icon: '🏛️',
      title: 'Virtual History Journey',
      description: 'Walk through ancient civilizations, witness historical events, and interact with historical figures in their original contexts.',
      duration: '1.5 hours',
      ageGroup: 'Ages 10-18',
      subjects: ['History', 'Social Studies', 'Geography']
    },
    {
      icon: '🌍',
      title: 'Planetary Exploration',
      description: 'Travel through space, land on different planets, and understand astronomical phenomena through immersive experiences.',
      duration: '2.5 hours',
      ageGroup: 'Ages 8-16',
      subjects: ['Astronomy', 'Physics', 'Earth Science']
    },
    {
      icon: '🏗️',
      title: 'Engineering Marvels',
      description: 'Explore how bridges are built, understand architectural principles, and witness engineering feats from around the world.',
      duration: '2 hours',
      ageGroup: 'Ages 10-18',
      subjects: ['Engineering', 'Mathematics', 'Architecture']
    },
    {
      icon: '🌿',
      title: 'Ecosystem Adventures',
      description: 'Dive into different ecosystems, understand food chains, and witness the impact of environmental changes firsthand.',
      duration: '1.5 hours',
      ageGroup: 'Ages 8-16',
      subjects: ['Environmental Science', 'Biology', 'Ecology']
    },
    {
      icon: '🎨',
      title: 'Art & Culture Immersion',
      description: 'Visit world-famous museums, create art in virtual studios, and experience different cultures through immersive storytelling.',
      duration: '2 hours',
      ageGroup: 'Ages 6-18',
      subjects: ['Art', 'Culture', 'History']
    }
  ];

  const benefits = [
    {
      icon: '🧠',
      title: 'Enhanced Learning Retention',
      description: 'VR experiences create lasting memories and improve knowledge retention by engaging multiple senses simultaneously.'
    },
    {
      icon: '🎯',
      title: 'Interactive Engagement',
      description: 'Students become active participants in their learning journey, exploring concepts at their own pace and interest level.'
    },
    {
      icon: '🌍',
      title: 'Impossible Experiences',
      description: 'Access to experiences that would be impossible in traditional classrooms - from space travel to microscopic exploration.'
    },
    {
      icon: '🤝',
      title: 'Collaborative Learning',
      description: 'Students can explore virtual worlds together, fostering teamwork and peer-to-peer learning in immersive environments.'
    },
    {
      icon: '📊',
      title: 'Real-time Assessment',
      description: 'Teachers can track student progress and engagement in real-time, providing immediate feedback and personalized guidance.'
    },
    {
      icon: '♿',
      title: 'Inclusive Education',
      description: 'VR makes learning accessible to students with different learning styles and physical abilities, creating equal opportunities for all.'
    }
  ];

  const learningOutcomes = [
    'Increased student engagement and motivation',
    'Improved understanding of complex concepts',
    'Enhanced critical thinking and problem-solving skills',
    'Better retention of information through experiential learning',
    'Development of spatial awareness and 3D thinking',
    'Fostering of curiosity and love for learning'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20 overflow-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1592478411213-6153e4c4c8f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'}}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-dark-800 bg-opacity-75"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-primary-300 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-500 rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-primary-400 rounded-full"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Immersive VR Academy for Schools</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Ignite curiosity and improve learning through immersive VR experiences designed specifically for school children. 
              Our Immersive VR Academy transforms abstract concepts into tangible, interactive adventures that make education 
              engaging, memorable, and fun for students of all ages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                Book a Demo
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-dark-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                Explore Experiences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VR Theatre Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">The Immersive VR Academy Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art VR theatre provides an immersive learning environment where students can explore, 
              discover, and learn in ways never before possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🥽</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Immersive Technology</h3>
              <p className="text-gray-600 leading-relaxed">
                High-quality VR headsets and controllers provide crystal-clear visuals and intuitive interactions, 
                creating truly immersive learning experiences that captivate young minds.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Group Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Multiple students can experience the same virtual world simultaneously, enabling collaborative learning 
                and shared discovery experiences that enhance peer interaction and discussion.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Curriculum Aligned</h3>
              <p className="text-gray-600 leading-relaxed">
                All VR experiences are carefully designed to align with school curricula, ensuring that virtual adventures 
                directly support and enhance classroom learning objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VR Experiences */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Immersive Learning Experiences</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of VR experiences designed to ignite curiosity and deepen understanding 
              across various subjects and age groups.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vrExperiences.map((experience, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{experience.icon}</div>
                <h3 className="text-xl font-bold text-dark-800 mb-4">{experience.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{experience.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Duration:</span>
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Age Group:</span>
                    <span>{experience.ageGroup}</span>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <span className="font-medium mr-2">Subjects:</span>
                    <div className="flex flex-wrap gap-1">
                      {experience.subjects.map((subject, subIndex) => (
                        <span key={subIndex} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Why VR Learning Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Virtual Reality transforms education by creating engaging, memorable experiences that enhance 
              learning outcomes and foster a lifelong love for knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-dark-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark-800 mb-6">Measurable Learning Outcomes</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our Immersive VR Academy delivers tangible results that teachers and parents can see and measure. 
                Students show significant improvement in engagement, comprehension, and retention.
              </p>
              <ul className="space-y-4">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-dark-800 mb-6">Ready to Experience VR Learning?</h3>
              <p className="text-gray-600 mb-6">
                Book a demonstration at your school and see how VR can transform your students' learning experience.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Schedule School Demo
                </button>
                <button className="w-full border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Transform Learning with VR</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the educational revolution and give your students the gift of immersive, engaging learning experiences
          </p>
          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            GET STARTED TODAY
          </button>
        </div>
      </section>
    </div>
  );
};

export default VRLearning;
