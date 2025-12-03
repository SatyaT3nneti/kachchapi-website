import environment from '../config/environment';

// Types for Leaders API
export interface Leader {
  id: string;
  name: string;
  title: string;
  contribution: string;
  image: string | null;
  imageUrl: string | null;
  shortDescription: string;
  achievements: string[];
  keyAreas: string[];
  birthYear: number | null;
  nationality: string | null;
  rank: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderDetail extends Leader {
  fullDescription?: string;
  deathYear?: number | null;
  education?: string;
  notableWorks?: string[];
  quotes?: string[];
  impact?: string;
  timeline?: Array<{
    year: number;
    event: string;
  }>;
  awards?: Array<{
    name: string;
    year: number;
    description: string;
  }>;
  relatedLeaders?: Array<{
    id: string;
    name: string;
    title: string;
    image: string | null;
    connection: string;
  }>;
  educationalValue?: {
    leadershipLessons: string[];
    scientificContributions: string[];
    lifeValues: string[];
  };
  viewCount?: number;
}

export interface LeadersResponse {
  success: boolean;
  data: {
    leaders: Leader[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalLeaders: number;
      leadersPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    filters: {
      availableKeyAreas: string[];
      availableNationalities: string[];
      availableTimePeriods: string[];
    };
  };
  message: string;
}

export interface LeaderDetailResponse {
  success: boolean;
  data: {
    leader: LeaderDetail;
  };
  message: string;
}

export interface LeadersQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: 'rank' | 'name' | 'birthYear' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  isActive?: boolean;
  keyArea?: string;
  nationality?: string;
  search?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

class LeadersService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = environment.api.baseUrl;
  }

  async getLeaders(params: LeadersQueryParams = {}): Promise<LeadersResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      // Add default values
      queryParams.append('page', (params.page || 1).toString());
      queryParams.append('pageSize', (params.pageSize || 10).toString());
      queryParams.append('sortBy', params.sortBy || 'rank');
      queryParams.append('sortOrder', params.sortOrder || 'asc');
      queryParams.append('isActive', (params.isActive !== false).toString());

      // Add optional filters
      if (params.keyArea) queryParams.append('keyArea', params.keyArea);
      if (params.nationality) queryParams.append('nationality', params.nationality);
      if (params.search) queryParams.append('search', params.search);

      const url = `${this.baseUrl}${environment.api.endpoints.leaders.getAll}?${queryParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch leaders: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while fetching leaders');
    }
  }

  async getLeaderById(id: string): Promise<LeaderDetailResponse> {
    try {
      const url = `${this.baseUrl}${environment.api.endpoints.leaders.getById(id)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Leader not found');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch leader details: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while fetching leader details');
    }
  }

  async searchLeaders(query: string, params: Omit<LeadersQueryParams, 'search'> = {}): Promise<LeadersResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      queryParams.append('q', query);
      queryParams.append('page', (params.page || 1).toString());
      queryParams.append('pageSize', (params.pageSize || 10).toString());
      queryParams.append('sortBy', params.sortBy || 'rank');
      queryParams.append('sortOrder', params.sortOrder || 'asc');
      queryParams.append('isActive', (params.isActive !== false).toString());

      if (params.keyArea) queryParams.append('keyArea', params.keyArea);
      if (params.nationality) queryParams.append('nationality', params.nationality);

      const response = await fetch(`${this.baseUrl}${environment.api.endpoints.leaders.search}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to search leaders: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while searching leaders');
    }
  }

  async filterLeaders(filters: {
    keyArea?: string;
    nationality?: string;
    timePeriod?: string;
    page?: number;
    pageSize?: number;
  }): Promise<LeadersResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      queryParams.append('page', (filters.page || 1).toString());
      queryParams.append('pageSize', (filters.pageSize || 10).toString());

      if (filters.keyArea) queryParams.append('keyArea', filters.keyArea);
      if (filters.nationality) queryParams.append('nationality', filters.nationality);
      if (filters.timePeriod) queryParams.append('timePeriod', filters.timePeriod);

      const response = await fetch(`${this.baseUrl}${environment.api.endpoints.leaders.filter}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to filter leaders: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while filtering leaders');
    }
  }

  // Helper method to get image URL with fallback
  getImageUrl(image: string | null, imageUrl: string | null, fallbackName: string): string {
    // Priority: imageUrl (relative path) > image (URL) > placeholder
    if (imageUrl) {
      // If imageUrl is a relative path, it should be served from the public folder
      return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    }
    if (image) {
      return image.startsWith('http') ? image : `${this.baseUrl}${image}`;
    }
    return `https://via.placeholder.com/400x400/6366f1/ffffff?text=${encodeURIComponent(fallbackName.split(' ')[0])}`;
  }

  // Helper method to remove duplicate values from arrays
  removeDuplicates<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  // Helper method to process leader data
  processLeaderData(leader: Leader): Leader {
    return {
      ...leader,
      achievements: this.removeDuplicates(leader.achievements),
      keyAreas: this.removeDuplicates(leader.keyAreas),
    };
  }
}

export default new LeadersService();
