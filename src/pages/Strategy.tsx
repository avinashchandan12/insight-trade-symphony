
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiwaaliPatternIcon } from "@/assets/icons/IndianMarket";

// Renamed the component to StrategyPage to avoid conflicts
const StrategyPage = () => {
  const [activeTab, setActiveTab] = useState("market-overview");
  
  return (
    <AppLayout>
      <div className="py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Strategy</h1>
            <p className="text-muted-foreground">Create and manage your trading strategies</p>
          </div>
          <div className="hidden md:block absolute top-16 right-16 opacity-5">
            <DiwaaliPatternIcon className="w-40 h-40 text-primary" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="market-overview" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="market-overview">Market Overview</TabsTrigger>
                <TabsTrigger value="my-strategies">My Strategies</TabsTrigger>
                <TabsTrigger value="backtesting">Backtesting</TabsTrigger>
              </TabsList>
              
              <TabsContent value="market-overview" className="space-y-6">
                <MarketMovers />
                <TrendingStocks />
              </TabsContent>
              
              <TabsContent value="my-strategies" className="space-y-6">
                <Card className="p-5 glass-panel">
                  <h2 className="text-xl font-semibold mb-4">My Trading Strategies</h2>
                  <p className="text-muted-foreground mb-6">Create, edit, and test your trading strategies</p>
                  
                  <div className="space-y-4">
                    <StrategyCard 
                      name="MACD Crossover" 
                      description="Buy when MACD crosses above signal line, sell when it crosses below" 
                      winRate={68} 
                      tags={["Technical", "Momentum"]}
                    />
                    
                    <StrategyCard 
                      name="Nifty Swing Trade" 
                      description="Buy Nifty on support levels with positive momentum indicators" 
                      winRate={72} 
                      tags={["Index", "Swing"]}
                    />
                    
                    <StrategyCard 
                      name="Gap & Go" 
                      description="Buy stocks that gap up on high volume and momentum" 
                      winRate={65} 
                      tags={["Momentum", "Intraday"]}
                    />
                  </div>
                  
                  <Button className="w-full mt-6">
                    Create New Strategy
                  </Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="backtesting" className="space-y-6">
                <Card className="p-5 glass-panel">
                  <h2 className="text-xl font-semibold mb-4">Backtest Your Strategies</h2>
                  <p className="text-muted-foreground mb-6">Test your trading strategies against historical data</p>
                  
                  {/* Backtest content would go here */}
                  <div className="rounded-lg border border-border/40 p-8 text-center">
                    <h3 className="font-medium mb-2">Select a strategy to backtest</h3>
                    <p className="text-muted-foreground text-sm">Choose from your saved strategies or create a new one</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="p-5 glass-panel">
              <h2 className="text-xl font-semibold mb-4">Quick Insights</h2>
              <div className="space-y-4">
                <InsightCard 
                  title="Market Sentiment" 
                  value="Bullish" 
                  description="Nifty up 1.2% this week" 
                  trend="up"
                />
                
                <InsightCard 
                  title="Volatility" 
                  value="Moderate" 
                  description="India VIX at 14.3" 
                  trend="neutral"
                />
                
                <InsightCard 
                  title="Foreign Inflows" 
                  value="Positive" 
                  description="FIIs net buyers for 3 days" 
                  trend="up"
                />
              </div>
            </Card>
            
            <Card className="p-5 glass-panel">
              <h2 className="text-xl font-semibold mb-4">Sector Performance</h2>
              <div className="space-y-2">
                <SectorItem name="IT" change={2.3} />
                <SectorItem name="Banking" change={1.7} />
                <SectorItem name="Pharma" change={-0.8} />
                <SectorItem name="Auto" change={0.5} />
                <SectorItem name="FMCG" change={-0.3} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const MarketMovers = () => (
  <Card className="p-5 glass-panel">
    <h2 className="text-xl font-semibold mb-4">Market Movers</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <h3 className="font-medium text-destructive">Top Losers (Weekly)</h3>
        <div className="space-y-2">
          <StockItem name="HDFCBANK" change={-8.5} price="1,525.60" />
          <StockItem name="TATASTEEL" change={-7.2} price="134.80" />
          <StockItem name="AXISBANK" change={-6.3} price="975.30" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-medium text-success">Top Gainers (Weekly)</h3>
        <div className="space-y-2">
          <StockItem name="INFY" change={10.2} price="1,840.50" />
          <StockItem name="RELIANCE" change={8.7} price="2,980.75" />
          <StockItem name="TCS" change={7.1} price="3,560.25" />
        </div>
      </div>
    </div>
  </Card>
);

const TrendingStocks = () => (
  <Card className="p-5 glass-panel">
    <h2 className="text-xl font-semibold mb-4">Trending Stocks</h2>
    <div className="space-y-3">
      <StockItem name="BHARTIARTL" change={3.5} price="1,125.40" volume="High" />
      <StockItem name="ICICIBANK" change={2.8} price="1,030.75" volume="High" />
      <StockItem name="SBIN" change={1.9} price="780.30" volume="Medium" />
      <StockItem name="LT" change={4.2} price="2,970.60" volume="High" />
      <StockItem name="WIPRO" change={-2.1} price="450.80" volume="Medium" />
    </div>
  </Card>
);

const StockItem = ({ name, change, price, volume }: { name: string, change: number, price: string, volume?: string }) => (
  <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40">
    <div>
      <h4 className="font-medium">{name}</h4>
      <p className="text-xs text-muted-foreground">₹{price}</p>
    </div>
    <div className="flex items-center">
      {volume && (
        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded mr-2">
          {volume}
        </span>
      )}
      <span className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
    </div>
  </div>
);

const StrategyCard = ({ name, description, winRate, tags }: { name: string, description: string, winRate: number, tags: string[] }) => (
  <div className="border border-border/40 rounded-lg p-4 hover:bg-secondary/30 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium">{name}</h3>
      <span className={`text-sm font-medium ${winRate >= 70 ? 'text-success' : winRate >= 60 ? 'text-accent' : 'text-muted-foreground'}`}>
        {winRate}% Win
      </span>
    </div>
    <p className="text-sm text-muted-foreground mb-3">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Badge key={tag} variant="outline" className="text-xs bg-secondary/40">
          {tag}
        </Badge>
      ))}
    </div>
  </div>
);

const InsightCard = ({ title, value, description, trend }: { title: string, value: string, description: string, trend: 'up' | 'down' | 'neutral' }) => (
  <div className="border border-border/40 rounded-lg p-3">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-medium">{title}</h3>
      <span className={`text-xs px-2 py-0.5 rounded ${
        trend === 'up' ? 'bg-success/20 text-success' : 
        trend === 'down' ? 'bg-destructive/20 text-destructive' : 
        'bg-accent/20 text-accent'
      }`}>
        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {value}
      </span>
    </div>
    <p className="text-xs text-muted-foreground mt-1">{description}</p>
  </div>
);

const SectorItem = ({ name, change }: { name: string, change: number }) => (
  <div className="flex items-center justify-between p-2 rounded bg-secondary/40">
    <span className="font-medium">{name}</span>
    <span className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
      {change >= 0 ? '+' : ''}{change}%
    </span>
  </div>
);

export default StrategyPage;
