
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiwaaliPatternIcon, IndianMarketIcon } from "@/assets/icons/IndianMarket";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Welcome = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 500);
            return 100;
          }
          return newProgress;
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleEnter = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pattern-rangoli relative overflow-hidden p-6">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 transform -translate-y-1/2 translate-x-1/2">
          <DiwaaliPatternIcon className="w-60 h-60 text-primary opacity-20" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 transform translate-y-1/2 -translate-x-1/2">
          <DiwaaliPatternIcon className="w-40 h-40 text-accent opacity-20" />
        </div>
        
        {/* Floating decorative elements for Indian flair */}
        <img 
          src="/lovable-uploads/8fa0ae92-11fa-42a1-b178-0ec45bd40676.png" 
          alt="Decorative" 
          className="absolute top-[20%] left-[10%] h-16 w-16 opacity-20 animate-pulse"
        />
        <img 
          src="/lovable-uploads/f1192a28-e293-49b1-90b7-ed41cbd914f6.png" 
          alt="Decorative" 
          className="absolute bottom-[15%] right-[15%] h-20 w-20 opacity-20 animate-pulse"
        />
        
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="z-10 max-w-md w-full space-y-8 text-center">
        {showContent && (
          <div className="animate-slide-down">
            <div className="mb-8 flex justify-center">
              <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center">
                <IndianMarketIcon className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-display font-bold tracking-tight mb-2 text-gradient">
              TradeInsight AI
            </h1>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-4">
              Your intelligent trading companion for Indian markets
            </p>
            <div className="flex justify-center gap-2 mb-8">
              <Badge text="NSE" />
              <Badge text="BSE" />
              <Badge text="F&O" />
              <Badge text="Commodities" />
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="animate-fade-in glass-panel p-8 rounded-2xl">
            <div className="h-1.5 bg-secondary rounded-full w-full max-w-xs mx-auto mb-4 overflow-hidden">
              <div 
                className="h-full gradient-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-muted-foreground text-sm">
              {progress < 30 ? "Loading market data..." : 
               progress < 60 ? "Initializing AI models..." : 
               progress < 90 ? "Preparing insights..." : 
               "Almost ready..."}
            </p>
          </div>
        ) : (
          <div className="animate-scale-in flex flex-col items-center gap-4">
            <Button 
              onClick={handleEnter} 
              className="px-8 py-6 rounded-xl text-lg font-medium transition-all duration-300 gradient-primary hover:opacity-90 text-white"
            >
              Enter Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              className="px-8 py-6 rounded-xl text-lg font-medium transition-all"
            >
              Login / Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Badge = ({ text }: { text: string }) => (
  <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/70 text-foreground">
    {text}
  </span>
);

export default Welcome;
