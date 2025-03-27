
import { useQuery } from "@tanstack/react-query";
import { fetchTrades, Trade } from "@/services/apiService";
import { ArrowUpRight, ArrowDownRight, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TradeTracker = () => {
  const { data: trades, isLoading } = useQuery({
    queryKey: ["trades"],
    queryFn: fetchTrades
  });
  
  return (
    <div className="glass-panel p-5">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Recent Trades</h2>
          <p className="text-muted-foreground text-sm">Your latest market activities</p>
        </div>
        <Button size="sm" variant="secondary">View All</Button>
      </div>
      
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {trades?.map((trade) => (
            <TradeItem key={trade.id} trade={trade} />
          ))}
          
          {trades?.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No trades recorded yet</p>
              <Button variant="outline" size="sm">Add Your First Trade</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TradeItem = ({ trade }: { trade: Trade }) => {
  const date = new Date(trade.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="bg-secondary/40 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mr-3",
            trade.type === 'buy' ? "bg-success/20" : "bg-destructive/20"
          )}>
            {trade.type === 'buy' ? (
              <ArrowUpRight className={cn("h-5 w-5", "text-success")} />
            ) : (
              <ArrowDownRight className={cn("h-5 w-5", "text-destructive")} />
            )}
          </div>
          <div>
            <h3 className="font-medium">{trade.symbol}</h3>
            <p className="text-xs text-muted-foreground capitalize">{trade.type} • {trade.status}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono font-semibold">${(trade.price * trade.quantity).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{trade.quantity} @ ${trade.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{formattedDate} • {formattedTime}</span>
        </div>
        
        {trade.status === 'closed' && trade.profitLoss !== undefined && (
          <div className={cn(
            "flex items-center font-medium",
            trade.profitLoss >= 0 ? "text-success" : "text-destructive"
          )}>
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            <span>{trade.profitLoss >= 0 ? '+' : ''}{trade.profitLoss.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeTracker;
