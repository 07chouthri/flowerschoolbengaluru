import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

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
      icon: MapPin,
      title: "Visit Our Studio",
      details: [
        "123 Flower Street",
        "Garden District",
        "City, State 12345"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "Main: (555) 123-4567",
        "Classes: (555) 123-4568",
        "Emergency: (555) 123-4569"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@blossomstudio.com",
        "classes@blossomstudio.com",
        "orders@blossomstudio.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Mon-Fri: 9:00 AM - 7:00 PM",
        "Saturday: 9:00 AM - 6:00 PM",
        "Sunday: 10:00 AM - 5:00 PM"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowAdmin(true)} onNavigate={handleNavigation} />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get in touch with us for flower orders, class inquiries, or any questions you may have
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="How can we help you?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map & Additional Info */}
              <div className="space-y-8">
                {/* Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Find Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p>Interactive Map</p>
                        <p className="text-sm">123 Flower Street, Garden District</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Do you deliver flowers?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, we offer local delivery within a 25-mile radius. Same-day delivery is available for orders placed before 2 PM.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Can I book private classes?</h4>
                      <p className="text-sm text-muted-foreground">
                        Absolutely! We offer private and group classes for special occasions. Contact us to discuss your requirements.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Do you handle wedding flowers?</h4>
                      <p className="text-sm text-muted-foreground">
                        Yes, we specialize in wedding flowers including bridal bouquets, centerpieces, and ceremony decorations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">What's your cancellation policy?</h4>
                      <p className="text-sm text-muted-foreground">
                        Classes can be cancelled up to 48 hours in advance for a full refund. Flower orders require 24-hour notice.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                For urgent flower orders or emergency inquiries, don't hesitate to call us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: (555) 123-4567
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;