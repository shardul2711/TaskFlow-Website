# TaskFlow Pro – Team & Task Management SaaS Platform

TaskFlow Pro is an enterprise-grade, full-stack SaaS task and team management platform built using the MERN stack (MongoDB, Express, React, Node.js). It provides robust task management workflows, visual boards, analytics dashboards, secure authentication, media uploads, and a responsive user experience for teams of all sizes.

---

## 🌐 Live Demo

### Frontend

https://task-flow-website-seven.vercel.app/

### Backend API

https://taskflow-website-8vxf.onrender.com/

---

## 🚀 Features

### 🔐 Authentication & Session Control

* Secure JWT Bearer authentication
* Cookie-based session management
* Password hashing using bcrypt middleware
* Strong password validation rules
* Persistent "Remember Me" functionality
* Protected routes and authorization middleware

### 📋 Task Management

* Create, Read, Update, and Delete tasks
* Duplicate tasks
* Archive and restore tasks
* Grid View
* Table View
* Kanban Drag-and-Drop View
* Dynamic status updates
* Debounced task search
* Status and priority filtering
* Custom pagination
* Attachment uploads via Cloudinary
* Support for image and document uploads

### 📊 Dashboards & Analytics

* Total Tasks statistics
* Completed Tasks tracking
* Pending Tasks overview
* In-Progress Tasks monitoring
* Overdue Tasks detection
* High Priority Tasks analytics

#### Recharts Visualizations

* Pie Chart for task status distribution
* Bar Chart for priority analysis
* Line Chart for productivity trends
* Recent activity listings
* Upcoming deadline summaries
* CSV report exports

### ⚙️ User Settings & Accessibility

* Light Theme and Dark Theme support
* Persistent theme preferences
* Profile management
* Avatar upload support
* Notification preferences
* Account management options
* Responsive mobile navigation
* ARIA accessibility support

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* Recharts
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* express-validator
* Multer

### Cloud & Deployment

* Cloudinary
* Render
* Vercel
* MongoDB Atlas

---

## 📸 Screenshots

> Replace the images below with actual project screenshots.

### Landing Page

<img width="1916" height="969" alt="image" src="https://github.com/user-attachments/assets/9d86351e-f804-4636-a601-48f129ddcdb4" />

### Login Page

<img width="1918" height="971" alt="image" src="https://github.com/user-attachments/assets/84f0704e-3e4e-4b46-9541-4eddb7ebb8bd" />


### Dashboard

<img width="1918" height="973" alt="image" src="https://github.com/user-attachments/assets/1930dbb9-9666-47cc-b496-d2e66006e509" />
<img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/14078bce-22e8-4854-8d2a-4dd391363de1" />


### Task Board

<img width="1918" height="975" alt="image" src="https://github.com/user-attachments/assets/f699d36a-5b35-4559-a8d3-b0289dd6fe38" />
<img width="1918" height="967" alt="image" src="https://github.com/user-attachments/assets/9336be76-2656-4071-8a56-bb7edea8dc90" />


### Kanban View

![Kanban View](./screenshots/kanban-view.png)

### Profile Settings

<img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/29592f8a-1fed-4166-9b0d-a6552424ec11" />


### Analytics Dashboard

<img width="1919" height="973" alt="image" src="https://github.com/user-attachments/assets/4285a632-fc78-4a0e-acf8-12591e204c02" />
<img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/c65a44bb-815e-44ed-99e3-b3b60713d63f" />


---

## 📁 Folder Structure

### Frontend (client)

```text
client/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── common/
│   ├── layouts/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── styles/
│   └── routes/
```

### Backend (server)

```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
└── utils/
```

---

## 🛠️ Installation & Getting Started

### Prerequisites

* Node.js v18+
* MongoDB Atlas Account
* Cloudinary Account

---

### Step 1: Clone Repository

```bash
git clone <your-repository-url>
cd taskflow-pro
```

---

### Step 2: Configure Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

### Step 3: Install Dependencies

Install all project dependencies:

```bash
npm run install:all
```

This command installs:

* Root dependencies
* Backend dependencies
* Frontend dependencies

---

### Step 4: Seed Sample Data (Optional)

```bash
node server/utils/seed.js
```

Sample Accounts:

```text
Email: alex@taskflow.com
Password: Password@123

Email: sarah@taskflow.com
Password: Password@123
```

---

### Step 5: Run the Project

Start frontend and backend simultaneously:

```bash
npm run dev
```

Application URLs:

```text
Frontend: http://localhost:5173

Backend: http://localhost:5000
```

---

## 📡 API Documentation

### Base URL

Production API:

```text
https://taskflow-website-8vxf.onrender.com
```

> Add detailed request/response examples, authentication flow, and endpoint documentation here.

### Authentication Endpoints

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | /api/auth/register        | Register new user    |
| POST   | /api/auth/login           | Login user           |
| POST   | /api/auth/logout          | Logout user          |
| GET    | /api/auth/me              | Current user profile |
| PUT    | /api/auth/profile         | Update profile       |
| PUT    | /api/auth/change-password | Change password      |
| GET    | /api/auth/users           | Get team members     |

### Task Endpoints

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| GET    | /api/tasks               | Fetch tasks      |
| POST   | /api/tasks               | Create task      |
| GET    | /api/tasks/:id           | Get task details |
| PUT    | /api/tasks/:id           | Update task      |
| DELETE | /api/tasks/:id           | Delete task      |
| POST   | /api/tasks/:id/duplicate | Duplicate task   |
| PUT    | /api/tasks/:id/archive   | Archive task     |
| PUT    | /api/tasks/:id/restore   | Restore task     |

### Dashboard & Uploads

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /api/dashboard | Dashboard analytics |
| POST   | /api/upload    | Upload attachment   |

---

## 🔒 Security Features

* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Secure cookie sessions
* Input validation using express-validator
* Environment-based secret management
* File upload validation
* Authorization middleware

---

## ☁️ Deployment

### Frontend Deployment

Hosted on Vercel:

https://task-flow-website-seven.vercel.app/

### Backend Deployment

Hosted on Render:

https://taskflow-website-8vxf.onrender.com/

---

## 🔮 Future Improvements

* Real-time notifications using WebSockets
* Team chat and messaging
* Task comments and mentions
* Calendar and timeline views
* RBAC (Role-Based Access Control)
* Team workspaces
* Email notifications
* Activity audit logs
* Advanced reporting and exports

---

## 👨‍💻 Author

Developed as a full-stack MERN SaaS application showcasing:

* Authentication & Authorization
* CRUD Operations
* Dashboard Analytics
* State Management
* Cloud Integrations
* Modern UI/UX Design
* Production Deployment

---

## 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project in accordance with the license terms.
