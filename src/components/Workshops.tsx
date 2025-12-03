import React from 'react';

const Workshops: React.FC = () => {
  return (
    <section className="py-20 bg-dark-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Free Workshops Card */}
          <div className="bg-white text-dark-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Workshop participants"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Our Free Workshops</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join our free workshops to get a taste of our learning experience. 
                Learn from industry experts and connect with fellow learners.
              </p>
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Join Workshop
              </button>
            </div>
          </div>

          {/* Student Meetup Card */}
          <div className="bg-white text-dark-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Student meetup"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Student Meetup 2024</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with fellow students, share experiences, and build your 
                professional network at our annual student meetup event.
              </p>
              <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Join Meetup
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshops;
