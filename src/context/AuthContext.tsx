
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'admin' | 'student') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const MOCK_USERS: User[] = [
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
    email: 'student@aces.edu',
    role: 'student',
    photoURL: 'https://ui-avatars.com/api/?name=Student+One&background=3f37c9&color=fff',
    year: 'Junior',
    skills: ['Programming', 'Design', 'Communication']
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('aces_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser) {
      localStorage.setItem('aces_user', JSON.stringify(foundUser));
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string, role: 'admin' | 'student') => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role,
      photoURL: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=4361ee&color=fff`,
    };
    
    // In a real app, you would save this to a database
    // For now, we'll just set it in state and localStorage
    localStorage.setItem('aces_user', JSON.stringify(newUser));
    setUser(newUser);
    
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('aces_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
