
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Brain, 
  Calendar, 
  ChevronDown, 
  Clock, 
  ChevronsDown, 
  ChevronsUp, 
  RotateCw 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchWatchlist } from "@/services/apiService";
import { getDeepseekAnalysis } from "@/services/aiService";
import { toast } from "sonner";

// Define the default strategy parameters
const DEFAULT_STRATEGY = {
  buyThreshold: -5, // Buy when stock falls by 5%
  sellThreshold: 10, // Sell when stock rises by 10%
  timeframe: "1d"
};

type TimeRange = "1d" | "1w" | "1m" | "3m" | "6m" | "1y";

interface StockSignal {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  signal: "buy" | "sell" | "hold";
}

const StrategySignals = () => {
  const [selectedIndex, setSelectedIndex] = useState("NIFTY 50");
  const [timeRange, setTimeRange] = useState<TimeRange>("1d");
  const [activeTab, setActiveTab] = useState("index");
  const [strategy, setStrategy] = useState(DEFAULT_STRATEGY);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  // Fetch stock data
  const { data: stocksData, isLoading, refetch } = useQuery({
    queryKey: ["watchlist", timeRange],
    queryFn: () => fetchWatchlist(timeRange)
  });

  // Process stock data to get buy/sell signals
  const processedStocks = stocksData?.map(stock => {
    let signal: "buy" | "sell" | "hold" = "hold";
    
    if (stock.changePercent <= strategy.buyThreshold) {
      signal = "buy";
    } else if (stock.changePercent >= strategy.sellThreshold) {
      signal = "sell";
    }
    
    return {
      ...stock,
      signal
    };
  }) || [];

  // Filter signals
  const buySignals = processedStocks.filter(stock => stock.signal === "buy");
  const sellSignals = processedStocks.filter(stock => stock.signal === "sell");

  // Run the AI analysis
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Prepare data for AI analysis
      const totalStocks = processedStocks.length;
      const buyCount = buySignals.length;
      const sellCount = sellSignals.length;
      
      const prompt = `
        Based on market data for ${selectedIndex} over the past ${timeRange === "1d" ? "day" : 
        timeRange === "1w" ? "week" : 
        timeRange === "1m" ? "month" : 
        timeRange === "3m" ? "3 months" : 
        timeRange === "6m" ? "6 months" : "year"}:
        
        - ${buyCount} out of ${totalStocks} stocks (${((buyCount/totalStocks)*100).toFixed(1)}%) are showing buy signals (down by ${Math.abs(strategy.buyThreshold)}% or more)
        - ${sellCount} out of ${totalStocks} stocks (${((sellCount/totalStocks)*100).toFixed(1)}%) are showing sell signals (up by ${strategy.sellThreshold}% or more)
        
        Top stocks to buy: ${buySignals.slice(0, 3).map(s => s.name).join(", ")}
        Top stocks to sell: ${sellSignals.slice(0, 3).map(s => s.name).join(", ")}
        
        Consider the current market conditions and provide a brief analysis of these signals. 
        Are these signals indicating a broader market trend? 
        Would you recommend following these signals strictly or making adjustments?
        Is this a good time to be aggressive or conservative with this strategy?
      `;
      
      // Get AI analysis
      const analysis = await getDeepseekAnalysis(prompt);
      setAiAnalysis(analysis);
    } catch (error) {
      toast.error("Failed to generate AI analysis");
      console.error("AI analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="glass-panel p-5">
      <div className="flex items-center mb-4">
        <div className="mr-3 p-2 rounded-lg bg-emerald-500/20">
          <Brain className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">DeepSeek AI Strategy Signals</h2>
          <p className="text-muted-foreground text-sm">
            Get advanced AI-powered insights and trading recommendations
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="index" className="mt-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="index" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Analyze Index
          </TabsTrigger>
          <TabsTrigger value="stocks" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Analyze Stocks
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Index</label>
          <Select 
            value={selectedIndex} 
            onValueChange={setSelectedIndex}
          >
            <SelectTrigger className="w-full border border-emerald-500/30 focus:ring-emerald-500/30">
              <SelectValue placeholder="Select an index" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NIFTY 50">Nifty 50</SelectItem>
              <SelectItem value="SENSEX">Sensex</SelectItem>
              <SelectItem value="NIFTY BANK">Nifty Bank</SelectItem>
              <SelectItem value="NIFTY IT">Nifty IT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Time Range</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Day", value: "1d", icon: Clock },
              { label: "Week", value: "1w", icon: Calendar },
              { label: "Month", value: "1m", icon: Calendar },
              { label: "Year", value: "1y", icon: Calendar }
            ].map((option) => (
              <Button
                key={option.value}
                variant={timeRange === option.value ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full",
                  timeRange === option.value 
                    ? "bg-emerald-600 hover:bg-emerald-700" 
                    : "bg-secondary/40"
                )}
                onClick={() => setTimeRange(option.value as TimeRange)}
              >
                <option.icon className="h-3.5 w-3.5 mr-1" />
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mt-2">
          <label className="text-sm font-medium mb-2 block">Strategy Settings</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Buy when down by</label>
              <div className="flex items-center mt-1">
                <Select 
                  value={strategy.buyThreshold.toString()} 
                  onValueChange={(value) => setStrategy(prev => ({...prev, buyThreshold: Number(value)}))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[-3, -5, -7, -10, -15].map((threshold) => (
                      <SelectItem key={threshold} value={threshold.toString()}>
                        {Math.abs(threshold)}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="ml-2 p-1.5 rounded-full bg-red-500/20">
                  <ChevronsDown className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Sell when up by</label>
              <div className="flex items-center mt-1">
                <Select 
                  value={strategy.sellThreshold.toString()} 
                  onValueChange={(value) => setStrategy(prev => ({...prev, sellThreshold: Number(value)}))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 7, 10, 15, 20].map((threshold) => (
                      <SelectItem key={threshold} value={threshold.toString()}>
                        {threshold}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="ml-2 p-1.5 rounded-full bg-green-500/20">
                  <ChevronsUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" 
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <RotateCw className="h-4 w-4 mr-2 animate-spin" />
              Running AI Analysis...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Run AI Analysis
            </>
          )}
        </Button>
      </div>
      
      {(buySignals.length > 0 || sellSignals.length > 0) && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buySignals.length > 0 && (
              <div className="bg-secondary/40 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="p-1.5 rounded-full bg-red-500/20 mr-2">
                    <ArrowDownCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <h3 className="font-medium">Buy Signals ({buySignals.length})</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {buySignals.map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center p-2 hover:bg-secondary/60 rounded">
                      <div>
                        <p className="font-medium">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{stock.price.toLocaleString()}</p>
                        <p className="text-xs text-red-500">{stock.changePercent.toFixed(2)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {sellSignals.length > 0 && (
              <div className="bg-secondary/40 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="p-1.5 rounded-full bg-green-500/20 mr-2">
                    <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <h3 className="font-medium">Sell Signals ({sellSignals.length})</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sellSignals.map((stock) => (
                    <div key={stock.symbol} className="flex justify-between items-center p-2 hover:bg-secondary/60 rounded">
                      <div>
                        <p className="font-medium">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{stock.price.toLocaleString()}</p>
                        <p className="text-xs text-green-500">+{stock.changePercent.toFixed(2)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {aiAnalysis && (
        <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="p-1.5 rounded-full bg-emerald-500/20 mr-2">
              <Brain className="h-4 w-4 text-emerald-500" />
            </div>
            <h3 className="font-medium">AI Analysis</h3>
          </div>
          <p className="text-sm leading-relaxed">{aiAnalysis}</p>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        Powered by DeepSeek AI - Analysis is for informational purposes only
      </p>
    </div>
  );
};

export default StrategySignals;
