
import { useQuery } from "@tanstack/react-query";
import { MarketSummary } from "@/services/apiService";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpIcon, ArrowDownIcon, MoreVertical, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChartContainer } from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useEffect } from "react";

// Mock data for the chart
const chartData = [
  { time: "9:15", value: 22531 },
  { time: "9:30", value: 22580 },
  { time: "10:00", value: 22650 },
  { time: "10:30", value: 22630 },
  { time: "11:00", value: 22600 },
  { time: "11:30", value: 22650 },
  { time: "12:00", value: 22700 },
  { time: "12:30", value: 22720 },
  { time: "13:00", value: 22740 },
  { time: "13:30", value: 22735 },
  { time: "14:00", value: 22780 },
  { time: "14:30", value: 22810 },
  { time: "15:00", value: 22780 },
  { time: "15:30", value: 22720 }
];

const MarketOverview = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: marketData, isLoading } = useQuery({
    queryKey: ["marketSummary"],
    queryFn: async () => {
      try {
        // In a real application, this would call the Upstox API
        // For now, we're using mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return [
          { indexName: "NIFTY 50", value: 22720, change: 89.15, changePercent: 0.39 },
          { indexName: "SENSEX", value: 74762, change: 314.25, changePercent: 0.42 },
          { indexName: "NIFTY BANK", value: 48214, change: -87.30, changePercent: -0.18 },
          { indexName: "NIFTY IT", value: 38520, change: 483.75, changePercent: 1.27 }
        ];
      } catch (error) {
        console.error("Error fetching market data:", error);
        throw error;
      }
    }
  });

  // Auto-scroll effect for ticker at the bottom
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const speed = 0.5; // pixels per frame
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollAmount += speed;
      scrollContainer.scrollLeft = scrollAmount;
      
      // Reset scroll when it reaches the end
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
      
      requestAnimationFrame(scroll);
    };
    
    const animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [marketData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 backdrop-blur-sm p-2 rounded-md border border-border/50 shadow-md">
          <p className="text-xs font-medium">{`${payload[0].payload.time}`}</p>
          <p className="text-sm text-primary font-mono">{`${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel dark:bg-[#111418] p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Market Overview</h2>
        </div>
        <button className="icon-button">
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {marketData?.map((item: MarketSummary) => (
              <MarketCard key={item.indexName} marketData={item} />
            ))}
          </div>
          
          <div className="h-72 mt-8">
            <ChartContainer 
              config={{}} 
              className="text-xs dark:text-gray-400 [&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-800 [&_.recharts-cartesian-grid-vertical_line]:stroke-gray-800"
            >
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0FA0CE" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0FA0CE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 100', 'dataMax + 100']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  dx={-10}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0FA0CE" 
                  fillOpacity={0.2}
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                  className="dark:chart-area"
                />
              </AreaChart>
            </ChartContainer>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border/30">
            <div 
              ref={scrollRef}
              className="flex gap-4 py-2 overflow-hidden whitespace-nowrap"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Double the tickers for seamless scrolling */}
              {[...marketData, ...marketData, ...marketData]?.map((item: MarketSummary, index) => (
                <div key={`${item.indexName}-${index}`} className="inline-flex items-center gap-2 pl-4 first:pl-0">
                  <span className="font-medium whitespace-nowrap">{item.indexName}</span>
                  <span className="font-mono whitespace-nowrap">{item.value.toLocaleString()}</span>
                  <span className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    item.changePercent >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MarketCard = ({ marketData }: { marketData: MarketSummary }) => {
  const isPositive = marketData.changePercent >= 0;
  
  return (
    <div className="bg-secondary/30 dark:bg-[#18191E] rounded-lg p-4 backdrop-blur-sm border border-border/20">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{marketData.indexName}</h3>
      <p className="text-2xl font-mono font-semibold">{marketData.value.toLocaleString()}</p>
      <div className="flex items-center mt-2">
        {isPositive ? (
          <ArrowUpIcon className="h-3.5 w-3.5 text-success mr-1" />
        ) : (
          <ArrowDownIcon className="h-3.5 w-3.5 text-destructive mr-1" />
        )}
        <span className={cn(
          "text-sm font-medium",
          isPositive ? "text-success" : "text-destructive"
        )}>
          {isPositive ? "+" : ""}{marketData.changePercent.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default MarketOverview;
