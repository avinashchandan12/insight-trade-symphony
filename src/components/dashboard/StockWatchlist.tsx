
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWatchlist, StockData } from "@/services/apiService";
import { ArrowUpIcon, ArrowDownIcon, Plus, Search, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StockWatchlist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist
  });
  
  const filteredStocks = stocks?.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="glass-panel p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Watchlist</h2>
          <p className="text-muted-foreground text-sm">Track your favorite stocks</p>
        </div>
        <Button size="sm" variant="secondary" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search symbols or companies"
          className="pl-9 bg-secondary/40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="space-y-1">
          {filteredStocks?.map((stock) => (
            <StockItem key={stock.symbol} stock={stock} />
          ))}
          
          {filteredStocks?.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No stocks found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StockItem = ({ stock }: { stock: StockData }) => {
  const isPositive = stock.changePercent >= 0;
  
  return (
    <div className="flex items-center justify-between p-3 hover:bg-secondary/40 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/80 flex items-center justify-center">
          <span className="font-semibold text-sm">{stock.symbol.slice(0, 2)}</span>
        </div>
        <div>
          <h3 className="font-medium text-sm">{stock.symbol}</h3>
          <p className="text-xs text-muted-foreground">{stock.name}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold">${stock.price.toFixed(2)}</p>
          <div className={cn(
            "flex items-center justify-end text-xs",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? (
              <ArrowUpIcon className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownIcon className="h-3 w-3 mr-1" />
            )}
            <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StockWatchlist;
