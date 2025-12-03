import React from 'react';

const AboutUs: React.FC = () => {
  const values = [
    {
      icon: '🏗️',
      title: 'Industry-Ready Skills',
      description: 'We focus on developing practical, industry-relevant skills through real-world project mentoring.'
    },
    {
      icon: '🎓',
      title: 'Innovation Hubs',
      description: 'We deploy seasoned professionals directly at colleges to mentor students through cutting-edge projects.'
    },
    {
      icon: '🥽',
      title: 'Immersive Learning',
      description: 'We create engaging VR learning experiences that ignite curiosity and improve understanding in school kids.'
    },
    {
      icon: '🚀',
      title: 'Entrepreneurship',
      description: 'We inspire students to become entrepreneurs by providing hands-on experience with real business challenges.'
    }
  ];

  const stats = [
    { number: '25+', label: 'Innovation Hubs' },
    { number: '100+', label: 'Industry Projects' },
    { number: '50+', label: 'Mentoring Teams' },
    { number: '95%', label: 'Placement Success' }
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
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn by Experience, Learn from Experienced. Kachchapi believes in hands-on learning 
              with industry experts through Innovation Hubs for colleges and Immersive VR Academy for schools.
            </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div>
              <div className="mb-8">
                <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">OUR MISSION</span>
                <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-6">
                  Bridging Academia and Industry
                </h2>
                <div className="w-24 h-1 bg-primary-500"></div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Kachchapi, we are focused on building world-class learning platforms that transform 
                education. Our mission is to bridge the gap between academic theory and industry practice 
                through Innovation Hubs for colleges and immersive VR learning experiences for school kids.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We deploy seasoned project mentoring teams directly at college premises to help students 
                become industry-ready through real-world projects, while igniting curiosity in school kids 
                through our VR learning theatre.
              </p>
            </div>

            {/* Vision */}
            <div>
              <div className="mb-8">
                <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">OUR VISION</span>
                <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-6">
                  Industry-Ready Professionals & Curious Minds
                </h2>
                <div className="w-24 h-1 bg-primary-500"></div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We envision a future where college students graduate as industry-ready professionals through 
                hands-on project experience, and school kids develop deep curiosity and understanding through 
                immersive VR learning experiences that make education engaging and memorable.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our Innovation Hubs will transform colleges into centers of practical learning, while our 
                VR learning theatre will revolutionize how school children experience and absorb knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">OUR VALUES</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do and shape the way we serve our community
            </p>
            <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-dark-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              See how we're making a difference in the world of online education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">OUR STORY</span>
                <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-6">
                  From Vision to Reality
                </h2>
                <div className="w-24 h-1 bg-primary-500"></div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Kachchapi was born from a clear vision: to bridge the gap between academic learning and 
                industry needs. Founded by a team of industry veterans, educators, and technologists, 
                we recognized the critical challenge of preparing students for real-world professional demands.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our journey began with Innovation Hubs - deploying seasoned project mentoring teams directly 
                at college campuses to guide students through industry-relevant projects. We've expanded to 
                include VR learning experiences for school children, creating immersive educational journeys 
                that ignite curiosity and improve learning outcomes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to be transforming education through practical, hands-on learning experiences 
                that prepare students for successful careers and inspire the next generation of innovators.
              </p>
            </div>

            {/* Story Image */}
            <div className="relative">
              <div className="bg-gray-300 rounded-lg overflow-hidden h-96 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <p className="text-lg font-medium">Our Journey</p>
                  <p className="text-sm">Building the future of education, one course at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Education?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join us in revolutionizing learning through Innovation Hubs and immersive VR experiences
          </p>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            EXPLORE INNOVATION HUBS
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
