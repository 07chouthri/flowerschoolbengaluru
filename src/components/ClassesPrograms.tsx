import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Award } from "lucide-react";
import flowerClassImage from "@/assets/flower-class.jpg";
import weddingProgramImage from "@/assets/wedding-program.jpg";
import kidsWorkshopImage from "@/assets/kids-workshop.jpg";
import { useState } from "react";

const ClassesPrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState<{
    title: string;
    price: string;
    batch: string;
    id: string;
  } | null>(null);
  const [showEnrollment, setShowEnrollment] = useState(false);

  const programs = [
    {
      id: "flower-arrangement",
      title: "Flower Arrangement Classes",
      description: "Learn the art of professional flower arrangement with our expert instructors",
      image: flowerClassImage,
      duration: "2 hours",
      capacity: "12 students",
      nextDate: "March 15, 2024",
      price: "7500", 
      level: "Beginner",
      icon: "🌹",
      features: ["Basic techniques", "Color theory", "Vase selection", "Take home arrangement"]
    },
    {
      id: "wedding-flower",
      title: "Wedding Flower Program",
      description: "Master the elegant art of bridal florals and wedding arrangements",
      image: weddingProgramImage,
      duration: "4 hours",
      capacity: "8 students",
      nextDate: "March 20, 2024",
      price: "1000", 
      level: "Intermediate",
      icon: "💍",
      features: ["Bridal bouquets", "Centerpieces", "Boutonnieres", "Professional tips"]
    },
    {
      id: "kids-workshop",
      title: "Kids' Floral Art Workshop",
      description: "Fun and creative flower crafts designed specifically for young artists",
      image: kidsWorkshopImage,
      duration: "1.5 hours",
      capacity: "15 children",
      nextDate: "March 22, 2024",
      price: "1500",
      level: "All Ages",
      icon: "🎨",
      features: ["Safe tools", "Simple techniques", "Creative projects", "Parent participation"]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success/10 text-success";
      case "Intermediate": return "bg-warning/10 text-warning";
      case "Advanced": return "bg-destructive/10 text-destructive";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <div>
      <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4">
            Classes & Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the joy of flower artistry through our hands-on workshops and comprehensive programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card 
              key={program.title} 
              className="group hover:shadow-flower transition-all duration-500 hover:-translate-y-2 bg-card border-border/50 animate-bloom"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge className={getLevelColor(program.level)}>
                      {program.level}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 text-4xl">
                    {program.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-playfair mb-3 text-foreground">
                  {program.title}
                </CardTitle>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Duration: {program.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Max capacity: {program.capacity}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-accent" />
                    What you'll learn:
                  </h4>
                  <ul className="space-y-1">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default ClassesPrograms;