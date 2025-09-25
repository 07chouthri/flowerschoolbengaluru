import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import rosesImage from "@/assets/roses-collection.jpg";
import liliesImage from "@/assets/lilies-collection.jpg";
import orchidsImage from "@/assets/orchids-collection.jpg";
import bouquetsImage from "@/assets/bouquets-collection.jpg";

const FeaturedCollections = () => {
  const collections = [
    {
      title: "Roses",
      description: "Classic beauty and timeless elegance",
      image: rosesImage,
      count: "45+ varieties"
    },
    {
      title: "Lilies",
      description: "Pure elegance and sophisticated charm",
      image: liliesImage,
      count: "25+ varieties"
    },
    {
      title: "Orchids",
      description: "Exotic beauty for the discerning eye",
      image: orchidsImage,
      count: "30+ varieties"
    },
    {
      title: "Bouquets",
      description: "Curated arrangements for every occasion",
      image: bouquetsImage,
      count: "Custom designs"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium flowers and arrangements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <Card 
              key={collection.title} 
              className="group hover:shadow-flower transition-all duration-500 hover:-translate-y-2 bg-card border-border/50 animate-bloom"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-primary">
                    {collection.count}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-playfair mb-2 text-foreground">
                  {collection.title}
                </CardTitle>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {collection.description}
                </p>Ready to Begin Your Floral Journey
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;