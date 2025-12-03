import React, { useState, useEffect } from 'react';
import leadersService, { LeaderDetail as LeaderDetailType, LeaderDetailResponse, LeadersResponse } from '../services/leadersService';
import QRCodeGenerator from './QRCodeGenerator';
import { environment } from '../config/environment';

interface LeaderDetailProps {
  leaderId: string;
}

interface Leader {
  id: number;
  name: string;
  title: string;
  contribution: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  achievements: string[];
  keyAreas: string[];
  birthYear: number;
  deathYear?: number;
  nationality: string;
  education: string;
  notableWorks: string[];
  quotes: string[];
  impact: string;
  timeline: Array<{
    year: number;
    event: string;
  }>;
}

const LeaderDetail: React.FC<LeaderDetailProps> = ({ leaderId }) => {
  const [leader, setLeader] = useState<LeaderDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchLeaderDetails();
  }, [leaderId]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Test API connectivity
  const testApiConnectivity = async () => {
    try {
      const testUrl = `${leadersService['baseUrl']}/website/leaders?page=1&pageSize=1`;
      
      const response = await fetch(testUrl);
      
      if (response.ok) {
        const data = await response.json();
      }
    } catch (err) {
    }
  };

  const fetchLeaderDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let leaderDetail: LeaderDetailType | null = null;
      
      // First try the individual leader API
      try {
        const response: LeaderDetailResponse = await leadersService.getLeaderById(leaderId);
        
        if (response.success) {
          leaderDetail = response.data.leader;
        }
      } catch (individualError) {
        
        // Fallback to leaders list API and filter by ID
        const response: LeadersResponse = await leadersService.getLeaders({
          page: 1,
          pageSize: 100, // Get more leaders to find the one we need
          sortBy: 'rank',
          sortOrder: 'asc',
          isActive: true
        });
        
        
        if (response.success) {
          const foundLeader = response.data.leaders.find(leader => leader.id === leaderId);
          if (foundLeader) {
            // Convert Leader to LeaderDetail by adding default values for missing fields
            leaderDetail = {
              ...foundLeader,
              fullDescription: foundLeader.shortDescription, // Use short description as fallback
              deathYear: undefined,
              education: undefined,
              notableWorks: [],
              quotes: [],
              impact: foundLeader.shortDescription,
              timeline: [],
              awards: [],
              relatedLeaders: [],
              educationalValue: {
                leadershipLessons: [],
                scientificContributions: [],
                lifeValues: []
              },
              viewCount: 0
            };
          }
        }
      }
      
      if (leaderDetail) {
        setLeader(leaderDetail);
      } else {
        setError('Leader not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching leader details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Leader Details...</h2>
          <p className="text-gray-600">Please wait while we fetch the leader information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Leader</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2"><strong>Leader ID:</strong> {leaderId}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>API Base URL:</strong> {leadersService['baseUrl']}</p>
            <p className="text-sm text-gray-600"><strong>Expected URL:</strong> {leadersService['baseUrl']}/website/leaders/{leaderId}</p>
          </div>
          <div className="space-x-4">
            <button 
              onClick={fetchLeaderDetails}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={testApiConnectivity}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Test API
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Leader Not Found</h1>
          <p className="text-gray-600">The requested leader profile could not be found.</p>
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
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">{leader.name}</h1>
              <p className="text-2xl text-primary-300 mb-4">{leader.title}</p>
              <p className="text-xl text-gray-300 mb-6">{leader.shortDescription}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-primary-500 px-3 py-1 rounded-full">{leader.nationality || 'Unknown'}</span>
                <span className="bg-primary-500 px-3 py-1 rounded-full">
                  {leader.birthYear ? `${leader.birthYear} - ${leader.deathYear || 'Present'}` : 'Unknown'}
                </span>
                {leader.education && (
                  <span className="bg-primary-500 px-3 py-1 rounded-full">{leader.education}</span>
                )}
              </div>
            </div>
            <div className="flex justify-center relative">
              <img
                src={leadersService.getImageUrl(leader.image, leader.imageUrl, leader.name)}
                alt={leader.name}
                className="w-80 h-80 object-cover rounded-full shadow-2xl"
              />
              {/* QR Code Overlay */}
              <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <QRCodeGenerator
              url={`${environment.website.baseUrl}/leader/${leader.id}`}
              leaderName={leader.name}
              size={80}
              showDownloadButton={false}
              showLabel={false}
            />
                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Scan to share profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Biography */}
              {leader.fullDescription && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-dark-800 mb-6">Biography</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{leader.fullDescription}</p>
                </div>
              )}

              {/* Key Achievements */}
              {leader.achievements && leader.achievements.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-dark-800 mb-6">Key Achievements</h2>
                  <div className="space-y-4">
                    {leader.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-gray-600">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notable Works */}
              {leader.notableWorks && leader.notableWorks.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-dark-800 mb-6">Notable Works</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {leader.notableWorks.map((work, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">{work}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {leader.timeline && leader.timeline.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-dark-800 mb-6">Life Timeline</h2>
                  <div className="space-y-4">
                    {leader.timeline.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-20 text-sm font-semibold text-primary-600 mr-4">
                          {event.year}
                        </div>
                        <div className="flex-1">
                          <div className="w-4 h-4 bg-primary-500 rounded-full absolute -ml-6 mt-2"></div>
                          <p className="text-gray-600">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact */}
              {leader.impact && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-dark-800 mb-6">Legacy & Impact</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{leader.impact}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Key Areas */}
              {leader.keyAreas && leader.keyAreas.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-dark-800 mb-4">Key Areas of Expertise</h3>
                  <div className="space-y-2">
                    {leader.keyAreas.map((area, index) => (
                      <span key={index} className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inspirational Quotes */}
              {leader.quotes && leader.quotes.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-dark-800 mb-4">Inspirational Quotes</h3>
                  <div className="space-y-4">
                    {leader.quotes.map((quote, index) => (
                      <blockquote key={index} className="text-gray-600 italic border-l-4 border-primary-500 pl-4">
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Facts */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-dark-800 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Born:</span>
                    <span className="ml-2 text-gray-600">{leader.birthYear || 'Unknown'}</span>
                  </div>
                  {leader.deathYear && (
                    <div>
                      <span className="font-semibold text-gray-700">Died:</span>
                      <span className="ml-2 text-gray-600">{leader.deathYear}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-gray-700">Nationality:</span>
                    <span className="ml-2 text-gray-600">{leader.nationality || 'Unknown'}</span>
                  </div>
                  {leader.education && (
                    <div>
                      <span className="font-semibold text-gray-700">Education:</span>
                      <span className="ml-2 text-gray-600 text-sm">{leader.education}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-gray-700">Rank:</span>
                    <span className="ml-2 text-gray-600">#{leader.rank}</span>
                  </div>
                </div>
              </div>

              {/* Share Profile */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-dark-800 mb-4">Share Profile</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Scan the QR code on the photo to share this leader's profile
                </p>
                <div className="text-center">
                  <button
                    onClick={() => {
                      const url = `${environment.website.baseUrl}/leader/${leader.id}`;
                      navigator.clipboard.writeText(url);
                      // You could add a toast notification here
                    }}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Value Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">Educational Value</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What students and professionals can learn from {leader.name.split(' ')[0]}'s life and work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Leadership Lessons</h3>
              <p className="text-gray-600">
                Learn about perseverance, vision, and the ability to inspire others through challenging times.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Scientific Method</h3>
              <p className="text-gray-600">
                Understand the importance of rigorous research, experimentation, and evidence-based thinking.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Global Impact</h3>
              <p className="text-gray-600">
                See how individual dedication can create lasting positive change for humanity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaderDetail;
