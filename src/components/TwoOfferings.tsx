import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCheckCircle, faUserGraduate, faBuilding, faUserTie, faHandsHoldingCircle, faTools, faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const TwoOfferings: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Who We Help Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-dark-800 text-center mb-12">Who We Help</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Students */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Smiling student" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 items-center justify-center">
                  <FontAwesomeIcon icon={faUserGraduate} className="text-white text-6xl" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-dark-800 mb-3">Students</h4>
                <p className="text-gray-600">Build strong portfolios through guided projects.</p>
              </div>
            </div>

            {/* Institutions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="College campus with students walking" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-secondary-400 to-secondary-600 items-center justify-center">
                  <FontAwesomeIcon icon={faBuilding} className="text-white text-6xl" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-dark-800 mb-3">Institutions</h4>
                <p className="text-gray-600">Bring industry-aligned programs to your campus.</p>
              </div>
            </div>

            {/* Professionals */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Software engineer coding" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-accent-400 to-accent-600 items-center justify-center">
                  <FontAwesomeIcon icon={faUserTie} className="text-white text-6xl" />
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-dark-800 mb-3">Professionals</h4>
                <p className="text-gray-600">Upskill in modern AI, Cloud & Automation tools.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-dark-800 text-center mb-12">Our Approach</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FontAwesomeIcon icon={faHandsHoldingCircle} className="text-white text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-dark-800 mb-2">Learn by Doing</h4>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FontAwesomeIcon icon={faTools} className="text-white text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-dark-800 mb-2">Workplace-Ready Tools</h4>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FontAwesomeIcon icon={faUserTie} className="text-white text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-dark-800 mb-2">Mentorship from Industry Experts</h4>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FontAwesomeIcon icon={faLightbulb} className="text-white text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-dark-800 mb-2">Problem-Solving Mindset</h4>
            </div>
          </div>
        </div>

        
          
      </div>
    </section>
  );
};

export default TwoOfferings;
