import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, Users, Calendar, Zap, GraduationCap, Briefcase, Palette, Sparkles, Flower } from "lucide-react";
import About4 from "@/assets/About4.jpg";
import FlowerClass from "@/assets/flower-arrangement-class.jpg";
import BeginnersCourseImage from "@/assets/Beginnerscourse.jpg";
import IntermediateCourseImage from "@/assets/IntermediateCours.jpg";
import BestGraduationImage from "@/assets/Advanced.jpg";
import DoorFlower from "@/assets/DoorFlower.jpg";
import RangoliImage from "@/assets/RangoliImage.jpg";
import HamperMakingWorkshopImage from "@/assets/HamperMakingWorkshop.jpg";
import GarlandMakingImage from "@/assets/GarlandMaking.jpg";
import { useNavigate } from "react-router-dom";

// Improved animation hook with Intersection Observer
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

const About = () => {
  const navigate = useNavigate();
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeStaff, setActiveStaff] = useState(0);

  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: "Happy Students",
      description: "Trained in floral arts and event design",
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
      description: "In floral design and education",
    },
    {
      icon: Calendar,
      value: "500+",
      label: "Classes Taught",
      description: "Hands-on floral design sessions",
    },
    {
      icon: Heart,
      value: "50,000+",
      label: "Flowers Arranged",
      description: "With love and creativity",
    },
  ];

  // Staff Profiles Data
  const staffProfiles = [
    {
      name: "Glory Arakal",
      role: "Director & Teaching Staff",
      icon: GraduationCap,
      description: "A floral teacher who turned a childhood fascination with flowers into a professional pursuit, receiving professional training from The Flower School New York City and interning with leading studios such as Birch and Brooklyn Blooms New York. Gained hands-on experience with large-scale projects, including the iconic Mother's Day installation on Fifth Avenue New York. A US Certified Public Accountant with prior experience at KPMG and Baker Hughes, bringing precision and structure to the creative process.",
      highlights: [
        "US Certified Public Accountant",
        "Trained at The Flower School NYC",
        "Interned with Birch and Brooklyn Blooms",
        "Mother's Day installation on Fifth Avenue NYC",
        "Former KPMG and Baker Hughes"
      ],
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Thomas Arakal",
      role: "Director of Administration & Teaching Staff",
      icon: Briefcase,
      description: "A Marine Engineering graduate with a master's degree in Business Administration, with international experience working with multinational companies in management and operations. Brings valuable expertise to teaching by guiding students in the financial aspects of floristry and event planning, including costing and budgeting, while also sharing knowledge of tablescape that combine structure with elegance.",
      highlights: [
        "Marine Engineering graduate",
        "MBA with international experience",
        "Expert in floristry costing and budgeting",
        "Tablescape design specialist",
        "Management and operations background"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Ranjit Jana (Papai)",
      role: "Master Florist & Teaching Staff",
      icon: Sparkles,
      description: "A highly skilled Master Florist with over six years of professional experience, with expertise spanning floral shops and luxury establishments such as JW Marriott, The Leela Palace, Conrad Hotel, and Four Seasons Hotel. Specialized in event décor and luxury floral design, and with a year of teaching Floristry and Event Planning, brings together industry knowledge, artistry, and attention to detail to mentor aspiring florists with hands-on training and professional insights.",
      highlights: [
        "6+ years professional experience",
        "JW Marriott, The Leela Palace, Conrad Hotel",
        "Four Seasons Hotel experience",
        "Event décor and luxury floral design",
        "1+ year teaching experience"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Banothu Sri Rama",
      role: "Florist & Teaching Staff",
      icon: Palette,
      description: "A floral teacher who combines technical knowledge with creative design. An electrical engineer by qualification, pursued her passion for floristry at the Meghaa Modi Design School, Bengaluru, where she specialized in floral and event design. Has professional experience in floral artistry, with expertise in creating elegant arrangements using both fresh and dry flowers. Has also trained individuals in floral design, bringing effective methods and modern techniques to help students gain confidence and practical skills.",
      highlights: [
        "Electrical Engineering background",
        "Trained at Meghaa Modi Design School",
        "Fresh and dry flower specialist",
        "Modern floral techniques",
        "Effective training methods"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Geetha Somashekhar",
      role: "Ikebana Teaching Staff",
      icon: Flower,
      description: "An accomplished Ikebana teacher with over ten years of experience in the traditional Japanese art of flower arrangement. Holds the Jonin Sanyo Diploma and the Grade II Teacher's Diploma from the Sogetsu School of Ikebana, and continues to refine her knowledge under the guidance of Mr. Christopher Lim from Singapore. Brings both technical mastery and cultural depth to the classroom, helping students develop a sense of balance, harmony, and refinement in floral design.",
      highlights: [
        "10+ years Ikebana experience",
        "Jonin Sanyo Diploma holder",
        "Grade II Teacher's Diploma",
        "Sogetsu School of Ikebana",
        "Training under Christopher Lim, Singapore"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Tara Vellara",
      role: "Resin Art Teaching Staff",
      icon: Heart,
      description: "A floral preservation artist with a background in architecture and interior design, whose journey into resin artistry began during an Master of Fine Arts in Interior Design at Pratt Institute, New York. Transforming flowers into timeless works of art that preserve emotions and memories. With a strong design sensibility and attention to detail, brings this expertise into teaching by guiding students in the art of floral preservation, helping them create heirloom pieces that capture life's most meaningful moments.",
      highlights: [
        "Architecture and interior design background",
        "MFA from Pratt Institute, New York",
        "Floral preservation specialist",
        "Resin artistry expert",
        "Heirloom piece creation"
      ],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  // Mini preview of courses
  const courses = [
    {
      title: "Beginner's Course to Floristry",
      description: "Learn essential floral design techniques in 5 days.",
      image: BeginnersCourseImage,
    },
    {
      title: "Intermediate Floristry Course",
      description: "Advance your skills with event styling & bouquets.",
      image: IntermediateCourseImage,
    },
    {
      title: "Advanced Floristry Course",
      description: "Master compote design, framing & business strategy.",
      image: BestGraduationImage,
    },
  ];

  // Mini preview of workshops
  const workshops = [
    {
      title: "Door Décor Workshop",
      description: "Create floral torans & festive entrance pieces.",
      image: DoorFlower,
    },
    {
      title: "Rangoli with Flowers",
      description: "Design rangolis using petals & blooms.",
      image: RangoliImage,
    },
    {
      title: "Hamper & Garland Making",
      description: "Festive hampers & traditional garlands.",
      image: HamperMakingWorkshopImage,
    },
    {
      title: "Garland Workshop",
      description: "Classic & modern styles with marigolds.",
      image: GarlandMakingImage,
    },
  ];

  // Get the current staff member's icon component
  const CurrentStaffIcon = staffProfiles[activeStaff]?.icon || GraduationCap;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header
        onAdminClick={() => setShowAdmin(true)}
        onNavigate={(path) => navigate(path)}  
      />

      <main>
        {/* Our Story */}
        <AnimatedSection delay={100}>
          <section className="py-8 md:py-16 px-4 sm:px-6">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 order-2 lg:order-1">
                <div className="relative">
                  <img
                    src={About4}
                    alt="Flower School Bengaluru"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 md:h-80 object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="relative mt-4 sm:mt-8 md:mt-12">
                  <img
                    src={FlowerClass}
                    alt="Flower arrangement class"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 md:h-80 object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </div>

              {/* Right text */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-playfair">
                  <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Flower School Bangalore
                  </span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg font-sans">
                  Flower School Bangalore is India's premier hands-on floral education
                  institute. We offer training in floral design, techniques & elements
                  to aspiring florists, designers, event stylists, and creative
                  enthusiasts. Whether you are starting from scratch or refining your
                  skills, our immersive courses and workshops help you grow with confidence and
                  explore your passion for flowers.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection delay={200}>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="container mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-playfair">
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Our Impact
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-all duration-500 ease-out hover:scale-105 font-sans">
                      <CardContent className="p-4 md:p-6">
                        <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full mb-3 md:mb-4">
                          <StatIcon className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2 font-playfair">
                          {stat.value}
                        </div>
                        <div className="font-semibold mb-1 text-sm md:text-base font-sans">{stat.label}</div>
                        <div className="text-xs md:text-sm text-muted-foreground font-sans">
                          {stat.description}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Staff Profiles Section */}
        <AnimatedSection delay={300}>
          <section className="py-8 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 font-playfair">
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Meet Our Expert Team
                </span>
              </h2>
              
              {/* Staff Navigation - Desktop */}
              <div className="hidden lg:flex justify-center mb-8 gap-2">
                {staffProfiles.map((staff, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStaff(index)}
                    className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out font-sans ${
                      activeStaff === index
                        ? `bg-gradient-to-r ${staff.color} text-white shadow-lg transform scale-105`
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {staff.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Staff Navigation - Mobile */}
              <div className="lg:hidden flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
                {staffProfiles.map((staff, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStaff(index)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-300 ease-out font-sans ${
                      activeStaff === index
                        ? `bg-gradient-to-r ${staff.color} text-white shadow-lg`
                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {staff.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Staff Profile Display */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Profile Image and Basic Info */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-24 transition-all duration-500 ease-out hover:shadow-2xl">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${staffProfiles[activeStaff].color} mb-4 transform hover:scale-110 transition-transform duration-500 ease-out`}>
                        <CurrentStaffIcon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-playfair">
                        {staffProfiles[activeStaff].name}
                      </h3>
                      <Badge className={`bg-gradient-to-r ${staffProfiles[activeStaff].color} text-white border-0 text-sm py-1 px-3 font-sans`}>
                        {staffProfiles[activeStaff].role}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2">
                  <Card className="hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.02]">
                    <CardContent className="p-6 md:p-8">
                      <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base font-sans">
                        {staffProfiles[activeStaff].description}
                      </p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2 font-sans">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          Key Highlights:
                        </h4>
                        <div className="grid gap-2">
                          {staffProfiles[activeStaff].highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${staffProfiles[activeStaff].color} flex-shrink-0`}></div>
                              <span className="text-gray-700 text-sm font-sans">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Mobile Staff Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6 mt-12">
                {staffProfiles.map((staff, index) => {
                  const StaffIcon = staff.icon;
                  return (
                    <Card 
                      key={index}
                      className="hover:shadow-lg transition-all duration-500 ease-out hover:scale-105 cursor-pointer"
                      onClick={() => setActiveStaff(index)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${staff.color} mb-4`}>
                          <StaffIcon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 font-playfair">
                          {staff.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-sans">
                          {staff.role}
                        </p>
                        <Badge variant="outline" className="text-gray-700 font-sans">
                          View Profile
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Courses Preview */}
        <AnimatedSection delay={400}>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="container mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-playfair">
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Explore Our Professional Courses
                </span>  
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {courses.map((course, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-all duration-500 ease-out hover:scale-105">
                   <CardContent className="p-6 text-center">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-50 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm">{course.description}</p>
                  </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Workshops Preview */}
        <AnimatedSection delay={500}>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="container mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-playfair">
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Upcoming Workshops
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {workshops.map((workshop, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-all duration-500 ease-out hover:scale-105">
                    <CardContent className="p-6 text-center">
            <img
              src={workshop.image}
              alt={workshop.title}
              className="w-full h-65 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{workshop.title}</h3>
            <p className="text-muted-foreground text-sm">
              {workshop.description}
            </p>
          </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection delay={600}>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <Testimonials />
          </section>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default About;