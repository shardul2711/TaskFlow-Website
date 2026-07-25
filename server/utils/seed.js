import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Task from '../models/Task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing Users and Tasks.');

    // Create 3 users (Password: Pass@1234)
    const usersData = [
      {
        name: 'Alex Rivera',
        email: 'alex@taskflow.com',
        password: 'Password@123',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      },
      {
        name: 'Sarah Connor',
        email: 'sarah@taskflow.com',
        password: 'Password@123',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      },
      {
        name: 'John Doe',
        email: 'john@taskflow.com',
        password: 'Password@123',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      },
    ];

    const users = [];
    for (const u of usersData) {
      const user = await User.create(u);
      users.push(user);
    }
    console.log(`Created ${users.length} sample users.`);

    const user1 = users[0]._id;
    const user2 = users[1]._id;
    const user3 = users[2]._id;

    // Create tasks
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    // Month offsets for monthly productivity (Line Chart)
    const getPastDate = (monthsAgo, dayOfMonth) => {
      const d = new Date();
      d.setMonth(d.getMonth() - monthsAgo);
      d.setDate(dayOfMonth);
      return d;
    };

    const tasksData = [
      {
        title: 'Design Dashboard Mockups',
        description: 'Create high fidelity Figma designs for the SaaS dashboard view, including light and dark mode states.',
        priority: 'high',
        status: 'completed',
        assignedTo: user1,
        createdBy: user1,
        dueDate: getPastDate(0, 10),
        tags: ['design', 'ui-ux'],
        createdAt: getPastDate(2, 5),
        updatedAt: getPastDate(2, 5),
      },
      {
        title: 'Setup Express Boilerplate',
        description: 'Initialize the Express repository, configure Helmet, CORS, Morgan, Mongoose, and standard error handling.',
        priority: 'critical',
        status: 'completed',
        assignedTo: user2,
        createdBy: user1,
        dueDate: getPastDate(0, 12),
        tags: ['backend', 'setup'],
        createdAt: getPastDate(1, 10),
        updatedAt: getPastDate(1, 11),
      },
      {
        title: 'Implement JWT Auth API',
        description: 'Write register, login, logout, and token refresh logic using bcryptjs and jsonwebtoken packages.',
        priority: 'critical',
        status: 'completed',
        assignedTo: user1,
        createdBy: user2,
        dueDate: getPastDate(0, 15),
        tags: ['backend', 'security'],
        createdAt: getPastDate(1, 12),
        updatedAt: getPastDate(0, 2),
      },
      {
        title: 'Integrate Cloudinary Upload',
        description: 'Connect multer middleware to Cloudinary upload streams for secure file upload of attachments up to 5MB.',
        priority: 'medium',
        status: 'in progress',
        assignedTo: user3,
        createdBy: user1,
        dueDate: tomorrow,
        tags: ['backend', 'media'],
        createdAt: getPastDate(0, 20),
        updatedAt: getPastDate(0, 24),
      },
      {
        title: 'Build Sidebar Layout',
        description: 'Develop responsive, collapsible Navigation Sidebar using Framer Motion and Lucide React icons.',
        priority: 'low',
        status: 'in progress',
        assignedTo: user1,
        createdBy: user3,
        dueDate: tomorrow,
        tags: ['frontend', 'layout'],
        createdAt: getPastDate(0, 21),
        updatedAt: getPastDate(0, 24),
      },
      {
        title: 'Write API Walkthrough Docs',
        description: 'Document all REST endpoints, parameter payloads, authorization headers, and seed instructions.',
        priority: 'low',
        status: 'pending',
        assignedTo: user2,
        createdBy: user1,
        dueDate: nextWeek,
        tags: ['docs', 'refactor'],
      },
      {
        title: 'Configure Redux Store Slices',
        description: 'Create auth, task, theme, ui, and notification slices using Redux Toolkit and hook up localStorage syncing.',
        priority: 'medium',
        status: 'pending',
        assignedTo: user3,
        createdBy: user2,
        dueDate: nextWeek,
        tags: ['frontend', 'redux'],
      },
      {
        title: 'Fix React Beautiful DnD Warnings',
        description: 'Investigate StrictMode console alerts during drag and drop card moves and apply workaround.',
        priority: 'medium',
        status: 'pending',
        assignedTo: user1,
        createdBy: user1,
        dueDate: yesterday, // Overdue task!
        tags: ['frontend', 'drag-drop'],
      },
      {
        title: 'Optimize Recharts Rendering',
        description: 'Use useMemo and React.memo to prevent unwanted redraws on the dashboard analytics page.',
        priority: 'high',
        status: 'completed',
        assignedTo: user1,
        createdBy: user1,
        dueDate: getPastDate(0, 5),
        tags: ['frontend', 'performance'],
        createdAt: getPastDate(0, 4),
        updatedAt: getPastDate(0, 5),
      },
      {
        title: 'Dockerize Platform Stack',
        description: 'Compose Dockerfile and docker-compose configurations to orchestrate client, server, and local DB testing.',
        priority: 'critical',
        status: 'cancelled',
        assignedTo: user2,
        createdBy: user2,
        dueDate: tomorrow,
        tags: ['devops', 'deployment'],
      },
    ];

    for (const t of tasksData) {
      const task = new Task(t);
      if (t.createdAt) task.createdAt = t.createdAt;
      if (t.updatedAt) task.updatedAt = t.updatedAt;
      await task.save();
    }

    console.log('Successfully seeded tasks with various states.');
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
