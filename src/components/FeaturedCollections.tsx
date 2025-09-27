import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Using your provided collection images
import Collection1 from "@/assets/Collection1.jpg";
import Collection2 from "@/assets/Collection2.jpg";
import Collection3 from "@/assets/Collection3.jpg";
import Collection4 from "@/assets/Collection4.jpg";
import Collection5 from "@/assets/Collection5.jpg";
import Collection6 from "@/assets/Collection6.jpg";

const FeaturedCollections = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedCards, setLikedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const collections = [
    {
     
    
      image: Collection1,
    
     
    },
    {
      

      image: Collection2,
      
    },
    {


      image: Collection3,
     
    },
    {
      
      image: Collection4,
      
    },
    {

      image: Collection5,
    
    },
    {
     
      image: Collection6,
     
    }
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

  const handleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleCardClick = (title: string) => {
    console.log(`Viewing ${title} collection`);
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-20 relative overflow-hidden bg-white">

      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
      
             <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                   Featured{" "} Collections
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of premium flowers and arrangements
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.title}
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card 
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm"
                onClick={() => handleCardClick(collection.title)}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10`} />
                
                <CardHeader className="p-0 relative">
                  <div className="relative overflow-hidden rounded-t-xl">
                    {/* Main Image */}
                    <img
                      src={collection.image}
                    
                      className="w-full h-75 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    
                    
                   
                  </div>
                </CardHeader>
                
               
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;