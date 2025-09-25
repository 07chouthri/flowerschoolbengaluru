import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, BookOpen, Calendar } from "lucide-react";
import schoolClassroomImage from "@/assets/school-classroom.jpg";
import schoolGraduationImage from "@/assets/school-graduation.jpg";

const SchoolShowcase = () => {
  const achievements = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "500+ Students",
      description: "Successfully trained flower enthusiasts"
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: "Professional Certification",
      description: "Industry-recognized qualifications"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-secondary-dark" />,
      title: "Comprehensive Curriculum",
      description: "From basics to advanced techniques"
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Flexible Schedules",
      description: "Weekend and evening classes available"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4">
            The Flower School Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your passion for flowers into professional expertise with our comprehensive educational programs
          </p>
        </div>

        {/* Main showcase grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left side - Classroom image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-flower">
              <img
                src={schoolClassroomImage}
                alt="Flower school classroom with students learning"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-soft">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                  Hands-On Learning
                </h3>
                <p className="text-muted-foreground">
                  Learn directly from master florists in our state-of-the-art studios
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Graduation image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-flower">
              <img
                src={schoolGraduationImage}
                alt="Flower school graduation ceremony"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur p-4 rounded-xl shadow-soft">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">
                  Celebrate Success
                </h3>
                <p className="text-muted-foreground">
                  Graduate with confidence and industry-recognized certificates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.title}
              className="text-center hover:shadow-flower transition-all duration-300 hover:-translate-y-1 animate-bloom"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="bg-gradient-card rounded-2xl p-8 text-center shadow-elegant">
          <h3 className="text-3xl font-playfair font-bold mb-4 text-foreground">
            Ready to Begin Your Floral Journey?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their love for flowers into professional skills. 
            Our expert instructors are ready to guide you every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SchoolShowcase;