
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StockData } from "@/services/apiService";
import { ArrowUpIcon, ArrowDownIcon, Plus, Search, MoreHorizontal, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const timeFrames = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const StockWatchlist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFrame, setTimeFrame] = useState("daily");
  
  const { data: stocks, isLoading } = useQuery({
    queryKey: ["watchlist", timeFrame],
    queryFn: async () => {
      const response = await fetch(`/api/watchlist?timeFrame=${timeFrame}`);
      // This is just a mock implementation since we're using the mock data
      // In a real app, we would use the actual API
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
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="gap-1.5">
                <Clock className="h-4 w-4" />
                <span className="capitalize">{timeFrame}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeFrames.map((frame) => (
                <DropdownMenuItem 
                  key={frame.value}
                  onClick={() => setTimeFrame(frame.value)}
                  className={cn(
                    "capitalize",
                    timeFrame === frame.value && "bg-primary/10 font-medium"
                  )}
                >
                  {frame.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm" variant="secondary" className="gap-1.5">
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
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
        <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
          {filteredStocks?.map((stock) => (
            <StockItem key={stock.symbol} stock={stock} timeFrame={timeFrame} />
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

const StockItem = ({ stock, timeFrame }: { stock: StockData, timeFrame: string }) => {
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
          <p className="font-semibold">₹{stock.price.toFixed(2)}</p>
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
            <span className="ml-1 text-xs text-muted-foreground">{timeFrame}</span>
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
