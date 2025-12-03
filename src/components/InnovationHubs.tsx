import React from 'react';

const InnovationHubs: React.FC = () => {
  const projectCategories = [
    {
      icon: '🤖',
      title: 'AI/ML Innovation',
      description: 'Intelligent solutions like AI-powered assistants, advanced data prediction, and sophisticated pattern recognition.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI APIs']
    },
    {
      icon: '🌐',
      title: 'Dynamic Web & Mobile Development',
      description: 'Robust platforms for online commerce, innovative health tech, and engaging educational experiences.',
      technologies: ['React', 'Angular', 'React Native', 'Flutter']
    },
    {
      icon: '🔗',
      title: 'IoT & Smart Embedded Systems',
      description: 'Developing interconnected devices, intelligent sensors, and sustainable energy optimization systems.',
      technologies: ['Arduino', 'Raspberry Pi', 'AWS IoT', 'MQTT']
    },
    {
      icon: '☁️',
      title: 'Scalable Cloud Solutions',
      description: 'Crafting adaptable architectures, distributed microservices, and powerful Software-as-a-Service platforms.',
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes']
    },
    {
      icon: '🔒',
      title: 'Advanced Cybersecurity & Blockchain',
      description: 'Fortifying digital landscapes with robust security protocols and pioneering decentralized ledger technologies.',
      technologies: ['Ethereum', 'HyperLedger', 'Security Protocols', 'Smart Contracts']
    },
    {
      icon: '📊',
      title: 'Data Engineering',
      description: 'Designing robust data pipelines, ETL processes, data warehousing, and big data analytics platforms.',
      technologies: ['Apache Spark', 'Kafka', 'Elasticsearch', 'MongoDB']
    }
  ];

  const benefits = [
    {
      icon: '🎯',
      title: 'Immersive Real-World Projects',
      description: 'Dive into authentic, client-driven projects designed to simulate actual industry scenarios, fostering critical thinking and problem-solving skills.'
    },
    {
      icon: '🛠️',
      title: 'Mastering Modern Toolsets',
      description: 'Gain proficiency in cutting-edge development methodologies and tools, including Agile workflows, robust DevOps practices, and continuous integration/delivery pipelines.'
    },
    {
      icon: '👨‍💼',
      title: 'Guidance from Industry Veterans',
      description: 'Receive personalized coaching and insights from seasoned developers and architects who bring years of practical experience and mentorship directly to you.'
    },
    {
      icon: '📁',
      title: 'Building a Standout Portfolio',
      description: 'Craft a compelling portfolio filled with tangible, high-impact projects that clearly showcase your capabilities and distinguish you to prospective employers.'
    },
    {
      icon: '🚀',
      title: 'Seamless Career Launchpad',
      description: 'Step confidently into internships, placements, and entry-level roles, ready to contribute meaningfully from day one with proven professional readiness.'
    },
    {
      icon: '💼',
      title: 'Interview Preparation Support',
      description: 'Receive guidance and preparation for technical interviews, mock interviews, and career placement support to help you succeed in job interviews.'
    }
  ];

  const executionPhases = [
    {
      phase: '01',
      title: 'Skill Assessment',
      description: 'Conduct formal sessions for analysing and understand the current skill level of the student and prepare the plan for project readiness.'
    },
    {
      phase: '02',
      title: 'Project Readiness Program',
      description: 'All the students will be provided enough training on necessary skills and make them ready for project development.'
    },
    {
      phase: '03',
      title: 'Development & Testing',
      description: 'Iterative sprints based development and testing phases.'
    },
    {
      phase: '04',
      title: 'Post Development Support',
      description: 'Project retrospective meetings & further mentoring on the areas of improvement as necessary. Includes mock interviews/ suggest for improvement.'
    },
    {
      phase: '05',
      title: 'Formal Completion & Certification',
      description: 'Formal ceremony for completion of the project and awarding Project completion certification.'
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Innovation Hubs for Colleges</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Kachchapi's Innovation Hubs foster <strong>Research, Innovation, Skills, and Entrepreneurship (RISE)</strong> at colleges. 
              We deploy seasoned project mentoring teams directly on campus to empower students to become future-ready professionals 
              and innovators through real-world industry projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                Partner with Us
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-dark-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                View Project Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">How Innovation Hubs Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures students gain real-world experience through industry-relevant projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">On-Campus Industry Immersion</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated technical project teams of seasoned industry professionals work directly on campus. 
                They provide hands-on mentorship, sharing current industry standards and best practices, offering 
                students direct exposure to professional methodologies and collaborative team dynamics.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Realtime Projects, Tangible Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Students actively participate in live, industry-driven software projects that tackle real business challenges. 
                These are authentic initiatives where students contribute directly to solutions destined for real-world deployment, 
                ensuring highly relevant, in-demand skills.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Holistic Mentorship & Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Our program offers comprehensive exposure to the entire project lifecycle, from ideation to deployment and maintenance. 
                Under experienced mentors, students receive feedback, learn advanced problem-solving, and gain crucial technical assistance, 
                accelerating their professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Project Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated selection of project themes from our catalogue, meticulously crafted to enable students 
              with practical skills in emerging technologies and real-world industry challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-dark-800 mb-4">{category.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Student Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kachchapi bridges the gap between academic theory and industry demand, equipping students with 
              invaluable practical skills and a powerful head start in their professional journeys.
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

      {/* Execution Phases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">Project Execution Phases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kachchapi seamlessly integrates expert technical project teams directly into college environments, 
              delivering a dynamic portfolio of real-world, cutting-edge software projects complete with structured mentorship.
            </p>
          </div>

          <div className="space-y-8">
            {executionPhases.map((phase, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {phase.phase}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-dark-800 mb-3">{phase.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your College?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Partner with Kachchapi to establish an Innovation Hub at your institution and prepare students for industry success
          </p>
          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            START PARTNERSHIP
          </button>
        </div>
      </section>
    </div>
  );
};

export default InnovationHubs;
