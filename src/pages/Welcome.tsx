
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden p-6">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10 z-0" />
      
      {/* Animated dots */}
      <div className="absolute inset-0 z-0 opacity-30">
        {Array.from({ length: 100 }).map((_, i) => (
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
              <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <div className="h-8 w-8 rounded-lg bg-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl font-display font-bold tracking-tight mb-2 text-gradient">
              TradeInsight AI
            </h1>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-8">
              Your intelligent trading companion powered by advanced analytics and AI
            </p>
          </div>
        )}
        
        {loading ? (
          <div className="animate-fade-in">
            <div className="h-1.5 bg-secondary rounded-full w-full max-w-xs mx-auto mb-4 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
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
          <div className="animate-scale-in">
            <Button 
              onClick={handleEnter} 
              className="px-8 py-6 rounded-xl text-lg font-medium transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Enter Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
