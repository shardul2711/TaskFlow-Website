# Rules Document

# Project Name

TaskFlow Pro – Team & Task Management Platform

Version: 1.0

Purpose:
This document defines the mandatory development standards, coding guidelines, architectural constraints, UI/UX rules, security practices, and implementation rules that **must always be followed** while building this project.

**These rules are mandatory. Never violate them.**

---

# 1. General Rules

- Build production-quality code.
- Never generate placeholder or dummy implementations.
- Never skip validation.
- Never skip error handling.
- Never duplicate code.
- Always prefer reusable components.
- Follow DRY (Don't Repeat Yourself).
- Follow SOLID principles.
- Follow KISS (Keep It Simple, Stupid).
- Write scalable and maintainable code.
- Never leave TODO comments.
- Never hardcode API URLs or secrets.
- Never expose environment variables.
- Use meaningful variable and function names.
- Keep files focused on a single responsibility.

---

# 2. Project Structure Rules

Follow this folder structure exactly.

```
client/
    src/
        assets/
        components/
        hooks/
        layouts/
        pages/
        routes/
        services/
        store/
        utils/
        constants/
        styles/

server/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    validators/
    utils/
```

Do not create unnecessary folders.

---

# 3. React Rules

Always use

- Functional Components
- React Hooks
- ES6+
- Arrow Functions

Never use

- Class Components
- Legacy lifecycle methods

Every page should be small.

Large pages must be divided into reusable components.

---

# 4. Component Rules

Each component should

- Have one responsibility
- Accept props
- Avoid unnecessary state
- Be reusable

Every reusable component belongs inside

```
components/common
```

Examples

```
Button

Input

Modal

Loader

Avatar

Badge

Card

Pagination

SearchBar

Toast
```

---

# 5. Page Rules

Each page should only

- Fetch required data
- Render components
- Handle page-specific logic

Never place business logic inside pages.

---

# 6. State Management Rules

Use Redux Toolkit.

Never use Context API for application state.

Slices

```
authSlice

taskSlice

themeSlice

uiSlice

notificationSlice
```

Never store unnecessary state.

Always normalize state whenever possible.

---

# 7. API Rules

Every request must use Axios.

Never use fetch.

Create

```
axios.js
```

Configure

- Base URL
- JWT Token
- Request Interceptor
- Response Interceptor

Never call APIs directly inside components.

Always create service files.

Example

```
taskService.js

authService.js

dashboardService.js
```

---

# 8. Authentication Rules

Passwords

Always hash using bcrypt.

JWT

Always verify before accessing protected routes.

Protected APIs

Must require Authorization header.

Never store passwords in plain text.

Never expose JWT Secret.

Always implement

- Login
- Register
- Logout
- Remember Me

---

# 9. Authorization Rules

Every protected API

Must validate JWT.

Users

Cannot access another user's data.

Return

401

for unauthorized requests.

---

# 10. Database Rules

Use MongoDB Atlas.

Use Mongoose.

Each collection

Must have

```
createdAt

updatedAt
```

Never perform raw MongoDB queries.

Always use Models.

---

# 11. Model Rules

One model

One responsibility.

Validation belongs inside schema.

Relationships

Must use ObjectId references.

---

# 12. Controller Rules

Controllers should only

- Receive request
- Validate input
- Call service
- Return response

Controllers must NOT

- Query database directly
- Contain business logic

---

# 13. Service Rules

Business logic belongs only inside services.

Examples

Task creation

Analytics

Search

Sorting

Filtering

Notifications

Validation

Never access req or res inside services.

---

# 14. Route Rules

Routes only call controllers.

Never place logic inside routes.

---

# 15. Validation Rules

Frontend validation

React Hook Form

Backend validation

Express Validator

Validate

- Email
- Password
- Required Fields
- Future Date
- Duplicate Email
- JWT
- Task Title
- Description

Never trust frontend validation alone.

---

# 16. Error Handling Rules

Every API

Must return

```
{
 success,
 message,
 data,
 error
}
```

Use proper HTTP codes.

```
200

201

400

401

403

404

500
```

Never expose internal errors.

---

# 17. Logging Rules

Development

Morgan

Production

Error Logs

API Logs

Never log passwords.

Never log JWT.

---

# 18. UI Rules

Use Tailwind CSS.

Design should be

Modern

Minimal

Professional

Responsive

No Bootstrap.

No Material UI.

Spacing

Consistent.

Use reusable utility classes.

---

# 19. Color Rules

Primary

Blue

Success

Green

Warning

Yellow

Danger

Red

Background

White

Dark Mode

Gray-900

Avoid random colors.

---

# 20. Typography Rules

Use one font family.

Maintain consistent hierarchy.

H1

H2

H3

Body

Caption

Use consistent spacing.

---

# 21. Responsive Rules

Desktop First.

Support

Desktop

Tablet

Mobile

Never allow horizontal scrolling.

---

# 22. Dashboard Rules

Must contain

Sidebar

Navbar

Statistics

Charts

Recent Tasks

Upcoming Tasks

Quick Actions

Everything updates dynamically.

---

# 23. Task Rules

CRUD required.

Fields

Title

Description

Priority

Status

Due Date

Assigned User

Tags

Attachment

Created By

Updated At

Every task must have a unique ID.

---

# 24. Search Rules

Debounced search.

Minimum delay

300ms

Search

Title

Description

Tags

Assigned User

---

# 25. Filter Rules

Status

Priority

Due Date

Newest

Oldest

Completed

Pending

---

# 26. File Upload Rules

Images

PDF

Documents

Maximum

5MB

Use Cloudinary.

Store URL only.

---

# 27. Charts Rules

Use Recharts.

Required

Pie Chart

Bar Chart

Line Chart

Charts update automatically.

---

# 28. Drag & Drop Rules

Use

react-beautiful-dnd

Dragging task updates status automatically.

Persist changes immediately.

---

# 29. Performance Rules

Always use

React.memo

useMemo

useCallback

Lazy Loading

Suspense

Pagination

Code Splitting

Debounced Search

Avoid unnecessary re-renders.

---

# 30. Security Rules

Passwords

bcrypt

JWT Authentication

Helmet

CORS

Rate Limiting

Environment Variables

Input Sanitization

Prevent

XSS

NoSQL Injection

Never expose secrets.

---

# 31. Accessibility Rules

Buttons

Accessible labels.

Forms

Associated labels.

Keyboard navigation.

Visible focus.

Proper contrast.

Use semantic HTML.

---

# 32. Code Style Rules

Use

camelCase

Variables

Functions

PascalCase

Components

UPPER_CASE

Environment variables

Never use abbreviations.

Example

```
taskList

userProfile

dashboardStatistics
```

---

# 33. Git Rules

Commit frequently.

Meaningful commit messages.

Examples

```
feat: implement authentication

fix: resolve JWT middleware issue

refactor: optimize dashboard rendering

style: improve sidebar responsiveness
```

Never commit

```
node_modules

.env

build

dist
```

---

# 34. Deployment Rules

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

All environment variables configured.

Production build must have

No errors

No warnings

---

# 35. Documentation Rules

README must include

- Installation
- Tech Stack
- Folder Structure
- API Documentation
- Environment Variables
- Screenshots
- Deployment
- Live URLs

---

# 36. Testing Rules

Test

Authentication

CRUD

Validation

Search

Filters

Protected Routes

Error Handling

Responsive Layout

Dark Mode

---

# 37. Code Quality Rules

Every function

Small

Reusable

Readable

Every file

Single responsibility

Every component

Reusable

Never duplicate logic.

---

# 38. Final Checklist

Before considering any feature complete, verify:

- No console errors.
- No unused imports.
- No unused variables.
- No duplicate code.
- Fully responsive.
- Frontend validation implemented.
- Backend validation implemented.
- JWT authentication working.
- Protected routes secured.
- Redux state updated correctly.
- API responses standardized.
- Loading states implemented.
- Empty states implemented.
- Error states implemented.
- Success notifications implemented.
- Production build passes successfully.
- Deployment tested on Vercel, Render, and MongoDB Atlas.

---

# 39. Mandatory Development Instructions for Antigravity

You are acting as a Senior Full Stack Engineer.

For every feature:

- Think before generating code.
- Never generate incomplete implementations.
- Create reusable components.
- Create reusable hooks.
- Create reusable services.
- Keep business logic inside services.
- Follow the architecture document strictly.
- Follow the PRD exactly.
- Never skip edge cases.
- Never skip loading states.
- Never skip error handling.
- Never skip validation.
- Never sacrifice scalability for speed.
- Write code that is production-ready, maintainable, secure, and interview-quality.