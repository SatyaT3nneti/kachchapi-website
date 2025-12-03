import React, { useState, useEffect } from 'react';
import leadersService, { Leader, LeadersResponse } from '../services/leadersService';
import QRCodeGenerator from './QRCodeGenerator';
import { environment } from '../config/environment';

interface ResourcesProps {
  onPageChange?: (page: string) => void;
}

const Resources: React.FC<ResourcesProps> = ({ onPageChange }) => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLeaders: 0,
    leadersPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false
  });

  useEffect(() => {
    fetchLeaders();
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchLeaders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: LeadersResponse = await leadersService.getLeaders({
        page: 1,
        pageSize: 10,
        sortBy: 'rank',
        sortOrder: 'asc',
        isActive: true
      });
      
      
      if (response.success) {
        const processedLeaders = response.data.leaders.map(leader => leadersService.processLeaderData(leader));
        setLeaders(processedLeaders);
        setPagination(response.data.pagination);
      } else {
        setError('Failed to fetch leaders');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching leaders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Leaders...</h2>
          <p className="text-gray-600">Please wait while we fetch the most influential leaders</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Leaders</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchLeaders}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-5xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the most influential leaders who have shaped our world through their contributions to science, technology, and society
          </p>
        </div>
      </section>

      {/* Most Influential Leaders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">LEADERSHIP & INNOVATION</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              Most Influential Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from the greatest minds who have transformed our understanding of the world and inspired generations
            </p>
            <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
          </div>

          {/* Leaders Grid */}
          {leaders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader) => (
                <div key={leader.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                  <div className="relative h-64">
                    <img
                      src={leadersService.getImageUrl(leader.image, leader.imageUrl, leader.name)}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      #{leader.rank}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow min-h-[300px]">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-dark-800 mb-2">{leader.name}</h3>
                      <p className="text-primary-600 font-semibold mb-2">{leader.title}</p>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{leader.shortDescription}</p>
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-700">Contribution:</span>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{leader.contribution}</p>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm font-semibold text-gray-700">Key Areas:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {leader.keyAreas.slice(0, 3).map((area, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {area}
                            </span>
                          ))}
                          {leader.keyAreas.length > 3 && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              +{leader.keyAreas.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>{leader.nationality || 'Unknown'}</span>
                        <span>{leader.birthYear ? `${leader.birthYear} - ${leader.birthYear + 80}` : 'Unknown'}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <button 
                        onClick={() => {
                          const url = `${environment.website.baseUrl}/leader/${leader.id}`;
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Learn More
                      </button>
                      <div className="text-center">
                        <QRCodeGenerator
                          url={`${environment.website.baseUrl}/leader/${leader.id}`}
                          leaderName={leader.name}
                          size={100}
                          className="inline-block"
                          showLabel={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Leaders Found</h3>
              <p className="text-gray-500">There are currently no leaders available. Please check back later.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button
                onClick={() => {/* Handle previous page */}}
                disabled={!pagination.hasPreviousPage}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => {/* Handle next page */}}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-6">
              Showing {leaders.length} of {pagination.totalLeaders} influential leaders. More coming soon!
            </p>
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              View All Leaders
            </button>
          </div>
        </div>
      </section>

      {/* Educational Value Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 text-sm font-semibold uppercase tracking-wide">EDUCATIONAL VALUE</span>
            <h2 className="text-4xl font-bold text-dark-800 mt-2 mb-4">
              Why Study These Leaders?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the lives and contributions of influential leaders provides valuable insights for students and professionals
            </p>
            <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Leadership Lessons</h3>
              <p className="text-gray-600">
                Learn about different leadership styles, decision-making processes, and how to overcome challenges
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Innovation Insights</h3>
              <p className="text-gray-600">
                Discover the creative processes and innovative thinking that led to groundbreaking discoveries
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Global Impact</h3>
              <p className="text-gray-600">
                Understand how individual contributions can create lasting positive change in the world
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
