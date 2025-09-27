import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import ClassesPrograms from "@/components/ClassesPrograms";
import Testimonials from "@/components/Testimonials";

import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  
  // Refs for smooth scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const classesRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (section: string) => {
    let targetRef;
    
    switch (section) {
      case "home":
        targetRef = heroRef;
        break;
      case "shop":
        targetRef = shopRef;
        break;
      case "classes":
        targetRef = classesRef;
        break;
      case "calendar":
        targetRef = offersRef; // For now, scroll to offers section
        break;
      case "about":
        targetRef = aboutRef;
        break;
      case "contact":
        targetRef = contactRef;
        break;
      default:
        targetRef = heroRef;
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 font-lora">
        <Header onAdminClick={() => setShowAdmin(true)} onNavigate={handleNavigation} />
        <div ref={heroRef} className="animate-fade-in">
          <Hero onNavigate={handleNavigation} />
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <FeaturedCollections />
        </div>
        
        <div ref={aboutRef} className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <Testimonials />
        </div>
        <div ref={contactRef} className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <Footer />
        </div>
      </div>
      
      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </>
  );
};

export default Index;
