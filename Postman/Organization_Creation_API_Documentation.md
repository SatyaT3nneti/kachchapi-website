# Organization Creation API Documentation

## Overview
This document describes the simplified organization creation API endpoint that creates both an institute and a School Admin user in a single request.

## Endpoint Details

### Create Organization (Simplified)
- **URL**: `POST /api/institutes/create-organization`
- **Authentication**: Not required (public endpoint)
- **Content-Type**: `application/json`

## Request Structure

### Request Body
```json
{
  "personalInformation": {
    "firstName": "string (required)",
    "lastName": "string (required)", 
    "email": "string (required, valid email format)"
  },
  "organizationInformation": {
    "organizationName": "string (required)",
    "organizationType": "string (required)",
    "addressLine1": "string (required)",
    "city": "string (required)",
    "state": "string (required)",
    "zipCode": "string (required)",
    "country": "string (required)"
  }
}
```

### Field Descriptions

#### Personal Information
- **firstName**: First name of the School Admin user
- **lastName**: Last name of the School Admin user  
- **email**: Email address for the School Admin user (will be used as username)

#### Organization Information
- **organizationName**: Name of the organization/institute
- **organizationType**: Type of organization (e.g., "private", "public", "charter")
- **addressLine1**: Street address line 1
- **city**: City name
- **state**: State/province name
- **zipCode**: Postal/ZIP code
- **country**: Country name

## Response Structure

### Success Response (200 OK)
```json
{
  "instituteId": "uuid",
  "instituteName": "string",
  "instituteAddress": "string",
  "status": "string",
  "createdAt": "datetime",
  "organizationType": "string",
  "adminUser": {
    "id": "uuid",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "createdAt": "datetime"
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "PersonalInformation.Email": ["The Email field is required."],
    "OrganizationInformation.OrganizationName": ["The OrganizationName field is required."]
  }
}
```

## Example Usage

### Frontend Implementation (JavaScript/TypeScript)

```typescript
interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
}

interface OrganizationInformation {
  organizationName: string;
  organizationType: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CreateOrganizationRequest {
  personalInformation: PersonalInformation;
  organizationInformation: OrganizationInformation;
}

interface OrganizationResponse {
  instituteId: string;
  instituteName: string;
  instituteAddress: string;
  status: string;
  createdAt: string;
  organizationType: string;
  adminUser: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  };
}

// Function to create organization
async function createOrganization(request: CreateOrganizationRequest): Promise<OrganizationResponse> {
  const response = await fetch('http://localhost:5014/api/institutes/create-organization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Organization creation failed: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

// Example usage
const organizationData: CreateOrganizationRequest = {
  personalInformation: {
    firstName: "John",
    lastName: "Doe", 
    email: "john.doe@school.com"
  },
  organizationInformation: {
    organizationName: "Test School",
    organizationType: "private",
    addressLine1: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA"
  }
};

try {
  const result = await createOrganization(organizationData);
  console.log('Organization created successfully:', result);
  console.log('Institute ID:', result.instituteId);
  console.log('Admin User ID:', result.adminUser.id);
} catch (error) {
  console.error('Failed to create organization:', error);
}
```

### React Hook Example

```typescript
import { useState } from 'react';

interface UseCreateOrganization {
  createOrganization: (data: CreateOrganizationRequest) => Promise<OrganizationResponse>;
  loading: boolean;
  error: string | null;
}

export function useCreateOrganization(): UseCreateOrganization {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrganization = async (data: CreateOrganizationRequest): Promise<OrganizationResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5014/api/institutes/create-organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create organization');
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createOrganization, loading, error };
}
```

### Angular Service Example

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = 'http://localhost:5014/api/institutes';

  constructor(private http: HttpClient) {}

  createOrganization(request: CreateOrganizationRequest): Observable<OrganizationResponse> {
    return this.http.post<OrganizationResponse>(`${this.baseUrl}/create-organization`, request);
  }
}
```

## Important Notes

1. **No Authentication Required**: This endpoint is public and doesn't require authentication.

2. **Automatic User Creation**: The API automatically creates a School Admin user with the provided personal information.

3. **Password Generation**: A secure password is automatically generated for the School Admin user. You'll need to implement a password reset flow for the user to set their own password.

4. **Email Uniqueness**: The email address must be unique across all users in the system.

5. **Address Formatting**: The API automatically formats the full address by combining addressLine1, city, state, and zipCode.

6. **Database Transactions**: The API uses database transactions to ensure data consistency. If any part of the creation fails, all changes are rolled back.

## Validation Rules

- All required fields must be provided
- Email must be in valid format
- Email must be unique (not already registered)
- Organization name cannot be empty
- Address fields cannot be empty

## Error Handling

The API returns detailed validation errors when the request is invalid. Common error scenarios:

- Missing required fields
- Invalid email format
- Email already exists
- Database connection issues

## Testing

You can test the API using the provided Postman collection or using curl:

```bash
curl -X POST http://localhost:5014/api/institutes/create-organization \
  -H "Content-Type: application/json" \
  -d '{
    "personalInformation": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@school.com"
    },
    "organizationInformation": {
      "organizationName": "Test School",
      "organizationType": "private",
      "addressLine1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }'
``` 