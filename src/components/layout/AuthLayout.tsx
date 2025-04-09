
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AuthLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // If still loading, show nothing or a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aces-blue"></div>
      </div>
    );
  }
  
  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-aces-blue/10 to-aces-purple/10 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-block bg-aces-blue text-white font-bold text-2xl rounded-md p-2 mb-2">ACES</div>
          <h1 className="text-2xl font-bold">Committee Portal</h1>
          <p className="text-muted-foreground mt-2">
            Centralized platform for managing all ACES activities
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
