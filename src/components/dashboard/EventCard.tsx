
import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EventCardProps {
  event: Event;
  userRegistered?: boolean;
  onRegister?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  userRegistered = false, 
  onRegister 
}) => {
  const { toast } = useToast();
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');
  
  const handleRegister = () => {
    if (onRegister) {
      onRegister(event.id);
      toast({
        title: 'Success!',
        description: `You have registered for ${event.title}`,
      });
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference':
        return 'bg-aces-blue text-white';
      case 'workshop':
        return 'bg-aces-purple text-white';
      case 'networking':
        return 'bg-aces-cyan text-white';
      case 'social':
        return 'bg-aces-pink text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const isPastEvent = eventDate < new Date();

  return (
    <Card className="animate-fade-in hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge className={getEventTypeColor(event.type)} variant="outline">
            {event.type}
          </Badge>
          {userRegistered && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Registered
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl mt-2">{event.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Organized by {event.organizer}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{event.description}</p>
        <div className="text-sm flex items-center text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDate} at {formattedTime}</span>
        </div>
        {event.location && (
          <div className="text-sm flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        )}
        <div className="text-sm flex items-center text-muted-foreground">
          <Users className="h-4 w-4 mr-2" />
          <span>{event.attendees.length} attendees</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleRegister}
          disabled={userRegistered || isPastEvent}
          variant={userRegistered ? "outline" : "default"}
          className="w-full"
        >
          {isPastEvent ? 'Event Ended' : userRegistered ? 'Already Registered' : 'Register Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
