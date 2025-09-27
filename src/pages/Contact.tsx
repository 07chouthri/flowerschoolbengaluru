import { useState, useRef, useEffect } from "react"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook, Twitter, ExternalLink, PhoneCall } from "lucide-react";

// Animation hook
const useAnimateOnScroll = (delay = 0) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, delay);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return { ref, isInView };
};

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const { ref, isInView } = useAnimateOnScroll(delay);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isInView 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-8 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Contact = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleNavigation = (section: string) => {
    // Handle navigation within contact page if needed
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "Main: +91 99728 03847",
        "Classes: +91 99728 03847",
        "Emergency: +91 99728 03847"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@flowerschoolbengaluru.com",
        "classes@flowerschoolbengaluru.com",
        "orders@flowerschoolbengaluru.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Mon-Sat: 9:00 AM - 8:00 PM",
        "Sunday: 10:00 AM - 6:00 PM"
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" }
  ];

  const openWhatsApp = () => {
    window.open('https://wa.me/919972803847?text=Hello! I would like to place a flower order.', '_blank');
  };

  const makeCall = () => {
    window.open('tel:+919972803847', '_self');
  };

  const openMapsInNewTab = () => {
    window.open('https://www.google.com/maps/place/SIPANI+EAST+AVENUE,+6th+Block,+Koramangala,+Bengaluru,+Karnataka+560095', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowAdmin(true)} onNavigate={handleNavigation} />
      
      <main className="pt-16 md:pt-20">
        {/* Page Header */}
        <AnimatedSection delay={100}>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="container mx-auto">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 font-playfair">
                  Get in {" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400 font-semibold">
                    Touch
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
                  Ready to order flowers or join our classes? We're here to help!
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Information Cards */}
        <AnimatedSection delay={200}>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-500 ease-out hover:scale-105">
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-3 font-sans">{info.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground font-sans">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="break-words">{detail}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Section Layout */}
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                {/* Contact Info - Left Side */}
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 font-playfair">Contact Information</h3>
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm md:text-base font-sans">Address</div>
                          <div className="text-muted-foreground text-xs md:text-sm font-sans">
                            #440, 18th Main Road, 6th Cross, 6th block Koramangala, koramangala, Bengaluru, Karnataka – 560095
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm md:text-base font-sans">Phone</div>
                          <div className="text-muted-foreground text-xs md:text-sm font-sans">+91 99728 03847</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm md:text-base font-sans">Email</div>
                          <div className="text-muted-foreground text-xs md:text-sm font-sans break-words">
                            info@flowerschoolbengaluru.com
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm md:text-base font-sans">Hours</div>
                          <div className="text-muted-foreground text-xs md:text-sm font-sans">
                            Mon-Sat: 9AM-8PM, Sun: 10AM-6PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-lg font-semibold font-sans">Quick Actions</h4>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <Button 
                        className=" text-white font-sans text-sm md:text-base"
                        onClick={openWhatsApp}
                        size="lg"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Order
                      </Button>
                      <Button 
                        onClick={makeCall}
                        size="lg"
                        className="font-sans text-sm md:text-base"
                      >
                        <PhoneCall className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Map - Right Side */}
                <div className="space-y-6 md:space-y-8">
                  {/* Google Maps Integration with Overlay */}
                  <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 md:h-96">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2855.610430364254!2d77.62079447507593!3d12.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU2JzI0LjAiTiA3N8KwMzcnMjIuOCJF!5e0!3m2!1sen!2sin!4v1710153926784!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Flower School Bengaluru Location"
                      className="absolute inset-0"
                    ></iframe>
                    
                    {/* Map Overlay Button */}
                    <div className="absolute bottom-4 right-4">
                      <Button 
                        onClick={openMapsInNewTab}
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm hover:bg-white font-sans"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open Map
                      </Button>
                    </div>
                  </div>

                  {/* Additional Contact Options */}
                  
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        
      </main>

      <Footer />
    </div>
  );
};

export default Contact;