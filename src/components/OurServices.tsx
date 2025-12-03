import React from 'react';

const OurServices: React.FC = () => {
  const services = [
    {
      icon: '🎓',
      title: 'Innovation Hubs for Colleges',
      description: 'Deploy seasoned project mentoring teams directly at college campuses to guide students through industry-relevant projects and real-world challenges.',
      features: [
        'Industry Expert Mentorship',
        'Real-World Project Experience',
        'Hands-On Learning',
        'Career Readiness Programs'
      ]
    },
    {
      icon: '💼',
      title: 'Industry Project Mentoring',
      description: 'Kachchapi provides comprehensive project-based training and mentoring to enable students to learn the skills necessary for jobs or to build their own business. Our hands-on approach covers cutting-edge projects in AI/ML, Web Development, and Mobile Development.',
      features: [
        'Project-Based Training Programs',
        'Job-Ready Skill Development',
        'Entrepreneurship & Business Building',
        'Real-World Project Experience'
      ]
    },
    {
      icon: '🚀',
      title: 'Entrepreneurship Programs',
      description: 'Inspire students to become entrepreneurs by providing hands-on experience with real business challenges and startup mentorship.',
      features: [
        'Startup Mentorship',
        'Business Plan Development',
        'Market Research Support',
        'Pitch Preparation'
      ]
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Assessment & Planning',
      bulletPoints: [
        'Assess institution\'s needs',
        'Create customized plan',
        'Innovation Hubs implementation'
      ]
    },
    {
      step: '02',
      title: 'Project Readiness Training',
      bulletPoints: [
        'Train students on necessary technologies',
        'Build foundational skills',
        'Prepare for chosen project'
      ]
    },
    {
      step: '03',
      title: 'Development',
      bulletPoints: [
        'Use Agile software development methodologies',
        'Follow professional development workflows',
        'Build required project'
      ]
    },
    {
      step: '04',
      title: 'Post Development Support',
      bulletPoints: [
        'Code review and improvement suggestions',
        'Further reading recommendations',
        'Communication Skills training',
        'Interview Psychology & Preparation',
        'Mock interviews'
      ]
    },
    {
      step: '05',
      title: 'Certification',
      bulletPoints: [
        'Course completion certification',
        'Validate skills and project experience',
        'Recognize successful completion'
      ]
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
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforming education through Innovation Hubs for colleges.
            We bring industry expertise directly to your campus.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">WHAT WE OFFER</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              Comprehensive Educational Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end solutions for educational institutions through Innovation Hubs
            </p>
            <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-dark-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">HOW IT WORKS</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              Our Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive 5-phase approach to project-based training and mentoring that prepares students for industry success
            </p>
            <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-4xl font-bold text-primary-500 mb-4 text-center">{step.step}</div>
                <h3 className="text-xl font-bold text-dark-800 mb-4 text-center">{step.title}</h3>
                <ul className="space-y-2 text-left">
                  {step.bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start text-gray-600 text-sm">
                      <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-lg max-w-4xl mx-auto">
              <p className="text-lg text-dark-800 font-medium">
                This program is followed by industry references where candidates become ideal fit for job opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">WHY CHOOSE US</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              Benefits for Your Institution
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Industry-Ready Graduates</h3>
              <p className="text-gray-600">
                Students graduate with practical skills and real-world project experience that employers value.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Enhanced Learning Outcomes</h3>
              <p className="text-gray-600">
                Hands-on projects significantly improve student engagement and understanding.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Expert Mentorship</h3>
              <p className="text-gray-600">
                Access to seasoned industry professionals who provide personalized guidance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Institution?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get in touch with us to learn more about our Innovation Hubs solutions
          </p>
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            CONTACT US TODAY
          </button>
        </div>
      </section>
    </div>
  );
};

export default OurServices;

