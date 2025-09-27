import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";
import schoolClassroomImage from "@/assets/school-classroom.jpg";
import schoolGraduationImage from "@/assets/school-graduation.jpg";
import { useState, useEffect, useRef } from "react";

const SchoolShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const achievements = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "500+ Students",
      description: "Successfully trained flower enthusiasts",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Professional Certification",
      description: "Industry-recognized qualifications",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Comprehensive Curriculum",
      description: "From basics to advanced techniques",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Flexible Schedules",
      description: "Weekend and evening classes available",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-3 rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">Premier Flower Education</span>
          </div>
          
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-4">
   Flower School{" "}
  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
    Experience
  </span>
</h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your passion for flowers into professional expertise with our comprehensive educational programs
          </p>
        </div>

        {/* Interactive Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left side - Classroom image with enhanced interaction */}
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img
                src={schoolClassroomImage}
                alt="Flower school classroom with students learning"
                className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Animated overlay content */}
              <div className="absolute inset-0 flex items-end p-6 z-20">
                <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-white/20">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Hands-On Learning
                    </span>
                    <ArrowRight className="h-5 w-5 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Learn directly from master florists in our state-of-the-art studios with personalized guidance
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 left-4 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="absolute top-8 right-8 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-ping" />
            </div>
          </div>

          {/* Right side - Graduation image with enhanced interaction */}
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 to-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img
                src={schoolGraduationImage}
                alt="Flower school graduation ceremony"
                className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Animated overlay content */}
              <div className="absolute inset-0 flex items-end justify-end p-6 z-20">
                <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-white/20">
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                      Celebrate Success
                    </span>
                    <ArrowRight className="h-5 w-5 text-secondary transform group-hover:translate-x-1 transition-transform duration-300" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Graduate with confidence and industry-recognized certificates that open doors to opportunities
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-ping" />
            </div>
          </div>
        </div>

        {/* Animated Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              className={`transform transition-all duration-500 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card 
                className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer ${
                  hoveredCard === index ? 'scale-105 -translate-y-2' : 'scale-100'
                }`}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardContent className="p-8 relative z-10">
                  {/* Animated icon container */}
                  <div className={`relative inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                    hoveredCard === index ? 'bg-gradient-to-br from-white to-gray-50 shadow-inner' : 'bg-white/50'
                  }`}>
                    <div className={`bg-gradient-to-br ${achievement.gradient} bg-clip-text text-transparent`}>
                      {achievement.icon}
                    </div>
                    
                    {/* Hover effect dot */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r ${achievement.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                  
                  <h3 className={`text-xl font-playfair font-bold mb-3 transition-all duration-300 ${
                    hoveredCard === index ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent' : 'text-foreground'
                  }`}>
                    {achievement.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                    {achievement.description}
                  </p>
                  
                  {/* Animated underline */}
                  <div className={`w-0 group-hover:w-full h-0.5 bg-gradient-to-r ${achievement.gradient} transition-all duration-500 mt-3`} />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Interactive Call to Action */}
        <div className={`relative overflow-hidden rounded-3xl p-12 text-center shadow-2xl bg-gradient-to-r from-primary/5 via-white to-accent/5 border border-primary/10 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-[length:20px_20px]" />
          
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 text-foreground">
              Ready to Begin Your{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Floral Journey?
              </span>
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of students who have transformed their love for flowers into professional skills. 
              Our expert instructors are ready to guide you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <span>Explore Programs</span>
                <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Schedule a Tour
              </Button>
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-accent/20 rounded-full animate-float-slow" />
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-primary/20 rounded-full animate-float-medium" />
          <div className="absolute top-1/2 left-10 w-4 h-4 bg-secondary/20 rounded-full animate-float-fast" />
        </div>
      </div>
    </section>
  );
};

export default SchoolShowcase;