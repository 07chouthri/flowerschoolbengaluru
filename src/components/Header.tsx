import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import flowerSchoolLogo from "@/assets/flower-school-logo.png";
import { AuthButtons } from "@/components/auth/AuthButtons";

interface HeaderProps {
  onAdminClick: () => void;
  onNavigate: (section: string) => void;
}

const Header = ({ onAdminClick, onNavigate }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    { name: "Classes & Programs", path: "/classes" },
    { name: "Calendar", path: "/calendar" },
  
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-pink-50/95 backdrop-blur supports-[backdrop-filter]:bg-pink-50/60 border-b border-pink-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img 
              src={flowerSchoolLogo} 
              alt="The Flower School" 
              className="h-12 w-auto mr-3 "
            />
            <div>
              <h1 className="text-xl font-playfair font-bold from-pink-600 to-pink-600 text-foreground">
                The Flower School 
              </h1> 
              <p className="text-xs text-muted-foreground">Bengaluru</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-foreground hover:text-pink-600 transition-smooth font-medium cursor-pointer hover-scale story-link animate-fade-in ${
                  location.pathname === item.path ? 'text-pink-600 border-b-2 border-pink-600' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-pink-50">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium text-foreground hover:text-pink-600 transition-smooth text-left ${
                        location.pathname === item.path ? 'text-pink-600 font-semibold' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-pink-200">
                    <Link to="/admin">
                      <Button 
                        variant="outline" 
                        className="justify-start w-full border-pink-300 hover:bg-pink-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                    <Link to="/signin">
                      <Button 
                        variant="outline" 
                        className="justify-start w-full border-pink-300 hover:bg-pink-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button 
                        variant="default" 
                        className="justify-start w-full bg-pink-600 hover:bg-pink-700"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;