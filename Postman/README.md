# Postman Collections for Kachchapi API

This directory contains Postman collections for testing the Kachchapi API endpoints.

## Collections

### 1. Authentication API Collection (`KachchapiApi_Auth_Collection.json`)
**Description:** Complete authentication system including registration, login, password management, and profile operations.

**Endpoints:**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/change-password` - Change password (authenticated)
- `POST /api/auth/confirm-email` - Confirm email address
- `POST /api/auth/resend-email-confirmation` - Resend email confirmation
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user (authenticated)
- `GET /api/auth/profile` - Get current user profile (authenticated)
- `PUT /api/auth/profile` - Update current user profile (authenticated)
- `GET /api/auth/check-email-confirmation` - Check if email is confirmed

### 2. Theme Settings API Collection (`ThemeSettings_API.postman_collection.json`)
**Description:** User theme settings management including personalization options.

**Endpoints:**
- `GET /api/themesettings/my-settings` - Get current user's theme settings
- `POST /api/themesettings/my-settings` - Create theme settings for current user
- `PUT /api/themesettings/my-settings` - Update current user's theme settings
- `DELETE /api/themesettings/my-settings` - Delete current user's theme settings
- `GET /api/themesettings/default` - Get default theme settings (no auth required)
- `GET /api/themesettings/user/{userId}` - Get theme settings for specific user (Admin only)
- `POST /api/themesettings/user/{userId}` - Create theme settings for specific user (Admin only)
- `PUT /api/themesettings/user/{userId}` - Update theme settings for specific user (Admin only)
- `DELETE /api/themesettings/user/{userId}` - Delete theme settings for specific user (Admin only)

### 3. Enhanced Chapters API Collection (`EnhancedChapters_API.postman_collection.json`)
**Description:** Comprehensive chapter content including overview, key concepts, examples, tips, did you know sections, summary, references, mind maps, quizzes, exercises, and projects.

**Endpoints:**
- `GET /api/chapters/enhanced/{chapterId}` - Get enhanced chapter details by ID
- `GET /api/chapters/enhanced/by-code/{chapterIdCode}` - Get enhanced chapter details by code
- `GET /api/chapters/enhanced` - Get paginated enhanced chapters
- `GET /api/chapters/{chapterId}` - Get basic chapter details

### 4. Mindmaps API Collection (`Mindmaps_API.postman_collection.json`)
**Description:** Mindmap functionality including chapter mindmaps and individual mindmap viewing with D3.js integration.

**Endpoints:**
- `GET /api/chapters/{chapterId}/mindmaps` - Get all mindmaps for a chapter
- `GET /api/chapters/mindmaps/{mindMapId}` - Get specific mindmap by ID
- `GET /api/chapters/enhanced/{chapterId}` - Get enhanced chapter with mindmaps

### 5. Main API Collection (`KachchapiApi.postman_collection.json`)
**Description:** Complete API collection including all CRUD operations, search functionality, and cached endpoints.

**Endpoints:**
- **Students**: Full CRUD operations and search
- **Institutes**: Full CRUD operations and search
- **Grades**: Full CRUD operations and search
- **Subjects**: Full CRUD operations and search
- **Projects**: Full CRUD operations and search
- **Chapters**: Full CRUD operations, search, and enhanced endpoints
- **Cache Management**: Clear cache endpoints
- **Cached Endpoints**: High-performance cached data endpoints

## Setup Instructions

### 1. Import Collections
1. Open Postman
2. Click "Import" button
3. Select the collection files from this directory
4. Import all collections

### 2. Configure Environment Variables
Create a new environment in Postman with these variables:

```json
{
  "baseUrl": "https://localhost:7001",
  "jwt_token": "",
  "studentId": "",
  "instituteId": "",
  "gradeId": "",
  "subjectId": "",
  "chapterId": "",
  "mindMapId": "",
  "projectId": ""
}
```

### 3. Authentication Setup
1. Use the Authentication collection to register/login
2. Copy the JWT token from the login response
3. Set the `jwt_token` environment variable
4. All authenticated endpoints will now work

### 4. Test Data Setup
1. Create test data using the main collection
2. Update environment variables with created IDs
3. Test the enhanced functionality

## Usage Examples

### Testing Mindmap Functionality
1. **Get Chapter Mindmaps**
   ```bash
   curl -X GET "https://localhost:7001/api/chapters/{chapterId}/mindmaps" \
     -H "Authorization: Bearer {jwt_token}"
   ```

2. **Get Specific Mindmap**
   ```bash
   curl -X GET "https://localhost:7001/api/chapters/mindmaps/{mindMapId}" \
     -H "Authorization: Bearer {jwt_token}"
   ```

3. **Get Enhanced Chapter**
   ```bash
   curl -X GET "https://localhost:7001/api/chapters/enhanced/{chapterId}" \
     -H "Authorization: Bearer {jwt_token}"
   ```

### Testing Authentication
1. **Register User**
   ```bash
   curl -X POST "https://localhost:7001/api/auth/register" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "student@example.com",
       "password": "Student@123",
       "confirmPassword": "Student@123",
       "firstName": "John",
       "lastName": "Doe",
       "dateOfBirth": "2005-06-15T00:00:00.000Z",
       "phoneNumber": "+1234567890"
     }'
   ```

2. **Login User**
   ```bash
   curl -X POST "https://localhost:7001/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "student@example.com",
       "password": "Student@123"
     }'
   ```

## Testing Workflow

### 1. Authentication Testing
1. Import Authentication collection
2. Run "Register User" request
3. Check email confirmation (see console logs)
4. Run "Login User" request
5. Copy JWT token to environment variable

### 2. Mindmap Testing
1. Import Mindmaps collection
2. Set `chapterId` and `mindMapId` variables
3. Test "Get Chapter Mindmaps" endpoint
4. Test "Get Mindmap by ID" endpoint
5. Verify D3.js JSON structure in response

### 3. Enhanced Content Testing
1. Import Enhanced Chapters collection
2. Test enhanced chapter endpoints
3. Verify comprehensive content structure
4. Test pagination and filtering

## Troubleshooting

### Common Issues
1. **Authentication Errors**: Ensure JWT token is valid and not expired
2. **CORS Errors**: Verify API server is running and CORS is configured
3. **Data Not Found**: Check if test data exists in database
4. **Connection Errors**: Verify API server is running on correct port

### Debug Steps
1. Check API server logs for errors
2. Verify database connection
3. Test endpoints with curl
4. Check Postman console for detailed error messages

## Additional Resources

- [API Documentation](./README.md)
- [Authentication Guide](./AUTHENTICATION_README.md)
- [Enhanced Chapters Guide](./THEME_SETTINGS_API_README.md)
- [Frontend Implementation](../frontend/README.md) 