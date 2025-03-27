
import AppLayout from "@/components/layout/AppLayout";
import MarketOverview from "@/components/dashboard/MarketOverview";
import StockWatchlist from "@/components/dashboard/StockWatchlist";
import AiInsights from "@/components/dashboard/AiInsights";
import TradeTracker from "@/components/dashboard/TradeTracker";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Your trading overview and market insights</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <MarketOverview />
            <TradeTracker />
          </div>
          <div className="space-y-4 md:space-y-6">
            <AiInsights />
            <StockWatchlist />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
