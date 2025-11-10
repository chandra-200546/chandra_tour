import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Calendar } from "lucide-react";

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Rajasthan",
      image: "🏰",
      description: "Royal palaces, desert adventures, and rich cultural heritage",
      rating: 4.8,
      tours: 45,
      highlights: ["Jaipur Pink City", "Udaipur Lakes", "Jaisalmer Desert"]
    },
    {
      id: 2,
      name: "Kerala",
      image: "🌴",
      description: "Backwaters, tropical paradise, and Ayurvedic retreats",
      rating: 4.9,
      tours: 38,
      highlights: ["Alleppey Backwaters", "Munnar Tea Gardens", "Kochi Heritage"]
    },
    {
      id: 3,
      name: "Goa",
      image: "🏖️",
      description: "Beautiful beaches, vibrant nightlife, and Portuguese heritage",
      rating: 4.7,
      tours: 52,
      highlights: ["Baga Beach", "Old Goa Churches", "Dudhsagar Falls"]
    },
    {
      id: 4,
      name: "Himachal Pradesh",
      image: "⛰️",
      description: "Mountain escapes, adventure sports, and serene landscapes",
      rating: 4.8,
      tours: 41,
      highlights: ["Manali", "Shimla", "Dharamshala"]
    },
    {
      id: 5,
      name: "Uttarakhand",
      image: "🏔️",
      description: "Spiritual centers, yoga retreats, and Himalayan treks",
      rating: 4.9,
      tours: 35,
      highlights: ["Rishikesh", "Nainital", "Valley of Flowers"]
    },
    {
      id: 6,
      name: "Tamil Nadu",
      image: "🛕",
      description: "Ancient temples, classical arts, and coastal beauty",
      rating: 4.7,
      tours: 29,
      highlights: ["Mahabalipuram", "Madurai Temple", "Ooty Hills"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Explore <span className="bg-gradient-warm bg-clip-text text-transparent">India's Wonders</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover curated destinations across India, from royal palaces to serene beaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Card 
                key={dest.id}
                className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-warm transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform">
                  {dest.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{dest.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="font-semibold">{dest.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{dest.tours} tours</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {dest.highlights.map((highlight, index) => (
                        <span 
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
