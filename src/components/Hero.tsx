import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import School from "@/assets/School.jpg";
import School1 from "@/assets/School1.jpg";
import School2 from "@/assets/School2.jpg";
import CherryBlossom from "@/assets/cherryblossom.jpg";
import { useNavigate } from "react-router-dom";

interface HeroProps {
  onNavigate?: (section: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
const navigate = useNavigate();
  const [displayText, setDisplayText] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [showCherryBlossom, setShowCherryBlossom] = useState<boolean>(true);
  const images: string[] = [School, School1, School2];
  const sectionRef = useRef<HTMLElement>(null);
const isInView = useInView(sectionRef, { once: true });
  const fullText: string = "Start your floral journey with us";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const checkBackground = async () => {
      try {
        const img = new Image();
        img.src = CherryBlossom;
        img.onload = () => {
          setShowCherryBlossom(true);
        };
        img.onerror = () => {
          setShowCherryBlossom(false);
        };
      } catch (error) {
        setShowCherryBlossom(false);
      }
    };
    
    checkBackground();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-1 md:py-0">
      {/* Cherry Blossom Background */}
      {showCherryBlossom && (
        <div className="absolute inset-0">
          <img 
            src={CherryBlossom} 
            alt="Cherry Blossom Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}

      {/* Fallback Background Pattern */}
      {!showCherryBlossom && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjdiY2IiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Content */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          {/* Welcome Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-6 md:mb-8 px-2"
          >
           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
  <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
    Welcome to The Flower School Bengaluru
  </span>
</h1>

          </motion.div>

          {/* Animated Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl font-medium mb-6 md:mb-8 text-gray-800 px-4"
          >
            {displayText}
            <span className="animate-pulse ml-1">|</span>
          </motion.div>

          {/* Mission Statement - Without Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6 md:mb-8 max-w-2xl mx-4"
          >
            <blockquote className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
              "Cultivating creativity with nature's finest blooms. Our mission is to teach floral design 
              with deep respect for both artistry and environment."
            </blockquote>
          </motion.div>

          {/* Two Small Boxes - Stack on mobile, side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-4">
            
            {/* Left Box - Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 flex flex-col h-full"
            >
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Explore Our School</h3>
                <div className="space-y-2 md:space-y-3 text-left">
                  <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700">
                    <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                    Hands-on Training
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700">
                    <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                    Sustainable Practices
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700">
                    <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0"></div>
                    Expert Instructors
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="mt-4 md:mt-6"
              >
               
<Button
  size="lg"
  className="w-full text-sm md:text-lg px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg md:rounded-xl hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0"
  onClick={() => navigate("/classes")}
>
  <span className="mr-2">📚</span>
  Explore Courses
</Button>
              </motion.div>
            </motion.div>

            {/* Right Box - Bouquets */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 flex flex-col h-full"
            >
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-2">Beautiful Bouquets</h3>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                  Discover our exquisite collection of handcrafted bouquets for every occasion. 
                  From romantic arrangements to corporate designs. Our shop and school are in Bangalore. 
                  You are welcome to visit our environment.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="mt-4 md:mt-6"
              >
                <Button 
                  size="lg" 
                  className="w-full text-sm md:text-lg px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-red-500 to-emerald-500 text-white rounded-lg md:rounded-xl hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0"
                  // onClick={() => onNavigate?.('bouquets') || (window.location.href = '/bouquets')}
                >
                  <span className="mr-2">🌸</span>
                  View Bouquets
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Additional spacing for mobile */}
          <div className="h-4 md:h-8"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;