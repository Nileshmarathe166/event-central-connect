
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const currentTime = new Date();
  const hours = currentTime.getHours();
  
  let greeting = 'Good morning';
  if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
  } else if (hours >= 17 || hours < 5) {
    greeting = 'Good evening';
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">{greeting}, {user?.name.split(' ')[0]}!</h1>
      <p className="text-muted-foreground mt-1">
        Here's an overview of all the ACES activities
      </p>
    </div>
  );
};

export default DashboardHeader;
