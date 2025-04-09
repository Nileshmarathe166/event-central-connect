
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, CalendarIcon, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from '@/components/dashboard/EventCard';
import { events } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { Event } from '@/types';

const Events: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(
    events
      .filter(event => user && event.attendees.includes(user.id))
      .map(event => event.id)
  );
  
  const handleRegister = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };
  
  const currentDate = new Date();
  
  const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
  const pastEvents = events.filter(event => new Date(event.date) <= currentDate);
  
  const filterEvents = (eventsList: Event[]) => {
    return eventsList.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = eventType === 'all' || event.type.toLowerCase() === eventType.toLowerCase();
      
      return matchesSearch && matchesType;
    });
  };
  
  const filteredUpcomingEvents = filterEvents(upcomingEvents);
  const filteredPastEvents = filterEvents(pastEvents);
  const filteredRegisteredEvents = filterEvents(events.filter(event => registeredEvents.includes(event.id)));
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-muted-foreground mt-1">
          Browse, register, and manage all ACES events
        </p>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex">
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="networking">Networking</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({filteredUpcomingEvents.length})</TabsTrigger>
          <TabsTrigger value="registered">Registered ({filteredRegisteredEvents.length})</TabsTrigger>
          <TabsTrigger value="past">Past Events ({filteredPastEvents.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-6">
          {filteredUpcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcomingEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  userRegistered={registeredEvents.includes(event.id)}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No upcoming events found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm || eventType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Check back later for new events'}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="registered" className="space-y-6">
          {filteredRegisteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRegisteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  userRegistered={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No registered events</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't registered for any events yet
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-6">
          {filteredPastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPastEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  userRegistered={registeredEvents.includes(event.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No past events found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm || eventType !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'There are no past events in the system'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
