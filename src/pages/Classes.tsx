import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Star } from "lucide-react";
import api, { endpoints } from "@/lib/api";
import { EnrollmentDialog } from "@/components/EnrollmentDialog";

interface Feature {
  topic: string;
}

interface FlowerClass {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  sessions: number;
  features: Feature[];
  popular: boolean;
  nextbatch: string;
  created_at: string;
  image: string | null;
  category?: "Beginner" | "Intermediate" | "Advanced" | "Workshop" | null;
  capacity?: number;
  enrolled?: number;
  rating?: number;
}

const Classes = () => {
  const [classes, setClasses] = useState<FlowerClass[]>([]);
  const [workshops, setWorkshops] = useState<FlowerClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedTab, setSelectedTab] = useState<"courses" | "workshops">("courses");
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<FlowerClass | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const [coursesRes, workshopsRes] = await Promise.all([
          api.get(endpoints.courses),
          api.get(endpoints.workshops),
        ]);

        const processData = (data: any[]): FlowerClass[] =>
          data.map((cls: any) => ({
            id: cls.id?.toString() || crypto.randomUUID(),
            title: cls.title || "Untitled",
            description: cls.description || "No description available",
            price: cls.price?.toString() || "0",
            duration: cls.duration || "Not specified",
            sessions: cls.sessions || 1,
            features: Array.isArray(cls.features)
              ? cls.features.map((f: any) => ({ topic: f.topic || f }))
              : [{ topic: "Comprehensive training" }],
            popular: cls.popular || false,
            nextbatch: cls.nextbatch || "Coming soon",
            created_at: cls.created_at || new Date().toISOString(),
            image: cls.image ? `data:image/jpeg;base64,${cls.image}` : "/placeholder.svg",
            category: cls.category || "Beginner",
            capacity: cls.capacity || 20,
            enrolled: cls.enrolled || 0,
            rating: cls.rating || 4.5,
          }));

        setClasses(processData(coursesRes.data || []));
        setWorkshops(processData(workshopsRes.data || []));
      } catch (error) {
        console.error("API fetch failed:", error);
        setClasses([]);
        setWorkshops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentData = selectedTab === "courses" ? classes : workshops;
  const filtered =
    selectedLevel === "All" ? currentData : currentData.filter((cls) => cls.category === selectedLevel);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={selectedTab === "courses" ? "default" : "outline"}
            onClick={() => setSelectedTab("courses")}
          >
            Courses
          </Button>
          <Button
            variant={selectedTab === "workshops" ? "default" : "outline"}
            onClick={() => setSelectedTab("workshops")}
          >
            Workshops
          </Button>
        </div>

        {/* Classes Grid */}
        <section className="py-10">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((cls) => (
              <Card key={cls.id}>
                <img
                  src={cls.image || "/placeholder.svg"}
                  alt={cls.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{cls.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{cls.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{cls.nextbatch}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{cls.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>
                      {cls.enrolled}/{cls.capacity} enrolled
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(cls.rating || 4.5)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">₹{cls.price}</span>
                    <Badge
                      variant={(cls.enrolled || 0) < (cls.capacity || 20) ? "outline" : "destructive"}
                    >
                      {(cls.enrolled || 0) < (cls.capacity || 20) ? "Available" : "Full"}
                    </Badge>
                  </div>

                  <Button
                    className="w-full mt-4"
                    disabled={(cls.enrolled || 0) >= (cls.capacity || 20)}
                    onClick={() => {
                      setSelectedCourse(cls);
                      setShowEnrollment(true);
                    }}
                  >
                    {(cls.enrolled || 0) < (cls.capacity || 20) ? "Book Now" : "Join Waitlist"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {selectedCourse && (
        <EnrollmentDialog
          isOpen={showEnrollment}
          onClose={() => setShowEnrollment(false)}
          courseTitle={selectedCourse.title}
          courseId={selectedCourse.id}
          batch={selectedCourse.nextbatch}
          price={selectedCourse.price}
        />
      )}
    </div>
  );
};

export default Classes;
