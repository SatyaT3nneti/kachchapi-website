import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faUsers, 
  faHeartbeat, 
  faGraduationCap, 
  faUtensils, 
  faMicrochip,
  faCheckCircle,
  faRocket,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

const WebMobileProjects: React.FC = () => {
  const projectTypes = [
    {
      title: 'E-Commerce Platform',
      description: 'Build a full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'AWS'],
      duration: '4 months',
      difficulty: 'Advanced',
      icon: faShoppingCart
    },
    {
      title: 'Social Media Application',
      description: 'Create a social platform with real-time messaging, content sharing, and user engagement features.',
      technologies: ['React Native', 'Firebase', 'Socket.io', 'Redux', 'Expo'],
      duration: '5 months',
      difficulty: 'Advanced',
      icon: faUsers
    },
    {
      title: 'Healthcare Management System',
      description: 'Develop a comprehensive system for patient records, appointments, and medical data management.',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT'],
      duration: '6 months',
      difficulty: 'Advanced',
      icon: faHeartbeat
    },
    {
      title: 'Learning Management System',
      description: 'Build an educational platform with course management, video streaming, and progress tracking.',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'FFmpeg', 'Redis'],
      duration: '4 months',
      difficulty: 'Intermediate',
      icon: faGraduationCap
    },
    {
      title: 'Food Delivery App',
      description: 'Create a mobile app for food ordering with real-time tracking, payment processing, and restaurant management.',
      technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Razorpay', 'Cloud Functions'],
      duration: '5 months',
      difficulty: 'Advanced',
      icon: faUtensils
    },
    {
      title: 'IoT Dashboard',
      description: 'Build a web application for monitoring and controlling IoT devices with real-time data visualization.',
      technologies: ['React', 'Express.js', 'MQTT', 'Chart.js', 'WebSocket'],
      duration: '4 months',
      difficulty: 'Intermediate',
      icon: faMicrochip
    }
  ];

  const learningOutcomes = [
    'Master modern web and mobile development frameworks and tools',
    'Build responsive, scalable applications with industry best practices',
    'Implement secure authentication and authorization systems',
    'Integrate third-party APIs and payment gateways',
    'Deploy applications to cloud platforms with CI/CD pipelines',
    'Develop cross-platform mobile applications for iOS and Android'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20 overflow-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")'}}>
        <div className="absolute inset-0 bg-dark-800 bg-opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Web & Mobile Development Projects</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Master modern web and mobile development through hands-on projects that build 
            real-world applications using cutting-edge technologies and industry best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-dark-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Web & Mobile Project Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build comprehensive web and mobile applications that solve real business problems 
              and showcase your development expertise across multiple platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectTypes.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={project.icon} className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold text-dark-800">{project.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className={`font-semibold px-2 py-1 rounded-full text-xs ${
                      project.difficulty === 'Advanced' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>

          {/* Reach Out Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Want to Explore More Projects?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We have an extensive catalog of web and mobile development projects across various industries. 
                Contact us to discuss your specific interests and get a customized project roadmap.
              </p>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Reach Out to Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-dark-800 mb-6">What You'll Learn</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our web and mobile development projects provide comprehensive experience with 
                modern frameworks, tools, and methodologies used in professional development environments.
              </p>
              <ul className="space-y-4">
                {learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-dark-800 mb-6">Ready to Build Amazing Apps?</h3>
              <p className="text-gray-600 mb-6">
                Join our Innovation Hub and work on real-world web and mobile projects with industry mentors.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  Apply for Innovation Hub
                </button>
                <button className="w-full border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Download Project Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Build the Future of Web & Mobile</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our Innovation Hub and create applications that users love and businesses rely on
          </p>
          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            GET STARTED TODAY
          </button>
        </div>
      </section>
    </div>
  );
};

export default WebMobileProjects;
