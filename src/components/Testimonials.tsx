import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Wedding Coordinator",
      content: "Blossom Studio created the most breathtaking wedding arrangements. Every detail was perfect, and their flower arrangement class helped me understand the artistry behind it all.",
      rating: 5,
      image: "👰",
      location: "Bangalore",
      gradient: "from-pink-100 to-rose-100"
    },
    {
      name: "Michael Chen",
      role: "Event Planner",
      content: "I've been working with Blossom Studio for years. Their creativity and attention to detail is unmatched. The wedding flower program gave me insights I use in every event.",
      rating: 5,
      image: "👨‍💼",
      location: "Bangalore",
      gradient: "from-pink-100 to-rose-100"
    },
    {
      name: "Emily Rodriguez",
      role: "Art Teacher",
      content: "My daughter absolutely loved the kids' floral art workshop! The instructors were patient and creative. She still talks about the beautiful arrangement she made.",
      rating: 5,
      image: "👩‍🏫",
      location: "Bangalore",
      gradient: "from-pink-100 to-rose-100"
    },
    {
      name: "David Thompson",
      role: "Small Business Owner",
      content: "The monthly flower subscription has transformed our office space. Fresh, beautiful arrangements that always receive compliments from clients and employees.",
      rating: 5,
      image: "👨‍💻",
      location: "Bangalore",
      gradient: "from-pink-100 to-rose-100"
    },
    {
      name: "Lisa Wang",
      role: "Homemaker",
      content: "I've taken three different classes at Blossom Studio. Each one taught me something new and inspiring. The instructors are true artists who love sharing their knowledge.",
      rating: 5,
      image: "👩",
      location: "Bangalore",
      gradient: "from-pink-100 to-rose-100"
    },
    {
      name: "James Miller",
      role: "Restaurant Owner",
      content: "Blossom Studio provides weekly arrangements for our restaurant. The flowers are always fresh and perfectly complement our ambiance. Outstanding service every time.",
      rating: 5,
      image: "👨‍🍳",
      location: "Bangalore",
      gradient: "from-pink-100 to-rose-100"
    }
  ];

  // Impact statistics - these would need to be updated manually or via backend
  const impactStats = [
    { number: "500+", label: "Happy Students" },
    { number: "4.9", label: "Average Rating" },
    { number: "50+", label: "Workshops Conducted" },
    { number: "1000+", label: "Bouquets Created" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentSlide(index);
  };

  // Auto-scroll for mobile carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update scroll position when currentSlide changes
  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide]);

  return (
    <section ref={sectionRef} className="py-1md:py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              What Our Happy Students Say
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Hear from our satisfied students and workshop participants about their learning journey
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative mb-8">
          {/* Navigation Arrows for Mobile */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transform hover:-translate-x-1 transition-all duration-300 z-20"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            
            <div className="flex gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 w-4' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transform hover:translate-x-1 transition-all duration-300 z-20"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Mobile Carousel Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 pb-4 -mx-4 px-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="flex-shrink-0 w-[85vw] snap-center transform transition-all duration-500"
              >
                <Card className="group relative overflow-hidden border border-gray-200/60 hover:border-pink-300 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0`} />
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">
                        {testimonial.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          📍 {testimonial.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 font-medium">{testimonial.rating}.0</span>
                    </div>
                    
                    <div className="relative">
                      <Quote className="h-6 w-6 text-pink-200 absolute -top-1 -left-1" />
                      <p className="text-gray-600 leading-relaxed italic pl-6 text-sm">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="group relative overflow-hidden border border-gray-200/60 hover:border-pink-300 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center mb-4 transform group-hover:translate-x-1 transition-transform duration-300">
                    <div className="text-4xl mr-4 transform group-hover:scale-110 transition-transform duration-500">
                      {testimonial.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        📍 {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 font-medium">{testimonial.rating}.0</span>
                  </div>
                  
                  <div className="relative">
                    <Quote className="h-8 w-8 text-pink-200 absolute -top-2 -left-2" />
                    <p className="text-gray-600 leading-relaxed italic pl-6 text-sm">
                      "{testimonial.content}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

      
      </div>

   <style>{`
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`}</style>

    </section>
  );
};

export default Testimonials;