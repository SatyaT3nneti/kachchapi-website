import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Miley Houdson',
      role: 'CEO, Houston',
      image: '/api/placeholder/80/80',
      text: 'Duis aute irure dolor in repre hend in voluptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      image: '/api/placeholder/80/80',
      text: 'Duis aute irure dolor in repre hend in voluptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: '/api/placeholder/80/80',
      text: 'Duis aute irure dolor in repre hend in voluptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      image: '/api/placeholder/80/80',
      text: 'Duis aute irure dolor in repre hend in voluptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      rating: 5,
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      image: '/api/placeholder/80/80',
      text: 'Duis aute irure dolor in repre hend in voluptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      rating: 5,
    },
    {
      name: 'Lisa Thompson',
      role: 'Data Scientist',
      image: '/api/placeholder/80/80',
      text: 'Duis aute irure dolor in repre hend in voluptate velites mollit anim id. Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      rating: 5,
    }
  ];

  const trustedBy = [
    'columbus', 'Arlington', 'riverside California', 'CLEVELAND', 'Rochester New-York'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-dark-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-primary-300 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-500 rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-primary-400 rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">Testimonials</h1>
            </div>
            <div className="text-lg text-gray-300">
              Home → Testimonials
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">CLIENT REVIEWS</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              Read Clients' Story Of Education
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {/* Testimonial Text */}
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mb-3"
                  />
                  <h4 className="font-bold text-dark-800 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{testimonial.role}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Satisfaction Summary */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-primary-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-lg text-gray-700">
              99.9% Customer Satisfaction based on 550+ reviews of 2,250 Completed courses, and 2,820 Happy Customers trust us.
            </p>
          </div>
        </div>
      </section>

      {/* Why Students Choose Us Section */}
      <section className="py-20 bg-dark-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-800 to-dark-700"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  Why Students Choose Us For Gain Their Knowledge
                </h2>
                <div className="w-24 h-1 bg-primary-500"></div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              {/* Key Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17a1 1 0 00-.356.257l-4 1.714a1 1 0 01-.788-1.838L9.606 2.08z"/>
                    </svg>
                  </div>
                  <span className="text-lg">Industry Expert Instructor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">Up-to-Date Course Content</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <span className="text-lg">Biggest Student Community</span>
                </div>
              </div>

              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                JOIN US NOW
              </button>
            </div>

            {/* Video Placeholder */}
            <div className="relative">
              <div className="bg-gray-300 rounded-lg overflow-hidden h-96 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="w-20 h-20 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Video Placeholder</p>
                  <p className="text-sm">Students collaborating around laptop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">TRUSTED BY</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              550+ Leading Universities And Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Company Logos */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {trustedBy.map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-400 hover:text-primary-500 transition-colors cursor-pointer">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
