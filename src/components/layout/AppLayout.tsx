
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { useAuth } from '@/context/AuthContext';

const AppLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  // If still loading, show nothing or a loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-aces-blue"></div>
      </div>
    );
  }
  
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen bg-background overflow-y-auto">
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
          <footer className="p-4 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ACES Committee Portal
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
