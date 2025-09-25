import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClassesPrograms from "@/components/ClassesPrograms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin, Star } from "lucide-react";
import flowerArrangementClass from "@/assets/flower-arrangement-class.jpg";
import advancedFloralDesign from "@/assets/advanced-floral-design.jpg";
import api, { endpoints } from '@/lib/api';
import { EnrollmentDialog } from '@/components/EnrollmentDialog';

interface Feature {
  topic: string;
}

interface FlowerClass {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  sessions: number;
  features: Feature[];
  popular: boolean;
  nextbatch: string;
  created_at: string;
  image: string | null;
  category?: 'Beginner' | 'Intermediate' | 'Advanced' | null;
  capacity?: number;
  enrolled?: number;
  rating?: number;
}

const Classes = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [classes, setClasses] = useState<FlowerClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<FlowerClass | null>(null);

  const handleNavigation = (section: string) => {
    // Handle navigation within classes page if needed
  };

  const AVAILABLE_LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/api/courses');
        const processedClasses = response.data.map((cls: FlowerClass) => ({
          ...cls,
          category: cls.category || 'Beginner',
          capacity: cls.capacity || 20,
          enrolled: cls.enrolled || 0,
          rating: cls.rating || 4.5,
          // Convert the image from base64 if it exists
          image: cls.image ? `data:image/jpeg;base64,${cls.image}` : '/placeholder.svg'
        }));
        setClasses(processedClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  const filteredClasses = selectedLevel === "All" 
    ? classes 
    : classes.filter(cls => cls.category === selectedLevel);

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowAdmin(true)} onNavigate={handleNavigation} />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-scale-in">
                Classes & Programs
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn the art of floral design from expert instructors. From beginner workshops to advanced masterclasses.
              </p>
            </div>
          </div>
        </section>
        
        {/* Featured Images Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative overflow-hidden rounded-lg shadow-lg hover-scale animate-fade-in">
                <img 
                  src={flowerArrangementClass} 
                  alt="Flower arrangement class in session"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Professional Classes</h3>
                  <p className="text-sm">Learn from certified instructors</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg hover-scale animate-fade-in">
                <img 
                  src={advancedFloralDesign} 
                  alt="Advanced floral design workshop"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Advanced Workshops</h3>
                  <p className="text-sm">Master complex arrangements</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Classes?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center animate-fade-in">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Expert Instructors</h3>
                  <p className="text-muted-foreground">Learn from certified floral designers with years of experience</p>
                </div>
                <div className="text-center animate-fade-in">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Small Class Sizes</h3>
                  <p className="text-muted-foreground">Personalized attention with maximum 15 students per class</p>
                </div>
                <div className="text-center animate-fade-in">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Badge className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Certification</h3>
                  <p className="text-muted-foreground">Receive certificates upon completion of our programs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Level Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {AVAILABLE_LEVELS.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  onClick={() => setSelectedLevel(level)}
                  className="rounded-full"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Classes Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClasses.map((cls, index) => (
                <Card 
                  key={cls.id} 
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={cls.image || '/placeholder.svg'}
                      alt={cls.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {cls.popular && (
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                        Popular
                      </Badge>
                    )}
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                      {cls.category || 'Beginner'}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(cls.rating || 4.5)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          {cls.rating || 4.5}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {cls.sessions} Total Sessions
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{cls.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {cls.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Next Batch: {cls.nextbatch}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Duration: {cls.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{cls.enrolled || 0}/{cls.capacity || 20} enrolled</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cls.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature.topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-bold text-primary">₹{parseFloat(cls.price).toLocaleString()}</span>
                        <Badge 
                          variant={(cls.enrolled || 0) < (cls.capacity || 20) ? "outline" : "destructive"}
                        >
                          {(cls.enrolled || 0) < (cls.capacity || 20) ? "Available" : "Full"}
                        </Badge>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        disabled={(cls.enrolled || 0) >= (cls.capacity || 20)}
                        onClick={() => {
                          if ((cls.enrolled || 0) < (cls.capacity || 20)) {
                            setSelectedCourse(cls);
                            setShowEnrollment(true);
                          }
                        }}
                      >
                        {(cls.enrolled || 0) < (cls.capacity || 20) ? "Enroll Now" : "Join Waitlist"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ClassesPrograms />
      </main>

      <Footer />

      {selectedCourse && (
        <EnrollmentDialog 
          isOpen={showEnrollment}
          onClose={() => {
            setShowEnrollment(false);
            setSelectedCourse(null);
          }}
          courseTitle={selectedCourse.title}
          courseId={selectedCourse.id}
          batch={selectedCourse.nextbatch}
          price={selectedCourse.price}
        />
      )}
    </div>
  );
};

export default Classes;