
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrades, Trade } from "@/services/apiService";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, Search, ArrowUpRight, ArrowDownRight, 
  ArrowUpDown, Calendar, Filter, Download, TrendingUp, TrendingDown 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Trades = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'buy' | 'sell'>('all');
  
  const { data: trades = [], isLoading } = useQuery({
    queryKey: ["trades"],
    queryFn: fetchTrades
  });
  
  const filteredTrades = trades.filter(trade => {
    // Apply search filter
    const matchesSearch = 
      trade.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === 'all' ? true : trade.status === statusFilter;
    
    // Apply type filter
    const matchesType = 
      typeFilter === 'all' ? true : trade.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate summary stats
  const totalValue = filteredTrades.reduce((sum, trade) => sum + (trade.price * trade.quantity), 0);
  const openTrades = filteredTrades.filter(trade => trade.status === 'open').length;
  const closedTrades = filteredTrades.filter(trade => trade.status === 'closed').length;
  const profitLoss = filteredTrades
    .filter(trade => trade.status === 'closed' && trade.profitLoss !== undefined)
    .reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
  
  return (
    <AppLayout>
      <div className="py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Trades</h1>
            <p className="text-muted-foreground">Manage and track your trading activity</p>
          </div>
          <Button className="sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Trade
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-panel p-5">
            <p className="text-muted-foreground text-sm mb-1">Total Value</p>
            <p className="text-2xl font-semibold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="glass-panel p-5">
            <p className="text-muted-foreground text-sm mb-1">Open Positions</p>
            <div className="flex items-center">
              <p className="text-2xl font-semibold">{openTrades}</p>
              <div className="ml-2 p-1 rounded bg-success/20">
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
            </div>
          </div>
          <div className="glass-panel p-5">
            <p className="text-muted-foreground text-sm mb-1">Closed Trades</p>
            <div className="flex items-center">
              <p className="text-2xl font-semibold">{closedTrades}</p>
              <div className="ml-2 p-1 rounded bg-secondary">
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="glass-panel p-5">
            <p className="text-muted-foreground text-sm mb-1">Total P&L</p>
            <p className={cn(
              "text-2xl font-semibold",
              profitLoss > 0 ? "text-success" : profitLoss < 0 ? "text-destructive" : ""
            )}>
              {profitLoss > 0 ? "+" : ""}{profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        <div className="glass-panel p-5">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by symbol..."
                className="pl-9 bg-secondary/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-secondary/40"
                onClick={() => {
                  // This would open a filter dialog in a real app
                }}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-secondary/40"
                onClick={() => {
                  // This would download the trades in a real app
                }}
              >
                <Download className="h-4 w-4" />
              </Button>
              <div className="flex">
                <Button 
                  variant={statusFilter === 'all' ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-r-none",
                    statusFilter !== 'all' && "bg-secondary/40"
                  )}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === 'open' ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-none border-x-0",
                    statusFilter !== 'open' && "bg-secondary/40"
                  )}
                  onClick={() => setStatusFilter('open')}
                >
                  Open
                </Button>
                <Button 
                  variant={statusFilter === 'closed' ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-l-none",
                    statusFilter !== 'closed' && "bg-secondary/40"
                  )}
                  onClick={() => setStatusFilter('closed')}
                >
                  Closed
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="py-20 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : filteredTrades.length > 0 ? (
            <div className="rounded-lg border border-border/40 overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/60 text-left">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium">Symbol</th>
                    <th className="px-4 py-3 text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-sm font-medium">
                      <div className="flex items-center cursor-pointer">
                        Price
                        <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium">Quantity</th>
                    <th className="px-4 py-3 text-sm font-medium">
                      <div className="flex items-center cursor-pointer">
                        Date
                        <Calendar className="ml-1 h-3.5 w-3.5" />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-sm font-medium text-right">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredTrades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-secondary/30 transition-colors cursor-pointer">
                      <td className="px-4 py-3 font-medium">{trade.symbol}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className={cn(
                            "w-6 h-6 rounded flex items-center justify-center mr-2",
                            trade.type === 'buy' ? "bg-success/20" : "bg-destructive/20"
                          )}>
                            {trade.type === 'buy' ? (
                              <ArrowUpRight className={cn("h-3.5 w-3.5", "text-success")} />
                            ) : (
                              <ArrowDownRight className={cn("h-3.5 w-3.5", "text-destructive")} />
                            )}
                          </div>
                          <span className="capitalize">{trade.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">${trade.price.toFixed(2)}</td>
                      <td className="px-4 py-3">{trade.quantity}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(trade.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium",
                          trade.status === 'open' ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                        )}>
                          {trade.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div>
                          <p className="font-semibold">${(trade.price * trade.quantity).toFixed(2)}</p>
                          {trade.status === 'closed' && trade.profitLoss !== undefined && (
                            <p className={cn(
                              "text-xs font-medium",
                              trade.profitLoss >= 0 ? "text-success" : "text-destructive"
                            )}>
                              {trade.profitLoss >= 0 ? '+' : ''}{trade.profitLoss.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground mb-2">No trades found</p>
              <p className="text-sm text-muted-foreground">Try changing your filters or add a new trade</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Trades;
