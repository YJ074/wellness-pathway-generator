
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { getStoredEvents, clearTrackingData } from '@/utils/tracking';

type TrackingEvent = {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
};

const TrackingDashboard = () => {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Load events from storage
    const loadEvents = () => {
      const storedEvents = getStoredEvents();
      setEvents(storedEvents);
    };

    loadEvents();
    // Refresh events every 5 seconds to capture new ones
    const interval = setInterval(loadEvents, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all tracking data?')) {
      clearTrackingData();
      setEvents([]);
    }
  };

  // Get unique categories for filtering
  const categories = ['all', ...Array.from(new Set(events.map(e => e.category)))];
  
  // Filter events based on selected category
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Interactions Tracking</CardTitle>
        <div className="flex gap-2">
          <select 
            className="px-2 py-1 border rounded-md" 
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <Button variant="destructive" size="sm" onClick={handleClearData}>
            Clear Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {filteredEvents.length} events recorded
        </div>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-slate-50 rounded-md border flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {event.category}: {event.action}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  {event.label && (
                    <div className="text-sm">{event.label}</div>
                  )}
                  {event.value !== undefined && (
                    <div className="text-sm">Value: {event.value}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No events recorded yet
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TrackingDashboard;
