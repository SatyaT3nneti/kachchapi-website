import React from 'react';

const Instructors: React.FC = () => {
  const instructors = [
    {
      name: 'Kimberly Walker',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      specialty: 'Web Development',
    },
    {
      name: 'Olivia Morel',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      specialty: 'UI/UX Design',
    },
    {
      name: 'David Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      specialty: 'Data Science',
    },
    {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      specialty: 'Marketing',
    },
    {
      name: 'Michael Rodriguez',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      specialty: 'Photography',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-800 mb-4">
            Become A <span className="text-secondary-500">Instruction Instructor Teacher.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of expert instructors and share your knowledge with 
            thousands of eager learners worldwide.
          </p>
          <button className="mt-8 bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Teaching
          </button>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative mb-4">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-lg font-semibold text-dark-800 mb-2">
                {instructor.name}
              </h3>
              <p className="text-sm text-gray-600">
                {instructor.specialty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
