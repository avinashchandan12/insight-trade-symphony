
import AppLayout from "@/components/layout/AppLayout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import StockWatchlist from "@/components/dashboard/StockWatchlist";
import AiInsights from "@/components/dashboard/AiInsights";
import TradeTracker from "@/components/dashboard/TradeTracker";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your trading activity and market insights</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-muted-foreground">Refresh: 1m</div>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MarketOverview />
            <AiInsights />
            <TradeTracker />
          </div>
          <div className="space-y-6">
            <StockWatchlist />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
