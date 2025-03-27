
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StockData } from "@/services/apiService";
import { ArrowUpIcon, ArrowDownIcon, Plus, Search, MoreHorizontal, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const StockWatchlist = () => {
  const [filter, setFilter] = useState("");
  const [timeFrame, setTimeFrame] = useState("daily");
  
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["watchlist", timeFrame],
    queryFn: async () => {
      // In a real app, this would call the Upstox API
      return new Promise<StockData[]>(resolve => {
        setTimeout(() => {
          import('@/services/apiService').then(({ fetchWatchlist }) => {
            fetchWatchlist(timeFrame).then(resolve);
          });
        }, 600);
      });
    }
  });
  
  const filteredStocks = stocks?.filter(stock => 
    stock.symbol.toLowerCase().includes(filter.toLowerCase()) || 
    stock.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="glass-panel dark:bg-[#18191E] p-4 md:p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">Watchlist</h2>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-secondary/50">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stocks..."
            className="pl-9 bg-secondary/30 dark:bg-black/20 border-border/50"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-secondary/30 dark:bg-black/20">
            <TabsTrigger 
              value="daily" 
              onClick={() => setTimeFrame("daily")}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger 
              value="weekly" 
              onClick={() => setTimeFrame("weekly")}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger 
              value="monthly" 
              onClick={() => setTimeFrame("monthly")}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="mt-4 h-[350px] pr-1">
        <div className="space-y-1">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex p-2.5 rounded-lg">
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-16 mb-2"></div>
                  <div className="h-3 bg-muted/60 rounded w-24"></div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-muted rounded w-14 mb-2 ml-auto"></div>
                  <div className="h-3 bg-muted/60 rounded w-10 ml-auto"></div>
                </div>
              </div>
            ))
          ) : (
            filteredStocks?.length ? (
              filteredStocks.map((stock) => (
                <WatchlistItem key={stock.symbol} stock={stock} />
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                {filter ? "No matching stocks found" : "Your watchlist is empty"}
              </div>
            )
          )}
        </div>
      </ScrollArea>
      
      <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mt-4 pt-3 border-t border-border/50">
        <Clock className="h-3 w-3" />
        <span>Last updated: 16:00 IST</span>
      </div>
    </div>
  );
};

const WatchlistItem = ({ stock }: { stock: StockData }) => {
  const isPositive = stock.changePercent >= 0;
  
  return (
    <div className="flex justify-between items-center p-3 hover:bg-secondary/40 dark:hover:bg-black/20 rounded-lg transition-colors cursor-pointer group">
      <div>
        <p className="font-medium flex items-center gap-1.5">
          {stock.symbol}
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </p>
        <p className="text-xs text-muted-foreground">{stock.name}</p>
      </div>
      <div className="text-right">
        <p className="font-medium font-mono">₹{stock.price.toFixed(2)}</p>
        <p className={cn(
          "text-xs flex items-center gap-0.5 justify-end font-medium",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {isPositive ? (
            <ArrowUpIcon className="h-3 w-3" />
          ) : (
            <ArrowDownIcon className="h-3 w-3" />
          )}
          {isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default StockWatchlist;
