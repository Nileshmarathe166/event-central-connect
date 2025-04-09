
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Search, Bell, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { announcements } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Announcement } from '@/types';

const Announcements: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const isAdmin = user?.role === 'admin';
  
  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            View all important announcements from the committee
          </p>
        </div>
        
        {isAdmin && (
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" /> New Announcement
          </Button>
        )}
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <AnnouncementItem key={announcement.id} announcement={announcement} />
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No announcements found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'There are no announcements at the moment'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const AnnouncementItem: React.FC<{ announcement: Announcement }> = ({ announcement }) => {
  const date = new Date(announcement.timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{announcement.title}</CardTitle>
            <CardDescription>
              Posted by {announcement.author} • {formattedDate} at {formattedTime} ({timeAgo})
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{announcement.message}</p>
      </CardContent>
    </Card>
  );
};

export default Announcements;
