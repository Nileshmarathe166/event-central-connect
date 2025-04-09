
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  Bell, 
  DollarSign, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  roles?: Array<'admin' | 'student'>;
}

const menuItems: SidebarItemProps[] = [
  { icon: Home, title: 'Dashboard', path: '/dashboard' },
  { icon: Users, title: 'Members', path: '/members' },
  { icon: Calendar, title: 'Events', path: '/events' },
  { icon: Bell, title: 'Announcements', path: '/announcements' },
  { icon: DollarSign, title: 'Budget', path: '/budget', roles: ['admin'] },
  { icon: Settings, title: 'Settings', path: '/settings' },
];

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter items based on user role
  const filteredItems = user ? menuItems.filter(item => {
    // If no roles specified, show to all users
    if (!item.roles) return true;
    // Otherwise, only show if user's role is included
    return item.roles.includes(user.role);
  }) : [];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-aces-blue text-white font-bold rounded-md p-1.5">ACES</div>
          <h1 className="text-lg font-bold">Committee Portal</h1>
        </div>
        <SidebarTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    data-active={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {user && (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3 p-2 rounded-md bg-muted/50">
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}`} 
                alt={user.name} 
                className="h-10 w-10 rounded-full" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
