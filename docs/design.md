# design.md

# UI / UX Design System

## Project Name

TaskFlow Pro – Team & Task Management Platform

Version: 1.0

Design Philosophy:
Modern • Clean • Minimal • Professional • SaaS • Enterprise Grade

---

# 1. Design Goals

The application should look like a modern SaaS product similar to:

- ClickUp
- Jira
- Linear
- Notion
- Trello
- Monday.com
- Asana

The interface should feel premium, intuitive, and production-ready.

Design Principles:

- Minimal
- Spacious
- Consistent
- Accessible
- Fast
- Responsive
- Modern

---

# 2. Overall Theme

Theme

Professional SaaS Dashboard

Style

Minimal

Rounded corners

Soft shadows

Subtle animations

Glass-like cards (optional)

No unnecessary gradients

No flashy colors

---

# 3. Color Palette

## Light Theme

Primary

```
#2563EB
```

Primary Hover

```
#1D4ED8
```

Primary Light

```
#DBEAFE
```

Background

```
#F8FAFC
```

Card

```
#FFFFFF
```

Sidebar

```
#FFFFFF
```

Navbar

```
#FFFFFF
```

Border

```
#E5E7EB
```

Text Primary

```
#111827
```

Text Secondary

```
#6B7280
```

---

## Status Colors

Success

```
#10B981
```

Warning

```
#F59E0B
```

Danger

```
#EF4444
```

Info

```
#3B82F6
```

Purple

```
#8B5CF6
```

---

## Priority Colors

Low

Green

Medium

Blue

High

Orange

Critical

Red

---

# 4. Dark Theme

Background

```
#0F172A
```

Card

```
#1E293B
```

Sidebar

```
#111827
```

Navbar

```
#111827
```

Border

```
#334155
```

Primary Text

White

Secondary Text

Gray 400

Primary Button

Blue 600

---

# 5. Typography

Font

Inter

Fallback

sans-serif

Hierarchy

H1

36px

Bold

---

H2

30px

Bold

---

H3

24px

Semi Bold

---

H4

20px

Medium

---

Body

16px

Regular

---

Small

14px

---

Caption

12px

---

Buttons

16px

Medium

---

# 6. Border Radius

Cards

16px

Buttons

10px

Inputs

10px

Tables

12px

Modals

20px

Badges

999px

---

# 7. Shadows

Cards

```
shadow-md
```

Dropdown

```
shadow-lg
```

Modal

```
shadow-xl
```

Hover

Increase elevation slightly.

---

# 8. Layout

Desktop

```
Sidebar

Navbar

Main Content
```

Mobile

```
Drawer Sidebar

Navbar

Content
```

---

# 9. Sidebar

Width

280px

Collapsed

80px

Contents

Logo

Dashboard

Tasks

Analytics

Profile

Settings

Logout

Bottom

User Card

Smooth animation

---

# 10. Navbar

Height

72px

Contains

Search

Notifications

Theme Toggle

Avatar

Profile Menu

---

# 11. Login Page

Center aligned card

Includes

Logo

Welcome Text

Email

Password

Remember Me

Forgot Password

Login Button

Divider

Register Link

Background

Subtle illustration or pattern

---

# 12. Register Page

Fields

Name

Email

Password

Confirm Password

Create Account

Already have account

---

# 13. Dashboard

Sections

Welcome Banner

Statistics Cards

Charts

Recent Tasks

Upcoming Deadlines

Activity Feed

Quick Actions

Profile Summary

---

# 14. Statistics Cards

Cards

- Total Tasks
- Pending
- Completed
- In Progress
- Overdue
- Critical

Each card contains

Icon

Title

Value

Trend

Hover animation

---

# 15. Task Page

Toolbar

Search

Filters

Sort

Add Task Button

Task Display

Grid View

Table View

Pagination

---

# 16. Task Card

Display

Title

Priority Badge

Status Badge

Due Date

Assigned User

Tags

Quick Actions

Hover

Scale slightly

Shadow increase

---

# 17. Create Task Modal

Fields

Title

Description

Priority

Status

Assigned User

Due Date

Tags

Attachment

Buttons

Cancel

Save

---

# 18. Task Details Page

Large title

Description

Timeline

Assigned User

Attachment

Comments (future)

History

Edit

Delete

---

# 19. Analytics Page

Cards

Charts

Pie Chart

Bar Chart

Line Chart

Progress Ring

Statistics

Filter

Date Range

Export Button

---

# 20. Profile Page

Avatar

User Details

Statistics

Completed Tasks

Recent Activity

Change Password

Update Profile

---

# 21. Settings Page

Appearance

Notifications

Security

Theme

Account

Danger Zone

---

# 22. Tables

Rounded corners

Sticky header

Hover rows

Pagination

Responsive

Columns

Title

Priority

Status

Due Date

Assigned User

Actions

---

# 23. Forms

Spacing

24px

Labels above fields

Validation messages below

Required indicator

Placeholder text

---

# 24. Buttons

Primary

Blue

Secondary

Gray

Danger

Red

Success

Green

Ghost

Transparent

Sizes

Small

Medium

Large

Loading state required

Disabled state required

---

# 25. Inputs

Rounded

Focus Ring

Placeholder

Error Border

Success Border

Icons supported

---

# 26. Search Bar

Rounded

Search Icon

Clear Button

Debounced Search

---

# 27. Badges

Rounded Pill

Priority

Status

Tags

Colors

Dynamic

---

# 28. Notifications

Toast Position

Top Right

Types

Success

Error

Warning

Info

Auto close

---

# 29. Loading States

Skeleton Loader

Cards

Tables

Charts

Buttons

Forms

---

# 30. Empty States

Illustration

Title

Description

CTA Button

Examples

"No Tasks Found"

"No Analytics Available"

---

# 31. Error States

Friendly Message

Retry Button

Error Illustration

---

# 32. Charts

Library

Recharts

Style

Rounded

Minimal

Animated

Responsive

Charts

Pie

Bar

Line

Area

---

# 33. Drag & Drop

Visual Indicators

Drop Zones

Animations

Smooth transitions

Status updates instantly

---

# 34. File Upload

Drag & Drop Area

Upload Button

Preview

Progress Bar

Remove File

Supported

Images

PDF

Documents

---

# 35. Animations

Use Framer Motion

Animations

Fade

Slide

Scale

Page Transition

Card Hover

Modal

Sidebar

Dropdown

Duration

150–300ms

Avoid excessive animation

---

# 36. Responsive Design

Desktop

1440px+

Laptop

1024px+

Tablet

768px+

Mobile

480px+

No horizontal scrolling

---

# 37. Accessibility

Keyboard navigation

Visible focus states

ARIA labels

Semantic HTML

Proper color contrast

Accessible forms

---

# 38. Icons

Library

Lucide React

Use consistent icon style

Examples

Dashboard

Task

Analytics

Profile

Settings

Logout

Search

Bell

Calendar

Upload

Delete

Edit

---

# 39. Spacing System

4px Grid System

Spacing Scale

4

8

12

16

20

24

32

40

48

64

Consistent spacing throughout the application

---

# 40. Component Design Rules

Every component should:

- Be reusable.
- Accept configurable props.
- Support loading and disabled states.
- Handle error states gracefully.
- Follow consistent spacing, colors, and typography.
- Support both light and dark themes.
- Be responsive by default.
- Use Tailwind utility classes only (avoid inline styles).

---

# 41. UI/UX Best Practices

- Prioritize clarity over complexity.
- Keep interactions predictable.
- Provide immediate feedback for user actions.
- Minimize clicks for common tasks.
- Use confirmation dialogs for destructive actions.
- Preserve user state during navigation.
- Maintain visual consistency across all pages.
- Optimize for both mouse and keyboard users.

---

# Final Instructions for Antigravity

You are designing a premium SaaS application, not a college assignment.

Every screen should be polished, responsive, accessible, and visually consistent.

Maintain the same design language across the entire application.

Avoid unnecessary complexity, but ensure the UI feels modern, elegant, and production-ready.

The final result should resemble a professional product that could be showcased in a portfolio or presented during a technical interview.