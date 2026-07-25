# memory.md

# AI Development Memory

## Project Name

TaskFlow Pro – Team & Task Management Platform

Version: 1.0

Purpose:
This file acts as the persistent memory and development context for Antigravity AI. It defines everything the AI should continuously remember throughout development to ensure consistency, maintainability, and production-quality implementation.

---

# Project Identity

Project Name

TaskFlow Pro

Type

Production Ready SaaS Application

Category

Task & Team Management Platform

Target Users

Individuals

Teams

Developers

Project Managers

Startup Teams

Small Businesses

---

# Development Goal

Always build this application as if it is a real commercial SaaS product.

Never treat this as an internship assignment.

Every feature should be scalable.

Every component should be reusable.

Every API should be production-ready.

Every UI should be polished.

---

# Primary Objective

Deliver a fully functional, secure, responsive, scalable, and deployment-ready full-stack application with excellent code quality and user experience.

---

# Tech Stack Memory

## Frontend

React 18

Vite

React Router DOM

Redux Toolkit

Axios

Tailwind CSS

React Hook Form

React Hot Toast

Recharts

React Beautiful DnD

Lucide React

Framer Motion

---

## Backend

Node.js

Express.js

JWT

bcrypt

Mongoose

Express Validator

Helmet

Morgan

CORS

Multer

Cloudinary

Dotenv

---

## Database

MongoDB Atlas

---

## Deployment

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

Media

Cloudinary

---

# Architecture Memory

Always remember

React

↓

Redux Toolkit

↓

Axios

↓

Express API

↓

Controller

↓

Service

↓

Model

↓

MongoDB Atlas

Never violate this architecture.

---

# Folder Structure Memory

Frontend

```
src/

assets/

components/

layouts/

pages/

hooks/

routes/

services/

store/

styles/

utils/

constants/
```

Backend

```
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

Never change the folder structure unless absolutely necessary.

---

# State Management Memory

Always use Redux Toolkit.

Create slices

- authSlice
- taskSlice
- themeSlice
- uiSlice
- notificationSlice

Never use Context API for global state.

---

# API Memory

Every API

Must return

```json
{
  "success": true,
  "message": "",
  "data": {},
  "error": null
}
```

Never return inconsistent responses.

---

# Authentication Memory

Always implement

- Register
- Login
- Logout
- Remember Me
- JWT Authentication
- Protected Routes

Passwords

Always hash using bcrypt.

Never expose passwords.

Never expose JWT Secret.

---

# Database Memory

Collections

Users

Tasks

Relationships

One User

↓

Many Tasks

Always use timestamps.

Always validate schema.

---

# UI Memory

Application Style

Modern

Minimal

Professional

Enterprise Dashboard

Rounded Corners

Soft Shadows

Responsive

Clean Typography

Consistent Colors

Support both

Light Theme

Dark Theme

---

# Dashboard Memory

Dashboard must always include

- Sidebar
- Navbar
- Statistics Cards
- Charts
- Recent Tasks
- Upcoming Tasks
- Activity Feed
- Quick Actions
- User Profile Summary

Statistics

- Total Tasks
- Pending
- Completed
- In Progress
- Overdue
- High Priority

---

# Task Module Memory

Task fields

- Title
- Description
- Priority
- Status
- Due Date
- Assigned User
- Tags
- Attachment
- Created By
- Created At
- Updated At

Always support

Create

Read

Update

Delete

Search

Filter

Sort

Pagination

Drag & Drop

---

# Performance Memory

Always optimize.

Use

React.memo

useMemo

useCallback

Lazy Loading

Suspense

Pagination

Debounced Search

Code Splitting

Avoid unnecessary re-renders.

---

# Validation Memory

Frontend

React Hook Form

Backend

Express Validator

Validate

- Email
- Password
- Required Fields
- Duplicate Email
- JWT
- Future Dates
- Task Fields

Never trust frontend validation alone.

---

# Security Memory

Always enable

Helmet

JWT

bcrypt

CORS

Rate Limiting

Input Sanitization

Environment Variables

Prevent

- XSS
- NoSQL Injection
- Invalid JWT
- Unauthorized Access

---

# Component Memory

Every component should

- Be reusable.
- Be modular.
- Be responsive.
- Accept props.
- Handle loading state.
- Handle error state.
- Support dark mode.
- Avoid duplicated logic.

Never create large monolithic components.

---

# Code Style Memory

Use

camelCase

Variables

Functions

PascalCase

Components

UPPER_CASE

Environment Variables

Never abbreviate names.

Prefer descriptive names.

---

# UX Memory

Always provide

Loading State

Empty State

Error State

Success Feedback

Confirmation Dialogs

Responsive Layout

Smooth Animations

Accessible Forms

---

# Notification Memory

Use React Hot Toast.

Notify on

- Login
- Register
- Logout
- Task Created
- Task Updated
- Task Deleted
- Upload Success
- Validation Errors
- API Errors

---

# File Upload Memory

Use

Cloudinary

Support

- Images
- PDF
- Documents

Maximum Size

5 MB

Store only file URLs in MongoDB.

---

# Charts Memory

Use Recharts.

Include

- Pie Chart
- Bar Chart
- Line Chart

Charts should update automatically from live data.

---

# Error Handling Memory

Always handle

400

401

403

404

500

Network Errors

Database Errors

Validation Errors

Never expose stack traces to users.

---

# Responsive Design Memory

Support

Desktop

Laptop

Tablet

Mobile

No horizontal scrolling.

---

# Accessibility Memory

Always include

- Semantic HTML
- Keyboard navigation
- Visible focus states
- ARIA labels
- Proper color contrast

---

# Git Memory

Commit often.

Use meaningful commit messages.

Never commit

```
node_modules

.env

dist

build
```

---

# Documentation Memory

README must contain

- Project Overview
- Installation
- Features
- Folder Structure
- API Documentation
- Environment Variables
- Screenshots
- Deployment Steps
- Live URLs

---

# Development Memory

For every feature

Think

↓

Design

↓

Implement

↓

Validate

↓

Test

↓

Optimize

↓

Refactor

↓

Complete

Never generate partial implementations.

---

# Quality Checklist Memory

Before marking any feature complete, verify

- No console errors
- No TypeScript/ESLint warnings (if applicable)
- No unused imports
- No unused variables
- No duplicated code
- Responsive on all devices
- Accessible
- Secure
- Optimized
- Production-ready

---

# AI Behaviour Memory

Always behave as

- Senior Full Stack Engineer
- Senior React Developer
- Senior Node.js Developer
- Senior UI/UX Engineer
- Senior Software Architect

Always

- Follow `prd.md`
- Follow `architecture.md`
- Follow `rules.md`
- Follow `design.md`
- Follow `phases.md`

Never ignore any requirement from those documents.

If any feature is missing, implement it before proceeding.

Never choose the quickest solution over the correct architecture.

Always prioritize scalability, maintainability, security, and clean code.

---

# Final Persistent Memory

Remember throughout development:

- Build a premium SaaS application, not a demo.
- Every screen should feel polished and production-ready.
- Every API should be secure and well-structured.
- Every component should be reusable.
- Every feature should be fully implemented.
- Every interaction should provide clear feedback.
- Every page should be responsive and accessible.
- Every module should be easy to extend in the future.
- Never compromise code quality for speed.
- The final application should be impressive enough for technical interviews and portfolio demonstrations.