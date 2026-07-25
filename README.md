# TaskFlow Pro – Team & Task Management SaaS Platform

TaskFlow Pro is an enterprise-grade, full-stack SaaS task and team management platform built using the MERN stack (MongoDB, Express, React, Node.js). It provides robust features such as visual task boards (Grid, Table, Kanban), dynamic Recharts dashboards, custom filters, pagination, secure JWT session management, persistent theme toggles, and Cloudinary media uploads.

---

## 🚀 Features

### 🔐 Authentication & Session Control
- Fully secure JWT Bearer authorization and cookie-based sessions.
- Pre-save bcrypt hashing middlewares in Mongoose.
- Strong password regex checks (capital letters, digits, and special characters).
- Persistent "Remember Me" login profiles.

### 📋 Task Module (Complete CRUD)
- Create, Read, Update, Delete, Duplicate, Archive, and Restore tasks.
- Toolbar options containing debounced searches, status filters, priority filters, and custom page parameters.
- View modes: Grid, Table, and Kanban Drag-and-Drop (updates status dynamically in database).
- Custom pagination (10 items per page limit).
- Attachment upload (Max 5MB images or documents) backed by Cloudinary.

### 📊 Aggregated Dashboards & Analytics
- Dynamic statistics cards calculating Total, Completed, In-Progress, Pending, Overdue, and High-Priority tasks.
- Responsive Recharts visualizations:
  - Pie Chart: Status distributions.
  - Bar Chart: Priorities breakdown.
  - Line Chart: Monthly completions productivity timeline.
- Dynamic listings for recent task updates and imminent deadlines.
- Interactive export actions to generate CSV reports.

### ⚙️ User Settings & Accessibility
- Persistent interface Light & Dark themes saved locally.
- Profile management form allowing users to update their name, email, avatar image, and credentials.
- Notification configuration and deactivation danger zone logic.
- ARIA accessibility structures and responsive mobile sidebar drawers.

---

## 📁 Folder Structure

### Frontend (`client/`)
```
client/
├── src/
│   ├── assets/       # Media assets
│   ├── components/
│   │   └── common/   # Reusable UI (Buttons, Inputs, Modals, Badges, Toasts)
│   ├── layouts/      # Layout boxes (AuthLayout, DashboardLayout)
│   ├── pages/        # Views (Landing, Login, Dashboard, Tasks, Profile, Settings)
│   ├── hooks/        # React Hooks (useAuth, useTasks, useTheme, useDebounce)
│   ├── services/     # Axios client configuration and endpoints logic
│   ├── store/        # Redux store, feature slices (auth, tasks, theme, ui, notifications)
│   ├── styles/
│   └── routes/
```

### Backend (`server/`)
```
server/
├── config/           # DB connections and Cloudinary configs
├── controllers/      # Route handler controllers mapping endpoints to services
├── middleware/       # JWT auth checkers, upload parser configurations, error handlers
├── models/           # Mongoose schemas (User, Task)
├── routes/           # Router groups (Auth, Tasks, Dashboard, Uploads)
├── services/         # Decoupled business logic (aggregations, sorting filters)
├── validators/       # Input validations using express-validator
└── utils/            # JWT generators, buffer upload helpers, and seed scripts
```

---

## 🛠️ Installation & Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

### Step 1: Configure Environment Variables
Create a `.env` file at the root of the workspace with the following keys:
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

### Step 2: Install Dependencies
Run from the workspace root:
```bash
npm run install:all
```
This installs root devDependencies (`concurrently`), server dependencies, and client packages in one command.

### Step 3: Seed Sample Data
Populate users and tasks for analytics testing:
```bash
node server/utils/seed.js
```
Sample test accounts seeded:
- **Email**: `alex@taskflow.com` | **Password**: `Password@123`
- **Email**: `sarah@taskflow.com` | **Password**: `Password@123`

### Step 4: Run Locally in Parallel
Run the frontend and backend servers together:
```bash
npm run dev
```
- **Backend URL**: `http://localhost:5000`
- **Frontend URL**: `http://localhost:5173`

---

## 📡 API Documentation

All request payloads and outputs utilize standard JSON envelopes:
`{ success: true, message: "", data: {}, error: null }`

### Authentication
- `POST /api/auth/register`: Create a new account.
- `POST /api/auth/login`: Access session token.
- `POST /api/auth/logout`: Clear token session.
- `GET /api/auth/me`: Fetch current logged-in user profile.
- `PUT /api/auth/profile`: Update details (Name, Email, Avatar).
- `PUT /api/auth/change-password`: Change password with validation checks.
- `GET /api/auth/users`: List team users.

### Tasks
- `GET /api/tasks`: Get tasks list (supports query filters, sorting, page index, and archives).
- `POST /api/tasks`: Create a new task (takes Title, Description, Priority, DueDate, TeammateId).
- `GET /api/tasks/:id`: Get a specific task's details.
- `PUT /api/tasks/:id`: Update task properties.
- `DELETE /api/tasks/:id`: Hard-delete task (authorized for creator only).
- `POST /api/tasks/:id/duplicate`: Duplicate task.
- `PUT /api/tasks/:id/archive`: Soft-archive task.
- `PUT /api/tasks/:id/restore`: Restore archived task.

### Dashboard & Media
- `GET /api/dashboard`: Fetch stats counters, Pie charts, and Line chart coordinate points.
- `POST /api/upload`: Upload attachment to Cloudinary (returns secure URL).

---

## 🔮 Future Improvements
1. **WebSockets Integration**: Push notifications on task reassignments.
2. **Comments & Mentions**: Task-specific dialogue panels.
3. **Calendar Views**: Drag-and-drop schedule planner calendars.
4. **RBAC Rules**: Manager and Member authorization levels.

---

## 📄 License
This project is licensed under the MIT License.
