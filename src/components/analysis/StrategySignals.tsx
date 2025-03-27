
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
  RotateCw,
  TrendingDown,
  TrendingUp 
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

// Dummy data for buy signals - stocks that are down significantly
const buySignalsData = [
  { symbol: "LT", name: "Larsen & Toubro", price: 2340.6, changePercent: -8.76, period: "weekly" },
  { symbol: "ICICI", name: "ICICI Bank", price: 1020.4, changePercent: -8.9, period: "monthly" },
  { symbol: "ITC", name: "ITC Limited", price: 380.25, changePercent: -12.34, period: "monthly" },
  { symbol: "HDFC", name: "HDFC Bank", price: 1495.6, changePercent: -7.12, period: "monthly" }
];

// Dummy data for sell signals - stocks that are up significantly
const sellSignalsData = [
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 10450.75, changePercent: 9.87, period: "weekly" },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 450.75, changePercent: 8.45, period: "monthly" },
  { symbol: "INFY", name: "Infosys", price: 1580.25, changePercent: 11.23, period: "monthly" },
  { symbol: "SBIN", name: "State Bank of India", price: 620.3, changePercent: 16.54, period: "yearly" }
];

// Define the default strategy parameters
const DEFAULT_STRATEGY = {
  buyThreshold: -5, // Buy when stock falls by 5%
  sellThreshold: 10, // Sell when stock rises by 10%
  timeframe: "1d"
};

type TimeRange = "1d" | "1w" | "1m" | "1y";

const StrategySignals = () => {
  const [selectedIndex, setSelectedIndex] = useState("NIFTY 50");
  const [timeRange, setTimeRange] = useState<TimeRange>("1d");
  const [activeTab, setActiveTab] = useState("index");
  const [strategy, setStrategy] = useState(DEFAULT_STRATEGY);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [signalType, setSignalType] = useState<'buy' | 'sell'>('buy');

  // Fetch stock data - using mock data directly
  const { isLoading, refetch } = useQuery({
    queryKey: ["watchlist", timeRange],
    queryFn: () => fetchWatchlist(timeRange),
    enabled: false // Disable auto-fetching since we're using mock data
  });

  // Run the AI analysis
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Prepare data for AI analysis
      const totalStocks = buySignalsData.length + sellSignalsData.length;
      const buyCount = buySignalsData.length;
      const sellCount = sellSignalsData.length;
      
      const prompt = `
        Based on market data for ${selectedIndex} over the past ${timeRange === "1d" ? "day" : 
        timeRange === "1w" ? "week" : 
        timeRange === "1m" ? "month" : "year"}:
        
        - ${buyCount} out of ${totalStocks} stocks (${((buyCount/totalStocks)*100).toFixed(1)}%) are showing buy signals (down by ${Math.abs(strategy.buyThreshold)}% or more)
        - ${sellCount} out of ${totalStocks} stocks (${((sellCount/totalStocks)*100).toFixed(1)}%) are showing sell signals (up by ${strategy.sellThreshold}% or more)
        
        Top stocks to buy: ${buySignalsData.slice(0, 3).map(s => s.name).join(", ")}
        Top stocks to sell: ${sellSignalsData.slice(0, 3).map(s => s.name).join(", ")}
        
        Consider the current market conditions and provide a brief analysis of these signals. 
        Are these signals indicating a broader market trend? 
        Would you recommend following these signals strictly or making adjustments?
        Is this a good time to be aggressive or conservative with this strategy?
      `;
      
      // Get AI analysis - simulate with delay
      setTimeout(() => {
        setAiAnalysis(
          "Based on the current signals, there appears to be a sector rotation happening in the Indian market. The technology and banking stocks showing buy signals (down significantly) may represent a tactical opportunity, especially given their strong fundamentals. These are quality companies experiencing temporary drawdowns.\n\nThe sell signals in consumer discretionary stocks like Maruti reflect potential overextension after their recent rallies. This divergence suggests a rotational market rather than a broad directional trend.\n\nRecommendation: Consider gradually building positions in the quality stocks showing buy signals, but remain selective and maintain proper position sizing. This mean reversion strategy works best in rangebound markets, which appears to be the current condition."
        );
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      toast.error("Failed to generate AI analysis");
      console.error("AI analysis error:", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="dark:bg-[#18191E] rounded-lg p-5 border border-gray-800">
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
        <TabsList className="grid grid-cols-2 mb-6 bg-gray-800/40">
          <TabsTrigger value="index" className="rounded-md data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
            Analyze Index
          </TabsTrigger>
          <TabsTrigger value="stocks" className="rounded-md data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
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
            <SelectTrigger className="w-full border-gray-700 bg-gray-800/40 focus:ring-emerald-500/30">
              <SelectValue placeholder="Select an index" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
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
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-gray-800/60 border-gray-700 text-gray-300"
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
                  <SelectTrigger className="w-full bg-gray-800/40 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
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
                  <SelectTrigger className="w-full bg-gray-800/40 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
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
      
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className={`bg-gray-800/40 border-gray-700 ${signalType === 'buy' ? 'border-emerald-600 text-white' : 'text-gray-300'}`}
            onClick={() => setSignalType('buy')}
          >
            Buy Signals
          </Button>
          <Button
            variant="outline"
            className={`bg-gray-800/40 border-gray-700 ${signalType === 'sell' ? 'border-emerald-600 text-white' : 'text-gray-300'}`}
            onClick={() => setSignalType('sell')}
          >
            Sell Signals
          </Button>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {(signalType === 'buy' ? buySignalsData : sellSignalsData).map((stock) => (
            <div 
              key={stock.symbol} 
              className="flex justify-between items-center p-3 bg-gray-900/40 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div>
                <div className="font-semibold">{stock.symbol}</div>
                <div className="text-sm text-gray-400">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{stock.price.toLocaleString()}</div>
                <div className={`text-sm flex items-center justify-end ${stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
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
      </div>
      
      {aiAnalysis && (
        <div className="mt-6 bg-gray-800/30 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="p-1.5 rounded-full bg-emerald-500/20 mr-2">
              <Brain className="h-4 w-4 text-emerald-500" />
            </div>
            <h3 className="font-medium">AI Analysis</h3>
          </div>
          <p className="text-sm leading-relaxed">{aiAnalysis}</p>
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Powered by DeepSeek AI - Analysis is for informational purposes only
      </p>
    </div>
  );
};

export default StrategySignals;
