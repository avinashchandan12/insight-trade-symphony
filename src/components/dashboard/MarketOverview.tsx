
import { useQuery } from "@tanstack/react-query";
import { fetchMarketSummary, MarketSummary } from "@/services/apiService";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpIcon, ArrowDownIcon, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the chart
const chartData = [
  { time: "9:30", value: 4520 },
  { time: "10:00", value: 4515 },
  { time: "10:30", value: 4525 },
  { time: "11:00", value: 4530 },
  { time: "11:30", value: 4540 },
  { time: "12:00", value: 4535 },
  { time: "12:30", value: 4545 },
  { time: "13:00", value: 4555 },
  { time: "13:30", value: 4550 },
  { time: "14:00", value: 4560 },
  { time: "14:30", value: 4565 },
  { time: "15:00", value: 4570 },
  { time: "15:30", value: 4567 },
  { time: "16:00", value: 4568 }
];

const MarketOverview = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ["marketSummary"],
    queryFn: fetchMarketSummary
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 backdrop-blur-sm p-3 rounded-lg border border-border shadow-md">
          <p className="text-sm font-medium">{`${payload[0].payload.time}`}</p>
          <p className="text-sm text-primary">{`${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-5">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Market Overview</h2>
          <p className="text-muted-foreground text-sm">Today's major indices</p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center">
          <span className="text-xs text-muted-foreground mr-2">Last update: 16:00 EST</span>
          <div className="icon-button">
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {marketData?.map((item: MarketSummary) => (
              <MarketCard key={item.indexName} marketData={item} />
            ))}
          </div>
          
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dx={-10}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

const MarketCard = ({ marketData }: { marketData: MarketSummary }) => {
  const isPositive = marketData.changePercent >= 0;
  
  return (
    <div className="bg-secondary/40 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{marketData.indexName}</h3>
          <p className="text-2xl font-semibold mt-2">{marketData.value.toLocaleString()}</p>
        </div>
        <div className={cn(
          "flex items-center px-2.5 py-1 rounded-md", 
          isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? (
            <ArrowUpIcon className="h-3.5 w-3.5 mr-1" />
          ) : (
            <ArrowDownIcon className="h-3.5 w-3.5 mr-1" />
          )}
          <span className="text-sm font-medium">{marketData.changePercent.toFixed(2)}%</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        {isPositive ? "+" : ""}{marketData.change.toFixed(2)} points
      </p>
    </div>
  );
};

export default MarketOverview;
