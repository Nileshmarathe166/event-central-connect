
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Announcement } from '@/types';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const timeAgo = formatDistanceToNow(new Date(announcement.timestamp), { addSuffix: true });

  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{announcement.title}</CardTitle>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        <CardDescription>Posted by {announcement.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{announcement.message}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
