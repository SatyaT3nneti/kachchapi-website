import React from 'react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Complete Digital Marketing Learning Path",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      date: "July 3, 2023",
      comments: "No Comments",
      image: "/api/placeholder/400/250",
      category: "Marketing"
    },
    {
      id: 2,
      title: "Learn Webs Applications Development From Experts",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      date: "June 29, 2023",
      comments: "No Comments",
      image: "/api/placeholder/400/250",
      category: "Development"
    },
    {
      id: 3,
      title: "The Transformative Power Of Education 2023",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      date: "June 26, 2023",
      comments: "1 Comment",
      image: "/api/placeholder/400/250",
      category: "Education"
    },
    {
      id: 4,
      title: "Group Of Students Sharing Their Ideas",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      date: "July 3, 2023",
      comments: "No Comments",
      image: "/api/placeholder/400/250",
      category: "Education"
    },
    {
      id: 5,
      title: "How To Plan Your Week For Ultimate Productivity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      date: "June 29, 2023",
      comments: "No Comments",
      image: "/api/placeholder/400/250",
      category: "Productivity"
    }
  ];

  const categories = [
    "Business", "Technology", "Courses", "Education", "Professions", "Computer"
  ];

  const recentPosts = blogPosts.slice(0, 4);

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
          <h1 className="text-5xl font-bold mb-4">Archives</h1>
          <p className="text-xl text-gray-300">Discover our latest insights and educational content</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Blog Posts - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-dark-800 mb-3 hover:text-primary-600 transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.description}
                    </p>
                    <div className="text-sm text-gray-500 border-t pt-4">
                      {post.date} | {post.comments}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-8">
              {/* About Our Author */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-dark-800 mb-4">About Our Author</h3>
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
                <h3 className="text-xl font-bold text-dark-800 mb-4">Post Categories</h3>
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
                <h3 className="text-xl font-bold text-dark-800 mb-4">Recent Posts</h3>
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

export default Blog;
