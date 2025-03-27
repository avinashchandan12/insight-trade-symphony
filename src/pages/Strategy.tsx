
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { fetchStrategies, Strategy } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon, ArrowUpIcon, MousePointerSquareDashed, Plus, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for opportunities
const oppData = [
  {
    symbol: "LT",
    name: "Larsen & Toubro",
    price: 2340.6,
    change: -8.76,
    opportunity: "buy",
    reason: "Dropped by 10% in the past week"
  },
  {
    symbol: "ICICI",
    name: "ICICI Bank",
    price: 1020.4,
    change: -5.32,
    opportunity: "buy",
    reason: "RSI below 30 (oversold)"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy",
    price: 3456.8,
    change: 7.21,
    opportunity: "sell",
    reason: "Gained 7% from purchase price"
  },
  {
    symbol: "WIPRO",
    name: "Wipro Limited",
    price: 432.5,
    change: 10.45,
    opportunity: "sell",
    reason: "RSI above 70 (overbought)"
  }
];

const Strategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [view, setView] = useState<'editor' | 'preview'>('preview');
  
  const { data: strategies = [], isLoading } = useQuery({
    queryKey: ["strategies"],
    queryFn: fetchStrategies
  });
  
  const handleNewStrategy = () => {
    // This would create a new strategy in a real app
    console.log("Create new strategy");
  };
  
  const selectStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };
  
  return (
    <AppLayout>
      <div className="py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Strategy</h1>
            <p className="text-muted-foreground">Create and manage your trading strategies</p>
          </div>
          <Button onClick={handleNewStrategy}>
            <Plus className="mr-2 h-4 w-4" />
            New Strategy
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold mb-4">My Strategies</h2>
              <p className="text-sm text-muted-foreground mb-4">Select a strategy to edit or view</p>
              
              {isLoading ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              ) : (
                <div className="space-y-2">
                  {strategies.map((strategy) => (
                    <div
                      key={strategy.id}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer transition-colors",
                        selectedStrategy?.id === strategy.id
                          ? "bg-primary/20 hover:bg-primary/25"
                          : "hover:bg-secondary/40"
                      )}
                      onClick={() => selectStrategy(strategy)}
                    >
                      <h3 className="font-medium">{strategy.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold mb-4">Market Opportunities</h2>
              <p className="text-sm text-muted-foreground mb-4">Potential trades based on your strategies</p>
              
              <div className="flex gap-2 mb-4">
                <Button 
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-secondary/40 text-primary"
                >
                  Buy Signals
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-secondary/40 text-muted-foreground"
                >
                  Sell Signals
                </Button>
              </div>
              
              <div className="space-y-3">
                {oppData.map((opp, index) => (
                  <div key={index} className="bg-secondary/40 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-secondary/80 flex items-center justify-center mr-3">
                          <span className="font-semibold text-sm">{opp.symbol}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{opp.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{opp.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-semibold">₹{opp.price.toLocaleString()}</p>
                        <div className={cn(
                          "flex items-center justify-end text-xs mt-0.5",
                          opp.change >= 0 ? "text-success" : "text-destructive"
                        )}>
                          {opp.change >= 0 ? (
                            <ArrowUpIcon className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownIcon className="h-3 w-3 mr-1" />
                          )}
                          <span>{Math.abs(opp.change).toFixed(2)}% (weekly)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedStrategy ? (
              <div className="glass-panel p-5">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedStrategy.name}</h2>
                    <p className="text-muted-foreground">{selectedStrategy.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={view === 'editor' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView('editor')}
                      className={view !== 'editor' ? "bg-secondary/40" : ""}
                    >
                      Editor
                    </Button>
                    <Button 
                      variant={view === 'preview' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setView('preview')}
                      className={view !== 'preview' ? "bg-secondary/40" : ""}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
                
                {view === 'preview' ? (
                  <div className="bg-secondary/40 rounded-lg p-5 font-mono text-sm whitespace-pre-wrap overflow-auto">
                    {selectedStrategy.rules}
                  </div>
                ) : (
                  <textarea
                    className="w-full h-96 bg-secondary/40 rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                    value={selectedStrategy.rules}
                    onChange={() => {}}
                  />
                )}
                
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Created on {new Date(selectedStrategy.created).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-secondary/40">
                      <MousePointerSquareDashed className="mr-2 h-4 w-4" />
                      Backtest
                    </Button>
                    <Button>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel flex items-center justify-center p-10 h-72">
                <div className="text-center">
                  <ShieldCheck className="h-10 w-10 text-muted-foreground mb-4 mx-auto" />
                  <h3 className="text-lg font-medium mb-2">No Strategy Selected</h3>
                  <p className="text-muted-foreground mb-4">
                    Select a strategy from the list or create a new one
                  </p>
                  <Button onClick={handleNewStrategy}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Strategy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Strategy;
