import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Compass, MessageCircle, MapPin, Users, Navigation, Wallet } from "lucide-react";
import tripmintLogo from "@/assets/tripmint-logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Destinations", href: "/destinations", icon: MapPin },
    { name: "Plan Trip", href: "/plan", icon: Compass },
    { name: "Track Journey", href: "/track-journey", icon: Navigation },
    { name: "SmartPay", href: "/smartpay", icon: Wallet },
    { name: "AI Assistant", href: "/chat", icon: MessageCircle },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={tripmintLogo} alt="Tripmint" className="h-10 w-auto transition-transform group-hover:scale-110" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-warm shadow-warm hover:shadow-elegant transition-all">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border animate-in slide-in-from-top">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3 text-primary" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            <div className="px-4 pt-4 space-y-2 border-t border-border">
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-warm">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
