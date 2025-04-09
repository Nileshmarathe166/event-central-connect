
import React from 'react';
import { Calendar, Users, Bell, DollarSign } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/dashboard/StatCard';
import AnnouncementCard from '@/components/dashboard/AnnouncementCard';
import EventCard from '@/components/dashboard/EventCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { events, announcements, users } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  const upcomingEvents = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
    
  const latestAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);
  
  return (
    <div>
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Committee Members" 
          value={users.filter(u => u.role === 'admin').length}
          icon={Users}
        />
        <StatCard 
          title="Student Members" 
          value={users.filter(u => u.role === 'student').length}
          icon={Users}
        />
        <StatCard 
          title="Upcoming Events" 
          value={events.filter(e => new Date(e.date) > new Date()).length}
          icon={Calendar}
        />
        <StatCard 
          title="Budget Utilized" 
          value="$6,400"
          description="of $9,800 total budget"
          icon={DollarSign}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Events</CardTitle>
              <CardDescription>Register and attend these upcoming events</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    userRegistered={user ? event.attendees.includes(user.id) : false}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No upcoming events at the moment.</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="text-xl">Latest Announcements</CardTitle>
                <CardDescription>Important updates from committee</CardDescription>
              </div>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              {latestAnnouncements.map(announcement => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a 
                href="/members" 
                className="block p-3 rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-medium">Member Directory</div>
                <div className="text-sm text-muted-foreground">View all committee and student members</div>
              </a>
              <a 
                href="/events" 
                className="block p-3 rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-medium">All Events</div>
                <div className="text-sm text-muted-foreground">Browse and register for all events</div>
              </a>
              <a 
                href="/announcements" 
                className="block p-3 rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-medium">Announcements Archive</div>
                <div className="text-sm text-muted-foreground">View all past announcements</div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
