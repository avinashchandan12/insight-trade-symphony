
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import StockWatchlist from "@/components/dashboard/StockWatchlist";
import { fetchWatchlist } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Watchlist = () => {
  const [activeTimeFrame, setActiveTimeFrame] = useState("daily");
  
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist
  });

  return (
    <AppLayout>
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Watchlist</h1>
            <p className="text-muted-foreground">Monitor your favorite stocks and market movers</p>
          </div>
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Add Stocks</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Market Performance</h2>
                <Tabs defaultValue="daily" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="daily" onClick={() => setActiveTimeFrame("daily")}>
                      Daily
                    </TabsTrigger>
                    <TabsTrigger value="weekly" onClick={() => setActiveTimeFrame("weekly")}>
                      Weekly
                    </TabsTrigger>
                    <TabsTrigger value="monthly" onClick={() => setActiveTimeFrame("monthly")}>
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger value="yearly" onClick={() => setActiveTimeFrame("yearly")}>
                      Yearly
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array(6).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-20" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {stocks?.map((stock) => (
                      <div 
                        key={stock.symbol} 
                        className="p-4 rounded-lg border border-border/50 flex flex-col"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{stock.symbol}</span>
                          <span 
                            className={stock.changePercent >= 0 ? "text-success" : "text-destructive"}
                          >
                            {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{stock.name}</span>
                        <span className="text-lg font-semibold mt-2">₹{stock.price.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground">
                          {activeTimeFrame} change: {stock.change >= 0 ? "+" : ""}₹{stock.change.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold mb-4">Historical Performance</h2>
              <div className="h-[300px] flex items-center justify-center bg-secondary/40 rounded-lg">
                <p className="text-muted-foreground">Stock chart for {activeTimeFrame} view will appear here</p>
              </div>
            </div>
          </div>
          
          <div>
            <StockWatchlist />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Watchlist;
