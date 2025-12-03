import React from 'react';

const Partners: React.FC = () => {
  const partners = [
    { name: 'Kachchapi', logo: 'K' },
    { name: 'Arlington', logo: 'A' },
    { name: 'Global Academy', logo: 'G' },
    { name: 'Tech Institute', logo: 'T' },
    { name: 'Innovation Hub', logo: 'I' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-800 mb-4">
            550+ Leading Universities And Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with prestigious institutions and industry leaders to 
            provide you with the highest quality education and career opportunities.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {partner.logo}
              </div>
              <h3 className="text-lg font-semibold text-dark-800 text-center">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
