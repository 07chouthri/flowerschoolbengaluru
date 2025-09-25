import { Button } from "@/components/ui/button";
import heroFlowers from "@/assets/hero-flowers.jpg";

interface HeroProps {
  onNavigate?: (section: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroFlowers})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-6 animate-bloom">
          Welcome to
          <span className="block text-accent-light">Blossom Studio</span>
        </h1>
        
        <p className="text-xl sm:text-2xl mb-8 text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
          Discover the art of floral beauty. From stunning arrangements to hands-on classes, 
          let us help you create magical moments with flowers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur"
            onClick={() => window.location.href = '/classes'}
          >
            Explore Classes
          </Button>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary-dark shadow-flower font-semibold"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </div>
        
        {/* Floating elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-float" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 -right-20 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
    </section>
  );
};

export default Hero;