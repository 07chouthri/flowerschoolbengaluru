import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Wedding Coordinator",
      content: "Blossom Studio created the most breathtaking wedding arrangements. Every detail was perfect, and their flower arrangement class helped me understand the artistry behind it all.",
      rating: 5,
      image: "👰",
      location: "New York"
    },
    {
      name: "Michael Chen",
      role: "Event Planner",
      content: "I've been working with Blossom Studio for years. Their creativity and attention to detail is unmatched. The wedding flower program gave me insights I use in every event.",
      rating: 5,
      image: "👨‍💼",
      location: "California"
    },
    {
      name: "Emily Rodriguez",
      role: "Art Teacher",
      content: "My daughter absolutely loved the kids' floral art workshop! The instructors were patient and creative. She still talks about the beautiful arrangement she made.",
      rating: 5,
      image: "👩‍🏫",
      location: "Texas"
    },
    {
      name: "David Thompson",
      role: "Small Business Owner",
      content: "The monthly flower subscription has transformed our office space. Fresh, beautiful arrangements that always receive compliments from clients and employees.",
      rating: 5,
      image: "👨‍💻",
      location: "Florida"
    },
    {
      name: "Lisa Wang",
      role: "Homemaker",
      content: "I've taken three different classes at Blossom Studio. Each one taught me something new and inspiring. The instructors are true artists who love sharing their knowledge.",
      rating: 5,
      image: "👩",
      location: "Washington"
    },
    {
      name: "James Miller",
      role: "Restaurant Owner",
      content: "Blossom Studio provides weekly arrangements for our restaurant. The flowers are always fresh and perfectly complement our ambiance. Outstanding service every time.",
      rating: 5,
      image: "👨‍🍳",
      location: "Colorado"
    }
  ];

  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from our satisfied customers and workshop participants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="group hover:shadow-flower transition-all duration-500 hover:-translate-y-1 bg-card border-border/50 animate-bloom"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed italic pl-6">
                    "{testimonial.content}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-card px-8 py-4 rounded-full shadow-soft">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-accent text-accent"
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">4.9 out of 5</span>
            <span className="text-muted-foreground">from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;