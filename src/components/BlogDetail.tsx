import React from 'react';

const BlogDetail: React.FC = () => {
  const recentPosts = [
    {
      id: 1,
      title: "The Complete Digital Marketing Learning Path",
      date: "July 3, 2023",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      title: "Group Of Students Sharing Their Ideas",
      date: "July 3, 2023",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      title: "Learn Webs Applications Development From Experts",
      date: "June 29, 2023",
      image: "/api/placeholder/80/80"
    },
    {
      id: 4,
      title: "How To Plan Your Week For Ultimate Productivity",
      date: "June 29, 2023",
      image: "/api/placeholder/80/80"
    }
  ];

  const categories = [
    "Business", "Technology", "Courses", "Education", "Professions", "Computer"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Post: The Complete Digital Marketing Learning Path</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Blog Post Content - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Image */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="/api/placeholder/800/400" 
                  alt="Blog Post Featured Image"
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Post Content */}
              <article className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-dark-800 mb-4">
                  The Complete Digital Marketing Learning Path
                </h1>
                
                {/* Post Metadata */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6 pb-4 border-b">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    July 3, 2023
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    5:35 am
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    No Comments
                  </span>
                </div>

                {/* Post Body */}
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-gray-700">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>

                {/* Author Box */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
                      Picture of Helson George
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-800">Helson George</h3>
                      <p className="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Leave A Reply Section */}
                <div className="border-t pt-8">
                  <h3 className="text-2xl font-bold text-dark-800 mb-4">Leave A Reply</h3>
                  <p className="text-gray-600 mb-6">
                    Your email address will not be published. Required fields are marked *
                  </p>
                  
                  <form className="space-y-4">
                    <div>
                      <textarea 
                        placeholder="Comment *"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={6}
                      ></textarea>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        placeholder="Name *"
                        className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input 
                        type="email" 
                        placeholder="Email *"
                        className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input 
                        type="url" 
                        placeholder="Website"
                        className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="save-info"
                        className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="save-info" className="text-gray-700">
                        Save my name, email, and website in this browser for the next time I comment.
                      </label>
                    </div>
                    <button 
                      type="submit"
                      className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                    >
                      POST COMMENT
                    </button>
                  </form>
                </div>

                {/* Previous Post Navigation */}
                <div className="border-t pt-8 mt-8">
                  <a href="#" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous Group Of Students Sharing Their Ideas
                  </a>
                </div>
              </article>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-8">
              {/* About Our Author */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-dark-800 mb-4 border-b-2 border-primary-500 pb-2">About Our Author</h3>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-600 text-sm">
                    Picture of Jason C. Cavazos
                  </div>
                  <h4 className="text-lg font-bold text-dark-800 mb-2">Jason C. Cavazos</h4>
                  <p className="text-gray-600 text-sm">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam
                  </p>
                </div>
              </div>

              {/* Post Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-dark-800 mb-4 border-b-2 border-primary-500 pb-2">Post Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors flex items-center">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-dark-800 mb-4 border-b-2 border-primary-500 pb-2">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center space-x-3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium text-dark-800 text-sm hover:text-primary-600 transition-colors cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-gray-500 text-xs">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Send Us Your C.V. */}
              <div className="bg-dark-800 text-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Send Us Your C.V.</h3>
                <p className="text-gray-300 mb-4">
                  Do you want to work with us? Please, send your CV to contact@kachchapi.com
                </p>
                <div className="text-gray-400 mb-4">OR</div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;

