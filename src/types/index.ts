
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  year?: string;
  skills?: string[];
  photoURL?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
  attendees: string[];
  location?: string;
  organizer?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  author: string;
}

export interface Budget {
  id: string;
  eventId: string;
  estimatedBudget: number;
  expenses: Expense[];
}

export interface Expense {
  id: string;
  budgetId: string;
  title: string;
  amount: number;
  date: string;
}
