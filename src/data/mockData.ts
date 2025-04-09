
import { Announcement, Budget, Event, User } from '@/types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@aces.edu',
    role: 'admin',
    photoURL: 'https://ui-avatars.com/api/?name=Admin+User&background=4361ee&color=fff',
    year: 'Staff',
    skills: ['Management', 'Planning', 'Leadership']
  },
  {
    id: '2',
    name: 'Student One',
    email: 'student1@aces.edu',
    role: 'student',
    photoURL: 'https://ui-avatars.com/api/?name=Student+One&background=3f37c9&color=fff',
    year: 'Junior',
    skills: ['Programming', 'Design', 'Communication']
  },
  {
    id: '3',
    name: 'Mary Johnson',
    email: 'mary@aces.edu',
    role: 'student',
    photoURL: 'https://ui-avatars.com/api/?name=Mary+Johnson&background=f72585&color=fff',
    year: 'Senior',
    skills: ['Event Planning', 'Marketing', 'Public Speaking']
  },
  {
    id: '4',
    name: 'James Smith',
    email: 'james@aces.edu',
    role: 'student',
    photoURL: 'https://ui-avatars.com/api/?name=James+Smith&background=4cc9f0&color=fff',
    year: 'Sophomore',
    skills: ['Graphic Design', 'Social Media', 'Video Editing']
  },
  {
    id: '5',
    name: 'Sarah Davis',
    email: 'sarah@aces.edu',
    role: 'admin',
    photoURL: 'https://ui-avatars.com/api/?name=Sarah+Davis&background=4361ee&color=fff',
    year: 'Staff',
    skills: ['Budget Management', 'Organization', 'Leadership']
  }
];

// Mock events
export const events: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Conference',
    date: '2025-05-15T10:00:00',
    description: 'Join us for the annual tech conference featuring speakers from top tech companies.',
    type: 'Conference',
    attendees: ['2', '3', '4'],
    location: 'Main Auditorium',
    organizer: 'Admin User'
  },
  {
    id: '2',
    title: 'Networking Mixer',
    date: '2025-04-20T18:00:00',
    description: 'Meet and connect with industry professionals and fellow students.',
    type: 'Networking',
    attendees: ['2', '4'],
    location: 'Student Center',
    organizer: 'Sarah Davis'
  },
  {
    id: '3',
    title: 'Programming Workshop',
    date: '2025-05-01T14:00:00',
    description: 'Learn the basics of web development in this hands-on workshop.',
    type: 'Workshop',
    attendees: ['2', '3'],
    location: 'Computer Lab 101',
    organizer: 'Admin User'
  },
  {
    id: '4',
    title: 'End of Year Celebration',
    date: '2025-06-10T19:00:00',
    description: 'Celebrate the end of the academic year with food, music, and awards.',
    type: 'Social',
    attendees: ['2', '3', '4', '5'],
    location: 'Campus Quad',
    organizer: 'Sarah Davis'
  }
];

// Mock announcements
export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'New Committee Members Needed',
    message: 'We are looking for new committee members to join the ACES team. If you are interested, please apply by May 1st.',
    timestamp: '2025-04-05T12:00:00',
    author: 'Admin User'
  },
  {
    id: '2',
    title: 'Important: Venue Change for Tech Conference',
    message: 'Due to renovations, the Annual Tech Conference will now be held in the Science Building Auditorium instead of the Main Auditorium.',
    timestamp: '2025-04-08T09:30:00',
    author: 'Sarah Davis'
  },
  {
    id: '3',
    title: 'Budget Request Deadline Extended',
    message: 'The deadline for submitting budget requests for the next semester has been extended to May 15th.',
    timestamp: '2025-04-10T15:45:00',
    author: 'Admin User'
  }
];

// Mock budgets and expenses
export const budgets: Budget[] = [
  {
    id: '1',
    eventId: '1',
    estimatedBudget: 5000,
    expenses: [
      {
        id: '1',
        budgetId: '1',
        title: 'Venue Rental',
        amount: 2000,
        date: '2025-04-01'
      },
      {
        id: '2',
        budgetId: '1',
        title: 'Catering',
        amount: 1500,
        date: '2025-04-05'
      },
      {
        id: '3',
        budgetId: '1',
        title: 'Speaker Gifts',
        amount: 500,
        date: '2025-04-10'
      }
    ]
  },
  {
    id: '2',
    eventId: '2',
    estimatedBudget: 1000,
    expenses: [
      {
        id: '4',
        budgetId: '2',
        title: 'Refreshments',
        amount: 400,
        date: '2025-04-15'
      },
      {
        id: '5',
        budgetId: '2',
        title: 'Name Tags',
        amount: 100,
        date: '2025-04-16'
      }
    ]
  },
  {
    id: '3',
    eventId: '3',
    estimatedBudget: 800,
    expenses: [
      {
        id: '6',
        budgetId: '3',
        title: 'Materials',
        amount: 300,
        date: '2025-04-20'
      },
      {
        id: '7',
        budgetId: '3',
        title: 'Instructor Fee',
        amount: 400,
        date: '2025-04-25'
      }
    ]
  },
  {
    id: '4',
    eventId: '4',
    estimatedBudget: 3000,
    expenses: [
      {
        id: '8',
        budgetId: '4',
        title: 'Decorations',
        amount: 500,
        date: '2025-05-01'
      },
      {
        id: '9',
        budgetId: '4',
        title: 'Food & Drinks',
        amount: 1500,
        date: '2025-05-05'
      },
      {
        id: '10',
        budgetId: '4',
        title: 'DJ Services',
        amount: 600,
        date: '2025-05-10'
      }
    ]
  }
];
