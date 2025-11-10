import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI travel assistant. Ask me anything about traveling in India - destinations, itineraries, local tips, or cultural insights!"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm a demo AI assistant. In the full version, I'll provide personalized travel recommendations, answer questions about destinations, and help plan your perfect trip!"
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">24/7 AI Travel Assistant</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Chat with Your{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">AI Guide</span>
            </h1>
            <p className="text-muted-foreground">
              Get instant answers about destinations, tips, and travel planning
            </p>
          </div>

          <Card className="h-[600px] flex flex-col shadow-elegant">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-warm text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <MessageCircle className="w-4 h-4 inline mr-2 text-primary" />
                    )}
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about traveling in India..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-gradient-warm shadow-warm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">Try asking:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Best time to visit Kerala?",
                "Hidden gems in Rajasthan",
                "Budget itinerary for Goa",
                "Cultural festivals in India"
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
