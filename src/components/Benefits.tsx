import React from 'react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: '✅',
      title: 'Verified & Refreshed Courses',
      description: 'All our courses are verified by industry experts and regularly updated',
      color: 'bg-blue-500',
    },
    {
      icon: '📚',
      title: 'Multiple Course & Categories',
      description: 'Access to hundreds of courses across various disciplines and skill levels',
      color: 'bg-secondary-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-dark-800">
              Our Large Benefit You Enroll{' '}
              <span className="text-secondary-500">From Our Courses</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              When you enroll in our courses, you gain access to a world of opportunities. 
              Our platform provides comprehensive learning experiences designed to accelerate 
              your career growth and personal development.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From expert-led instruction to hands-on projects, we ensure that every 
              student receives the support and resources needed to succeed in their 
              chosen field.
            </p>
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Courses
            </button>
          </div>

          {/* Right Content - Benefits Cards */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center text-xl text-white flex-shrink-0`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Images */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Students collaborating"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Learning environment"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
