import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import SchoolShowcase from "@/components/SchoolShowcase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, Users, Calendar } from "lucide-react";

const About = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  const handleNavigation = (section: string) => {
    // Handle navigation within about page if needed
  };

  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: "Happy Customers",
      description: "Served with beautiful flowers"
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
      description: "In floral design and education"
    },
    {
      icon: Calendar,
      value: "500+",
      label: "Classes Taught",
      description: "Students trained in floral arts"
    },
    {
      icon: Heart,
      value: "50,000+",
      label: "Flowers Arranged",
      description: "With love and creativity"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Master Florist",
      bio: "With over 15 years of experience, Sarah brings passion and expertise to every arrangement.",
      image: "/placeholder.svg",
      specialties: ["Wedding Design", "Corporate Events", "Floral Education"]
    },
    {
      name: "Emily Chen",
      role: "Lead Instructor",
      bio: "Emily specializes in modern floral design and has trained hundreds of students.",
      image: "/placeholder.svg",
      specialties: ["Modern Arrangements", "Color Theory", "Student Mentoring"]
    },
    {
      name: "Mike Rodriguez",
      role: "Kids Program Director",
      bio: "Mike makes learning fun for children with creative and engaging floral activities.",
      image: "/placeholder.svg",
      specialties: ["Children's Education", "Art Therapy", "Creative Workshops"]
    },
    {
      name: "Yuki Tanaka",
      role: "Ikebana Master",
      bio: "Traditional Japanese flower arranging expert with decades of experience.",
      image: "/placeholder.svg",
      specialties: ["Traditional Ikebana", "Meditation", "Cultural Arts"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowAdmin(true)} onNavigate={handleNavigation} />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About Blossom Studio
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our story, meet our team, and learn about our passion for floral design and education
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Founded in 2009, Blossom Studio began as a small flower shop with a big dream: 
                    to bring the beauty and joy of flowers to every corner of our community.
                  </p>
                  <p>
                    What started as a passion project by Sarah Johnson has grown into a thriving 
                    business that combines exceptional floral design with comprehensive education 
                    programs.
                  </p>
                  <p>
                    Today, we're proud to be not just a flower shop, but a place where creativity 
                    blooms, skills are nurtured, and the timeless art of floral design is passed 
                    on to the next generation.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/placeholder.svg"
                  alt="Our flower shop"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="/placeholder.svg"
                  alt="Flower arrangement"
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                To spread joy through beautiful flowers while empowering others to discover 
                their creative potential through comprehensive floral education.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality & Beauty</h3>
                  <p className="text-muted-foreground">
                    We source the finest flowers and create arrangements that bring joy to every occasion.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Education & Growth</h3>
                  <p className="text-muted-foreground">
                    We nurture creativity and skill development through comprehensive floral education programs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Excellence & Innovation</h3>
                  <p className="text-muted-foreground">
                    We continuously evolve our techniques and embrace new trends in floral design.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our passionate team of floral artists and educators are here to help you discover the beauty of flowers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SchoolShowcase />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default About;