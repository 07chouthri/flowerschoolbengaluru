import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Users, MapPin, IndianRupee  } from "lucide-react";
import floralCalendar from "@/assets/floral-calendar.jpg";
import api from '@/lib/api';
import { BookingModal } from "@/components/BookingModal";
import { Event } from "@/types/event";





const CalendarPage = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleNavigation = (section: string) => {
    // Handle navigation within calendar page if needed
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/get/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => new Date(event.event_date).toISOString().split('T')[0] === dateString);
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "class":
        return "bg-primary text-primary-foreground";
      case "delivery":
        return "bg-secondary text-secondary-foreground";
      case "event":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const hasEvents = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.some(event => new Date(event.event_date).toISOString().split('T')[0] === dateString);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowAdmin(true)} onNavigate={handleNavigation} />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-scale-in">
                Calendar & Events
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay updated with our flower classes, special events, and delivery schedules
              </p>
            </div>
            
            {/* Featured Calendar Image */}
            <div className="mt-12 max-w-4xl mx-auto">
              <img 
                src={floralCalendar} 
                alt="Floral calendar with weekly schedule"
                className="w-full h-64 object-cover rounded-lg shadow-lg hover-scale animate-fade-in"
              />
            </div>
          </div>
        </section>
        {/* Calendar Section - Made Responsive */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Calendar Widget - Responsive */}
              <div className="lg:col-span-2">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                      <CalendarDays className="h-6 w-6" />
                      Select a Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-8">
                    <div className="max-w-[900px] mx-auto">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border-2 shadow-xl w-full mx-auto transform scale-110 md:scale-125 lg:scale-130"
                        modifiers={{
                          hasEvents: (date) => hasEvents(date)
                        }}
                        modifiersStyles={{
                          hasEvents: {
                            backgroundColor: 'hsl(var(--primary)/0.1)',
                            color: 'hsl(var(--primary))',
                            fontWeight: 'bold'
                          }
                        }}
                        components={{
                          DayContent: ({ date }) => {
                            const dateEvents = getEventsForDate(date);
                            return (
                              <div className="relative min-h-[40px] p-1">
                                <div className="text-base font-medium">{date.getDate()}</div>
                                {dateEvents.length > 0 && (
                                  <div className="text-[10px] leading-tight text-primary font-medium mt-1">
                                    {dateEvents.length > 1 ? 
                                      `${dateEvents.length} Events` : '1 Event'
                                    }
                                  </div>
                                )}
                              </div>
                            );
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 6).map((event, index) => (
                <Card 
                  key={event.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {event.image && (
                    <div className="relative w-full h-48">
                      <img
                        src={`data:image/jpeg;base64,${event.image}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={getEventTypeColor(event.event_type)}>
                          {event.event_type}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                      {!event.image && (
                        <Badge className={getEventTypeColor(event.event_type)}>
                          {event.event_type}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>{new Date(event.event_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.event_time}</span>
                        {event.duration && <span>({event.duration.hours} hours)</span>}
                      </div>
                      {event.instructor && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>Instructor: {event.instructor}</span>
                        </div>
                      )}
                      {event.spots_left !== undefined && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{event.spots_left} spots left</span>
                        </div>
                      )}
                        {event.amount !== undefined && (
                        <div className="flex items-center gap-2">
                          <IndianRupee  className="h-4 w-4 text-primary" />
                          <span>{event.amount}</span>
                        </div>
                      )}
                    </div>
                    
                    {event.event_type.toLowerCase() === "class" && (
                      <Button 
                        className="w-full mt-4"
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsBookingModalOpen(true);
                        }}
                      >
                        {event.booking_available && event.spots_left && event.spots_left > 0 ? "Book Now" : "Join Waitlist"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Booking Modal */}
      {selectedEvent && (
        <BookingModal
          event={selectedEvent}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default CalendarPage;