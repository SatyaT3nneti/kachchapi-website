import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers,
  faLightbulb,
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';

const OurTeam: React.FC = () => {
  const founders = [
    {
      id: 'founder-1',
      name: 'Satya Tenneti',
      title: 'Founder & CEO',
      image: '/founder1.png',
      bio: 'A visionary technology leader with nearly 20 years of experience driving innovation and delivering transformative solutions. Satya excels at building high-performing teams and creating customer-centric cultures that drive growth and excellence in the ever-evolving tech landscape.',
      social: {
        linkedin: '#'
      }
    },
    {
      id: 'founder-2',
      name: 'Parimala Eagala',
      title: 'Co-Founder & Director - Partner Relations',
      image: '/founder2.jpeg',
      bio: 'A seasoned software professional with 10+ years of experience building innovative solutions across diverse industry verticals. Parimala is passionate about continuous learning and believes that curiosity drives innovation, helping individuals and organizations achieve their full potential through technology.',
      social: {
        linkedin: '#'
      }
    },
    {
      id: 'founder-3',
      name: 'Karthikeya Kannepalli',
      title: 'Co-Founder & Chief Learning Officer',
      image: '/founder3.jpeg',
      bio: 'A technology innovator with 10+ years of experience in the software industry, specializing in cutting-edge IoT-based solutions. Karthik is passionate about leveraging technology to ignite student curiosity and transform the learning experience, making education more engaging and interactive.',
      social: {
        linkedin: '#'
      }
    }
    
    
  ];

  const companyValues = [
    {
      icon: faUsers,
      title: 'Student-Centric',
      description: 'Every decision we make is guided by what\'s best for student learning and development.'
    },
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in educational technology.'
    },
    {
      icon: faRocket,
      title: 'Impact',
      description: 'We measure our success by the positive impact we have on students and educators.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20 overflow-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")'}}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-dark-800 bg-opacity-75"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-primary-300 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-500 rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-primary-400 rounded-full"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The passionate founders behind Kachchapi, dedicated to transforming education 
            through innovative technology and immersive learning experiences.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Our Founders</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three visionary leaders united by a common mission: to revolutionize education 
              and make learning an extraordinary experience for every student.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {founders.map((founder, index) => (
              <div
                key={founder.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
              >
                {/* Founder Image */}
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    style={{ objectPosition: 'center 30%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Founder Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-dark-800 mb-2">{founder.name}</h3>
                    <p className="text-primary-600 font-semibold text-lg">{founder.title}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {founder.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center mt-auto">
                    <a
                      href={founder.social.linkedin}
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Kachchapi, from product development 
              to customer relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={value.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-dark-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Education?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join us in revolutionizing how students learn. Whether you're a school administrator, 
            educator, or parent, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Contact Our Team
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Learn More About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
