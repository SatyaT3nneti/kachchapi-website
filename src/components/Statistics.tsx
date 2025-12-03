import React from 'react';

const Statistics: React.FC = () => {
  const stats = [
    { number: '45K+', label: 'Students', icon: '👥' },
    { number: '200+', label: 'Courses', icon: '📚' },
    { number: '130+', label: 'Instructors', icon: '👨‍🏫' },
    { number: '50+', label: 'Awards', icon: '��' },
  ];

  return (
    <section className="py-20 bg-dark-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight">
              Take The Next Step Toward Your Personal And Professional Goals
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join thousands of learners who have transformed their careers and lives 
              through our comprehensive learning platform. Start your journey today 
              and unlock your potential.
            </p>
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
          </div>

          {/* Right Content - Statistics Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white text-dark-800 p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-dark-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
