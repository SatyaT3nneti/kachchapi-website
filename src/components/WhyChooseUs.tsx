import React from 'react';

const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: 'Immersive Real-World Projects',
      description: 'Dive into authentic, client-driven projects designed to simulate actual industry scenarios, fostering critical thinking and problem-solving skills.'
    },
    {
      title: 'Mastering Modern Toolsets',
      description: 'Gain proficiency in cutting-edge development methodologies and tools, including Agile workflows, robust DevOps practices, and continuous integration/delivery pipelines.'
    },
    {
      title: 'Guidance from Industry Veterans',
      description: 'Receive personalized coaching and insights from seasoned developers and architects who bring years of practical experience and mentorship directly to you.'
    },
    {
      title: 'Building a Standout Portfolio',
      description: 'Craft a compelling portfolio filled with tangible, high-impact projects that clearly showcase your capabilities and distinguish you to prospective employers.'
    },
    {
      title: 'Seamless Career Launchpad',
      description: 'Step confidently into internships, placements, and entry-level roles, ready to contribute meaningfully from day one with proven professional readiness.'
    },
    {
      title: 'Interview Preparation Support',
      description: 'Receive guidance and preparation for technical interviews, mock interviews, and career placement support to help you succeed in job interviews.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-dark-800 mb-4">
            Student Benefits
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl">
            Kachchapi bridges the gap between academic theory and industry demand, equipping students with invaluable practical skills and a powerful head start in their professional journeys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500"></div>
              <div className="pl-4">
                <h3 className="text-xl font-bold text-dark-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
