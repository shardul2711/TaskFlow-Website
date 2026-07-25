# TaskFlow Pro - REST API Documentation

This documentation provides comprehensive details of the TaskFlow Pro REST API endpoints. You can use it to understand the requests and responses, or import the pre-configured Postman/Bruno collection.

## Base URLs
- **Local Development**: `http://localhost:5000`
- **Production API**: `https://<your-render-app-name>.onrender.com`

---

## Authentication & Authorization
Most endpoints are protected and require a JSON Web Token (JWT) to access them.
- **Header Format**: 
  ```http
  Authorization: Bearer <your_jwt_token>
  ```
- **Cookie Format**: Alternatively, the server sets a cookie named `token`.

---

## API Reference

### 1. Authentication (Base Path: `/api/auth`)

#### Register User
- **Method**: `POST`
- **Path**: `/register`
- **Authentication**: None
- **Request Body (JSON)**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password@123"
  }
  ```
  - `name`: String (min 3 chars)
  - `email`: String (valid email)
  - `password`: String (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character)
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "60d0fe4f531124213426d8b1",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5..."
    },
    "error": null
  }
  ```

#### Login User
- **Method**: `POST`
- **Path**: `/login`
- **Authentication**: None
- **Request Body (JSON)**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password@123"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
      "user": {
        "_id": "60d0fe4f531124213426d8b1",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5..."
    },
    "error": null
  }
  ```

#### Logout User
- **Method**: `POST`
- **Path**: `/logout`
- **Authentication**: None (Clears the JWT token cookie)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully",
    "data": null,
    "error": null
  }
  ```

#### Get Current User Details
- **Method**: `GET`
- **Path**: `/me`
- **Authentication**: Required (JWT Bearer)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User details retrieved successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8b1",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user"
    },
    "error": null
  }
  ```

#### Update User Profile
- **Method**: `PUT`
- **Path**: `/profile`
- **Authentication**: Required (JWT Bearer)
- **Request Body (JSON - All fields optional)**:
  ```json
  {
    "name": "Jane Smith",
    "email": "janesmith@example.com"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profile updated successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8b1",
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "role": "user"
    },
    "error": null
  }
  ```

#### Change Password
- **Method**: `PUT`
- **Path**: `/change-password`
- **Authentication**: Required (JWT Bearer)
- **Request Body (JSON)**:
  ```json
  {
    "currentPassword": "Password@123",
    "newPassword": "NewPassword@123"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Password changed successfully",
    "data": null,
    "error": null
  }
  ```

#### Get All Users
- **Method**: `GET`
- **Path**: `/users`
- **Authentication**: Required (JWT Bearer)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Users list retrieved successfully",
    "data": [
      {
        "_id": "60d0fe4f531124213426d8b1",
        "name": "Jane Smith",
        "email": "janesmith@example.com"
      }
    ],
    "error": null
  }
  ```

---

### 2. Dashboard metrics (Base Path: `/api/dashboard`)

#### Get Dashboard Analytics Data
- **Method**: `GET`
- **Path**: `/`
- **Authentication**: Required (JWT Bearer)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Dashboard data retrieved successfully",
    "data": {
      "metrics": {
        "totalTasks": 12,
        "completedTasks": 5,
        "inProgressTasks": 4,
        "pendingTasks": 2,
        "cancelledTasks": 1,
        "completionRate": 41.67
      },
      "priorityStats": {
        "low": 3,
        "medium": 4,
        "high": 3,
        "critical": 2
      },
      "completionTrend": [
        { "date": "2026-07-20", "completed": 1 },
        { "date": "2026-07-21", "completed": 2 }
      ],
      "recentTasks": []
    },
    "error": null
  }
  ```

---

### 3. Tasks Management (Base Path: `/api/tasks`)
*All endpoints require JWT authorization.*

#### Get Tasks List (with optional filters)
- **Method**: `GET`
- **Path**: `/`
- **Query Parameters**:
  - `page`: Number (default: `1`)
  - `limit`: Number (default: `10`)
  - `search`: String (searches by title/description)
  - `status`: String (`pending`, `in progress`, `completed`, `cancelled`)
  - `priority`: String (`low`, `medium`, `high`, `critical`)
  - `archived`: Boolean (default: `false`)
  - `sortBy`: String (`newest`, `oldest`, `dueDate`)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": {
      "tasks": [
        {
          "_id": "60d0fe4f531124213426d8c5",
          "title": "Set up production server",
          "description": "Configure deployment environments",
          "status": "pending",
          "priority": "high",
          "dueDate": "2026-08-01T00:00:00.000Z",
          "assignedTo": {
            "_id": "60d0fe4f531124213426d8b1",
            "name": "Jane Smith"
          },
          "tags": ["Deployment", "Backend"],
          "createdBy": "60d0fe4f531124213426d8b1"
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalTasks": 1,
        "hasMore": false
      }
    },
    "error": null
  }
  ```

#### Create Task
- **Method**: `POST`
- **Path**: `/`
- **Request Body (JSON)**:
  ```json
  {
    "title": "Build backend APIs",
    "description": "Implement authentication and task controllers",
    "priority": "high",
    "dueDate": "2026-08-10T12:00:00.000Z",
    "assignedTo": "60d0fe4f531124213426d8b1",
    "tags": ["development", "api"],
    "status": "pending"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8c8",
      "title": "Build backend APIs",
      "description": "Implement authentication and task controllers",
      "priority": "high",
      "dueDate": "2026-08-10T12:00:00.000Z",
      "assignedTo": "60d0fe4f531124213426d8b1",
      "tags": ["development", "api"],
      "status": "pending",
      "createdBy": "60d0fe4f531124213426d8b1",
      "createdAt": "2026-07-25T12:00:00.000Z",
      "updatedAt": "2026-07-25T12:00:00.000Z"
    },
    "error": null
  }
  ```

#### Get Task by ID
- **Method**: `GET`
- **Path**: `/:id`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task details retrieved successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8c8"
      // task fields...
    },
    "error": null
  }
  ```

#### Update Task by ID
- **Method**: `PUT`
- **Path**: `/:id`
- **Request Body (JSON)**: Same fields as Create Task.
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8c8"
      // updated task fields...
    },
    "error": null
  }
  ```

#### Delete Task by ID
- **Method**: `DELETE`
- **Path**: `/:id`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully",
    "data": null,
    "error": null
  }
  ```

#### Duplicate Task
- **Method**: `POST`
- **Path**: `/:id/duplicate`
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Task duplicated successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8e9"
      // duplicated task fields...
    },
    "error": null
  }
  ```

#### Archive Task
- **Method**: `PUT`
- **Path**: `/:id/archive`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task archived successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8c8",
      "isArchived": true
    },
    "error": null
  }
  ```

#### Restore Task
- **Method**: `PUT`
- **Path**: `/:id/restore`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task restored successfully",
    "data": {
      "_id": "60d0fe4f531124213426d8c8",
      "isArchived": false
    },
    "error": null
  }
  ```

---

### 4. File Upload (Base Path: `/api/upload`)

#### Upload File
- **Method**: `POST`
- **Path**: `/`
- **Headers**:
  - `Content-Type`: `multipart/form-data`
- **Request Body (Form-Data)**:
  - `file`: Binary file (images, PDFs, documents, text files)
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "File uploaded successfully",
    "data": {
      "url": "https://res.cloudinary.com/fwtoo6uw/image/upload/v1626262/taskflow_attachments/162626262-file.png"
    },
    "error": null
  }
  ```
