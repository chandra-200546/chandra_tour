import Navbar from "@/components/Navbar";
import AdminDashboard from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import tripmintLogo from "@/assets/tripmint-logo.jpeg";
import destRajasthan from "@/assets/dest-rajasthan.jpg";
import destKerala from "@/assets/dest-kerala.jpg";
import destGoa from "@/assets/dest-goa.jpg";
import destHimachal from "@/assets/dest-himachal.jpg";
import fiveuLogo from "@/assets/fiveu-logo.jpeg";
import { useState } from "react";
import { 
  Compass, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles,
  Heart,
  TrendingUp,
  Award,
  ArrowRight,
  Mail,
  Send,
  User,
  Phone
} from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_KEY", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const features = [
    {
      icon: Compass,
      title: "Smart Discovery",
      description: "AI-powered destination recommendations based on your preferences and interests",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Calendar,
      title: "AI Itinerary Planner",
      description: "Generate personalized day-by-day travel plans optimized for your time and budget",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: MessageCircle,
      title: "Travel Assistant",
      description: "Chat with AI for instant recommendations, tips, and travel guidance 24/7",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: MapPin,
      title: "Cultural Discovery",
      description: "Explore festivals, local cuisine, and authentic experiences unique to each region",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: Sparkles,
      title: "Personalized AI",
      description: "Smart recommendations that learn from your preferences and travel history",
      gradient: "from-accent/20 to-accent/5"
    },
  ];

  const destinations = [
    { name: "Rajasthan", image: destRajasthan, desc: "Royal palaces & desert adventures" },
    { name: "Kerala", image: destKerala, desc: "Backwaters & tropical paradise" },
    { name: "Goa", image: destGoa, desc: "Beaches & vibrant culture" },
    { name: "Himachal", image: destHimachal, desc: "Mountain escapes & serenity" },
  ];

  const stats = [
    { icon: MapPin, value: "100+", label: "Destinations" },
    { icon: Heart, value: "1000+", label: "Happy Travelers" },
    { icon: Award, value: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Travel Companion</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover India's{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                Hidden Treasures
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Let AI plan your perfect journey. Smart recommendations, local experts, 
              and authentic experiences - all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-warm shadow-warm hover:shadow-elegant transition-all text-lg px-8 group"
                onClick={() => window.location.href = '/plan'}
              >
                Start Planning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => window.location.href = '/chat'}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Try AI Assistant
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6 text-center border-border/50 shadow-sm hover:shadow-warm transition-all">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                Tripmint
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience travel planning reimagined with AI intelligence and local expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card 
                key={feature.title}
                className="p-6 hover:shadow-elegant transition-all cursor-pointer group border-border/50"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Popular Destinations</h2>
              <p className="text-muted-foreground text-lg">Start your journey to these incredible places</p>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => window.location.href = '/destinations'}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Card 
                key={dest.name}
                className="overflow-hidden group cursor-pointer border-border/50 hover:shadow-warm transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-muted-foreground">{dest.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of travelers who trust Chandra Tourism for their perfect Indian getaway
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8"
                onClick={() => window.location.href = '/destinations'}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Explore Destinations
              </Button>
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8"
                onClick={() => window.location.href = '/chat'}
              >
                Talk to AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold">
              Contact{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">Us</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Have questions or need help planning your trip? We'd love to hear from you.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto p-8 border-border/50 shadow-warm">
            {formStatus === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you shortly.</p>
                <Button onClick={() => setFormStatus("idle")} variant="outline">Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> Name
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" /> Phone
                    </label>
                    <input
                      type="tel"
                      maxLength={15}
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Email
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    required
                    maxLength={1000}
                    rows={4}
                    placeholder="Tell us about your travel plans or questions..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                  />
                </div>
                {formStatus === "error" && (
                  <p className="text-destructive text-sm">Something went wrong. Please try again.</p>
                )}
                <Button
                  type="submit"
                  size="lg"
                  disabled={formStatus === "sending"}
                  className="w-full bg-gradient-warm shadow-warm hover:shadow-elegant transition-all text-lg"
                >
                  {formStatus === "sending" ? "Sending..." : (
                    <><Send className="w-5 h-5 mr-2" /> Send Message</>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Developed By Section */}
      <section className="py-10 px-4 border-t border-border bg-background">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-3">Developed by</p>
          <img src={fiveuLogo} alt="FiveU Vector Technologies" className="h-14 w-auto mx-auto object-contain" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={tripmintLogo} alt="Tripmint" className="h-8 w-auto" />
          </div>
          <p className="text-sm">
            Making travel simple, smart, and soulful - where technology meets emotion
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <p className="text-xs">
              © 2025 Chandra Tourism. All rights reserved.
            </p>
            <AdminDashboard />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
