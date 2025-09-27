import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Users, IndianRupee, BookOpen, Sparkles, Flower } from "lucide-react";
import floralCalendar from "@/assets/FlowerCalender.jpg";
import api from '@/lib/api';
import { BookingModal } from "@/components/BookingModal";
import { Event } from "@/types/event";

// Custom Calendar Component
const CustomCalendar = ({
  selectedDate,
  onSelect,
  events,
  getEventsForDate,
  hasEvents
}: {
  selectedDate: Date | undefined;
  onSelect: (date: Date) => void;
  events: Event[];
  getEventsForDate: (date: Date) => Event[];
  hasEvents: (date: Date) => boolean;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    return { daysInMonth, startingDay, year, month };
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentDate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create empty cells for days before the first day of the month
  const emptyCells = Array.from({ length: startingDay }, (_, i) => (
    <div key={`empty-${i}`} className="h-24 p-1 border border-transparent"></div>
  ));

  // Create cells for each day of the month
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(year, month, day);
    const isSelected = selectedDate && 
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
    
    const isToday = new Date().toDateString() === date.toDateString();
    const dateEvents = getEventsForDate(date);
    const hasEvent = hasEvents(date);

    return (
      <div
        key={day}
        className={`h-24  p-2 border rounded-lg cursor-pointer transition-all duration-200 ${
          isSelected
            ? "bg-primary text-primary-foreground border-primary shadow-lg transform scale-105"
            : isToday
            ? "bg-secondary border-primary/50 shadow-md"
            : hasEvent
            ? "bg-primary/10 border-primary/30 hover:bg-primary/20"
            : "bg-card border-border hover:bg-accent/50"
        }`}
        onClick={() => onSelect(date)}
      >
        <div className="flex justify-between items-start">
          <span className={`text-lg font-bold ${
            isSelected ? "text-primary-foreground" : 
            isToday ? "text-primary" : "text-foreground"
          }`}>
            {day}
          </span>
          {isToday && (
            <Badge variant="secondary" className="text-xs bg-green-500 text-white">
              Today
            </Badge>
          )}
        </div>
        
        {dateEvents.length > 0 && (
          <div className="mt-1 space-y-1">
            {dateEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`text-xs p-1 rounded ${
                  isSelected 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-primary/20 text-primary"
                }`}
              >
                • {event.event_type}
              </div>
            ))}
            {dateEvents.length > 2 && (
              <div className={`text-xs ${
                isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                +{dateEvents.length - 2} more
              </div>
            )}
          </div>
        )}
      </div>
    );
  });

  const allCells = [...emptyCells, ...dayCells];

  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousMonth}
          className="h-10 w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          {monthNames[month]} {year}
        </h2>
        
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextMonth}
          className="h-10 w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-semibold text-lg py-2 text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {allCells}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span>Selected Date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary/20 rounded"></div>
          <span>Has Events</span>
        </div>
      </div>
    </div>
  );
};

const CalendarPage = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  const handleNavigation = (section: string) => {
    // Handle navigation within calendar page if needed
  };

  const toggleDescription = (eventId: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/get/events');
        setEvents(response.data);
        console.log('Fetched events:', response.data);
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
      case "workshop":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const hasEvents = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.some(event => new Date(event.event_date).toISOString().split('T')[0] === dateString);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // Function to truncate description for preview
  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (!description) return "No description available";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  const isUpcomingEvent = (eventDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const eventDateObj = new Date(eventDate);
    eventDateObj.setHours(0, 0, 0, 0);
    
    return eventDateObj >= today;
  };

  const upcomingEvents = events.filter(event => isUpcomingEvent(event.event_date));

  const isBookableEvent = (eventDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDateObj = new Date(eventDate);
    eventDateObj.setHours(0, 0, 0, 0);

    return eventDateObj >= today;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowAdmin(true)} onNavigate={handleNavigation} />
      
      <main className="pt-25">
        {/* Page Header with Image on Right and Content on Left */}
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-3 rounded-full mb-6 border border-pink-200">
                  <Sparkles className="h-5 w-5 text-pink-600" />
                  <span className="text-pink-700 font-semibold">Event Calendar</span>
                </div>
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-playfair">
                  <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Floral Events Calendar
                  </span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Discover our comprehensive schedule of floral workshops, classes, and special events. 
                  Plan your floral journey with our interactive calendar and never miss an opportunity 
                  to learn and create with flowers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Flower className="h-4 w-4 text-pink-500" />
                    <span>Professional Flower Classes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 text-green-500" />
                    <span>Workshops & Events</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>Expert Instructors</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img 
                    src={floralCalendar} 
                    alt="Floral calendar with weekly schedule"
                    className="w-full h-70 lg:h-90 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CALENDAR SECTION */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              
              {/* BIG Custom Calendar - Takes 2 columns */}
              <div className="lg:col-span-2">
                <CustomCalendar
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                  events={events}
                  getEventsForDate={getEventsForDate}
                  hasEvents={hasEvents}
                />
              </div>

              {/* Events for Selected Date */}
              <div>
                <Card className="shadow-2xl rounded-2xl border-0 h-full">
                  <CardHeader className="pb-4 pt-6">
                    <CardTitle className="flex items-center gap-2 text-xl md:text-2xl font-bold">
                      <CalendarDays className="h-6 w-6 text-primary" />
                      Events on {selectedDate?.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {!selectedDate ? (
                      <div className="text-center py-8">
                        <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground text-lg">
                          Select a date to view events
                        </p>
                      </div>
                    ) : getEventsForDate(selectedDate).length === 0 ? (
                      <div className="text-center py-8">
                        <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <p className="text-muted-foreground text-lg">
                          No events scheduled for this date
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {getEventsForDate(selectedDate).map((event) => {
                          const isUpcoming = isUpcomingEvent(event.event_date);
                          return (
                            <div
                              key={event.id}
                              className={`p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-md ${
                                !isUpcoming 
                                  ? 'bg-muted/30 border-muted opacity-70' 
                                  : 'bg-card border-border hover:border-primary/30'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-base leading-tight">{event.title}</h4>
                                <Badge className={`text-sm ${getEventTypeColor(event.event_type)} ${
                                  !isUpcoming ? 'opacity-70' : ''
                                }`}>
                                  {event.event_type}
                                  {!isUpcoming && ' (Past)'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground font-medium">
                                ⏰ {event.event_time}
                              </p>
                              {event.description && (
                                <p className="text-xs text-foreground mt-2 line-clamp-2">
                                  {truncateDescription(event.description, 80)}
                                </p>
                              )}
                              {isBookableEvent(event.event_date) && (
                                <Button 
                                  size="sm"
                                  className="w-full mt-3"
                                  onClick={() => {
                                    setSelectedEvent(event);
                                    setIsBookingModalOpen(true);
                                  }}
                                >
                                  Book Now
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
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
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No upcoming events scheduled</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Check back later for new events and classes!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <Card 
                    key={event.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow hover-scale animate-fade-in flex flex-col h-full"
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
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-green-500 text-white">
                            Upcoming
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="line-clamp-2 text-lg">{event.title}</CardTitle>
                        {!event.image && (
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getEventTypeColor(event.event_type)}>
                              {event.event_type}
                            </Badge>
                            <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                              Upcoming
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      {/* Event Description */}
                      {event.description && (
                        <div className="mt-3">
                          <div className="flex items-center gap-1 mb-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Description</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {expandedDescriptions.has(event.id) ? (
                              <div>
                                <p>{event.description}</p>
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto text-xs mt-1"
                                  onClick={() => toggleDescription(event.id)}
                                >
                                  Show less
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <p>{truncateDescription(event.description)}</p>
                                {event.description.length > 100 && (
                                  <Button 
                                    variant="link" 
                                    className="p-0 h-auto text-xs mt-1"
                                    onClick={() => toggleDescription(event.id)}
                                  >
                                    Read more
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    
                    <CardContent className="flex-grow-0">
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
                            <Users className="h-4 w-4 text-primary" />
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
                            <IndianRupee className="h-4 w-4 text-primary" />
                            <span>₹{event.amount}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Show Book Now button only for upcoming class events */}
                      {isBookableEvent(event.event_date) && (
                        <Button 
                          className="w-full mt-4"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsBookingModalOpen(true);
                          }}
                        >
                          Book Now
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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