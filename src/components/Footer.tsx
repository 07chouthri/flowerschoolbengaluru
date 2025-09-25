import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Shop Flowers", href: "/shop" },
    { name: "Classes & Programs", href: "/classes" },
    { name: "Calendar", href: "/calendar" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const categories = [
    { name: "Roses", href: "/shop/roses" },
    { name: "Lilies", href: "/shop/lilies" },
    { name: "Orchids", href: "/shop/orchids" },
    { name: "Bouquets", href: "/shop/bouquets" },
    { name: "Wedding Flowers", href: "/shop/wedding" },
    { name: "Seasonal", href: "/shop/seasonal" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-gradient-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-playfair font-bold gradient-primary bg-clip-text text-transparent mb-4">
              🌸 Blossom Studio
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Creating beautiful moments with the art of flowers. From stunning arrangements to educational workshops, 
              we bring the beauty of nature into your life.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6">Get in Touch</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span>(555) 123-BLOOM</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <span>hello@blossomstudio.com</span>
              </div>
              <div className="flex items-start text-muted-foreground">
                <MapPin className="h-4 w-4 mr-3 text-primary mt-1" />
                <span>123 Garden Street<br />Flower District, NY 10001</span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-foreground mb-3">Newsletter</h5>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-background border-border"
                />
                <Button size="sm" className="shadow-soft">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2024 Blossom Studio. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <div className="flex items-center text-muted-foreground">
                Made with <Heart className="h-4 w-4 mx-1 text-primary" /> for flower lovers
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;