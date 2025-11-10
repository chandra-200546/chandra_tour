import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

const Plan = () => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    budget: "medium"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Planning trip with:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Trip Planning</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Plan Your Perfect{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Let AI create a personalized itinerary based on your preferences
            </p>
          </div>

          <Card className="p-8 shadow-elegant">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Where do you want to go?
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., Rajasthan, Kerala, Goa..."
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers" className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Number of Travelers
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.travelers}
                  onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Budget Range
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {["budget", "medium", "luxury"].map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={formData.budget === level ? "default" : "outline"}
                      onClick={() => setFormData({...formData, budget: level})}
                      className="capitalize"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-warm shadow-warm hover:shadow-elegant transition-all"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Itinerary
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>AI will generate a personalized day-by-day itinerary with activities, restaurants, and local tips</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plan;
