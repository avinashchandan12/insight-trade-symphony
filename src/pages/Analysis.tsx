
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  LayoutGrid, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Plus,
  Code,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import StrategySignals from "@/components/analysis/StrategySignals";
import AiInsights from "@/components/dashboard/AiInsights";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Popular strategies
const strategies = [
  { id: 1, name: "Mean Reversion Strategy", active: true, description: "Buy stocks that have fallen significantly and sell stocks that have risen significantly over the past week." },
  { id: 2, name: "Momentum Strategy", active: false, description: "Buy stocks that are trending up with strong volume and sell when momentum weakens." },
  { id: 3, name: "Breakout Strategy", active: false, description: "Buy stocks breaking out of consolidation patterns with high volume and clear resistance levels." },
  { id: 4, name: "Gap & Go Strategy", active: false, description: "Buy stocks that gap up on high volume and momentum, sell when momentum stalls." }
];

// Buy signal stocks
const buySignals = [
  { symbol: "LT", name: "Larsen & Toubro", price: 2340.6, changePercent: -8.76, period: "weekly" },
  { symbol: "ICICI", name: "ICICI Bank", price: 1020.4, changePercent: -8.9, period: "monthly" },
  { symbol: "ITC", name: "ITC Limited", price: 380.25, changePercent: -12.34, period: "monthly" },
  { symbol: "HDFC", name: "HDFC Bank", price: 1495.6, changePercent: -7.12, period: "monthly" }
];

// Sell signal stocks
const sellSignals = [
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 10450.75, changePercent: 9.87, period: "weekly" },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 450.75, changePercent: 8.45, period: "monthly" },
  { symbol: "INFY", name: "Infosys", price: 1580.25, changePercent: 11.23, period: "monthly" },
  { symbol: "SBIN", name: "State Bank of India", price: 620.3, changePercent: 16.54, period: "yearly" }
];

// Mean reversion strategy rules
const meanReversionRules = `# Mean Reversion Strategy

## Rules:

### Buy Conditions:
- Stock has dropped by at least 10% in the past week
- Stock is above its 200-day moving average
- RSI is below 30 (oversold)

### Sell Conditions:
- Stock has gained at least 7% from purchase price
- Stock has been held for more than 30 days
- RSI moves above 70 (overbought)

## Risk Management:
- Stop loss at 5% below purchase price
- Position size not more than 5% of portfolio`;

const Analysis = () => {
  const [viewMode, setViewMode] = useState<'split' | 'ai'>('split');
  const [timeframe, setTimeframe] = useState("1m");
  const [activeStrategy, setActiveStrategy] = useState(strategies[0]);
  const [signalType, setSignalType] = useState<'buy' | 'sell'>('buy');
  const [editorMode, setEditorMode] = useState<'editor' | 'preview'>('preview');
  
  // Handle strategy activation
  const handleStrategyClick = (strategy: typeof strategies[0]) => {
    setActiveStrategy(strategy);
    toast.success(`${strategy.name} activated`);
  };
  
  // Create new strategy
  const handleNewStrategy = () => {
    toast.info("Create new strategy - feature coming soon");
  };
  
  return (
    <AppLayout>
      <div className="py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-display font-bold">Trading Strategies</h1>
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button 
              variant={viewMode === 'split' ? "default" : "outline"} 
              size="sm" 
              className={cn(
                "flex items-center gap-2",
                viewMode === 'split' 
                  ? "bg-gray-800 text-white hover:bg-gray-700" 
                  : "bg-gray-900 border-gray-700 text-gray-300"
              )}
              onClick={() => setViewMode('split')}
            >
              <LayoutGrid className="h-4 w-4" />
              Split View
            </Button>
            <Button 
              variant={viewMode === 'ai' ? "default" : "outline"} 
              size="sm" 
              className={cn(
                "flex items-center gap-2",
                viewMode === 'ai' 
                  ? "bg-gray-800 text-white hover:bg-gray-700" 
                  : "bg-gray-900 border-gray-700 text-gray-300"
              )}
              onClick={() => setViewMode('ai')}
            >
              <Brain className="h-4 w-4" />
              AI View
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleNewStrategy}
            >
              <Plus className="h-4 w-4" />
              New Strategy
            </Button>
          </div>
        </div>

        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-6">
              <Card className="dark:bg-[#18191E] border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle>My Strategies</CardTitle>
                  <p className="text-sm text-muted-foreground">Select a strategy to edit or view</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {strategies.map((strategy) => (
                    <Button 
                      key={strategy.id}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-auto py-3 px-4 border-gray-800",
                        strategy.id === activeStrategy.id 
                          ? "bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-600" 
                          : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                      )}
                      onClick={() => handleStrategyClick(strategy)}
                    >
                      {strategy.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="dark:bg-[#18191E] border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle>Market Opportunities</CardTitle>
                  <p className="text-sm text-muted-foreground">Potential trades based on your strategies</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Button 
                      variant="outline" 
                      className={cn(
                        "bg-gray-900 border-gray-800 justify-center",
                        signalType === 'buy' && "border-emerald-600 text-white"
                      )}
                      onClick={() => setSignalType('buy')}
                    >
                      Buy Signals
                    </Button>
                    <Button 
                      variant="outline" 
                      className={cn(
                        "bg-gray-900 border-gray-800 justify-center text-gray-300",
                        signalType === 'sell' && "border-emerald-600 text-white"
                      )}
                      onClick={() => setSignalType('sell')}
                    >
                      Sell Signals
                    </Button>
                  </div>
                  
                  <div className="space-y-3 max-h-[320px] overflow-y-auto">
                    {(signalType === 'buy' ? buySignals : sellSignals).map((stock) => (
                      <div 
                        key={stock.symbol} 
                        className="flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800 hover:border-gray-700"
                      >
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-sm text-gray-400">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{stock.price.toLocaleString()}</div>
                          <div className={`text-sm flex items-center justify-end ${
                            stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {stock.changePercent > 0 ? (
                              <TrendingUp className="h-3.5 w-3.5 mr-1" />
                            ) : (
                              <TrendingDown className="h-3.5 w-3.5 mr-1" />
                            )}
                            {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}% ({stock.period})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-7">
              <Card className="dark:bg-[#18191E] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>{activeStrategy.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{activeStrategy.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={editorMode === 'editor' ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        editorMode === 'editor' 
                          ? "bg-gray-800 text-white" 
                          : "bg-gray-900 border-gray-700 text-gray-400"
                      )}
                      onClick={() => setEditorMode('editor')}
                    >
                      Editor
                    </Button>
                    <Button 
                      variant={editorMode === 'preview' ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        editorMode === 'preview' 
                          ? "bg-gray-800 text-white" 
                          : "bg-gray-900 border-gray-700 text-gray-400"
                      )}
                      onClick={() => setEditorMode('preview')}
                    >
                      Preview
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-md p-4 font-mono text-sm text-gray-300">
                    <pre className="whitespace-pre-wrap">{meanReversionRules}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <AiInsights type="strategy" timeframe={timeframe} />
        )}

        {/* Strategy Signals section (visible in both views) */}
        <div className="mt-6">
          <StrategySignals />
        </div>
      </div>
    </AppLayout>
  );
};

export default Analysis;
