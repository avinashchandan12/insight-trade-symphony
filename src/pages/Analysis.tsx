import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { getAIAnalysis } from "@/services/aiService";
import { fetchMarketSummary } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Sparkles, TrendingUp, TrendingDown, Workflow, 
  BarChart2, LineChart as LineChartIcon, PieChart, 
  Calendar, Clock3, ArrowUpCircle, ArrowDownCircle, 
  SplitSquareHorizontal, Brain, Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import StrategySignals from "@/components/analysis/StrategySignals";
import AiInsights from "@/components/dashboard/AiInsights";

// Mock data
const stockData = [
  { date: "Jan", spy: 380, qqq: 290, dia: 330 },
  { date: "Feb", spy: 390, qqq: 310, dia: 340 },
  { date: "Mar", spy: 385, qqq: 300, dia: 335 },
  { date: "Apr", spy: 400, qqq: 320, dia: 350 },
  { date: "May", spy: 410, qqq: 330, dia: 360 },
  { date: "Jun", spy: 405, qqq: 325, dia: 355 },
  { date: "Jul", spy: 420, qqq: 345, dia: 370 },
  { date: "Aug", spy: 425, qqq: 350, dia: 375 },
  { date: "Sep", spy: 415, qqq: 340, dia: 365 },
  { date: "Oct", spy: 430, qqq: 355, dia: 380 },
  { date: "Nov", spy: 435, qqq: 360, dia: 385 },
  { date: "Dec", spy: 445, qqq: 370, dia: 395 }
];

const sectorData = [
  { name: "Technology", value: 28.5, change: 3.2 },
  { name: "Healthcare", value: 15.2, change: -1.8 },
  { name: "Financials", value: 13.7, change: 0.5 },
  { name: "Consumer Disc", value: 11.8, change: 2.1 },
  { name: "Communication", value: 10.5, change: 1.7 },
  { name: "Industrials", value: 9.2, change: -0.3 },
  { name: "Consumer Staples", value: 6.8, change: -2.1 },
  { name: "Energy", value: 5.3, change: 4.8 },
  { name: "Utilities", value: 2.5, change: -3.2 },
  { name: "Materials", value: 2.2, change: 0.9 },
  { name: "Real Estate", value: 2.1, change: -2.7 }
];

const timeframeOptions = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "YTD", value: "ytd" },
  { label: "All", value: "all" }
];

const strategies = [
  { name: "Mean Reversion Strategy", active: true },
  { name: "Momentum Strategy", active: false },
];

const buySignals = [
  { symbol: "LT", name: "Larsen & Toubro", price: 2340.6, changePercent: -8.76, period: "weekly" },
  { symbol: "ICICI", name: "ICICI Bank", price: 1020.4, changePercent: -8.9, period: "monthly" },
  { symbol: "ITC", name: "ITC Limited", price: 380.25, changePercent: -12.34, period: "monthly" },
  { symbol: "HDFC", name: "HDFC Bank", price: 1495.6, changePercent: -7.12, period: "monthly" }
];

const topGainers = [
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 10450.75, changePercent: 9.87 },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 450.75, changePercent: 8.45 },
  { symbol: "SBIN", name: "State Bank of India", price: 620.3, changePercent: 7.23 },
  { symbol: "INFY", name: "Infosys", price: 1580.25, changePercent: 6.78 }
];

const topLosers = [
  { symbol: "LT", name: "Larsen & Toubro", price: 2340.6, changePercent: -8.76 },
  { symbol: "ITC", name: "ITC Limited", price: 380.25, changePercent: -7.89 },
  { symbol: "ICICI", name: "ICICI Bank", price: 1020.4, changePercent: -5.23 },
  { symbol: "HDFC", name: "HDFC Bank", price: 1495.6, changePercent: -3.72 }
];

const Analysis = () => {
  const [timeframe, setTimeframe] = useState("1m");
  const [chartType, setChartType] = useState<'overview' | 'sectors' | 'comparison'>('overview');
  const [analysisSectionActive, setAnalysisSectionActive] = useState("market");
  const [selectedTab, setSelectedTab] = useState("tradingStrategies");
  
  const { data: marketData } = useQuery({
    queryKey: ["marketSummary"],
    queryFn: fetchMarketSummary
  });
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-md">
          <p className="text-sm font-medium mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center mt-1">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize text-sm">{entry.name}: </span>
              <span className="text-sm font-medium ml-2">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <AppLayout>
      <div className="py-8">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Trading Strategies</h1>
            <p className="text-muted-foreground">AI-powered insights and market intelligence</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <SplitSquareHorizontal className="h-4 w-4" />
              Split View
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI View
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Strategy
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="tradingStrategies" value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="tradingStrategies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Trading Strategies
            </TabsTrigger>
            <TabsTrigger value="marketData" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Market Data
            </TabsTrigger>
            <TabsTrigger value="aiAnalysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              AI Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tradingStrategies">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-6">
                <Card className="dark:bg-[#18191E]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold">My Strategies</CardTitle>
                    <p className="text-sm text-muted-foreground">Select a strategy to edit or view</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {strategies.map((strategy, index) => (
                      <Button 
                        key={index}
                        variant={strategy.active ? "default" : "outline"}
                        className={cn(
                          "w-full justify-start text-left h-auto py-3 px-4",
                          strategy.active ? "bg-primary text-primary-foreground" : "bg-secondary/40"
                        )}
                      >
                        {strategy.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="dark:bg-[#18191E]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold">Market Opportunities</CardTitle>
                    <p className="text-sm text-muted-foreground">Potential trades based on your strategies</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Button 
                        variant="outline" 
                        className="bg-secondary/40 justify-center"
                      >
                        Buy Signals
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-secondary/40 justify-center opacity-70"
                      >
                        Sell Signals
                      </Button>
                    </div>
                    
                    <div className="space-y-3 max-h-[320px] overflow-y-auto">
                      {buySignals.map((stock, index) => (
                        <div key={index} className="flex items-center justify-between bg-background/40 p-3 rounded-lg">
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">₹{stock.price.toLocaleString()}</div>
                            <div className="text-sm text-red-500">
                              {stock.changePercent.toFixed(2)}% ({stock.period})
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-7">
                <StrategySignals />
              </div>
            </div>
            
            <div className="mt-6">
              <Card className="dark:bg-[#18191E]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold">Performance Threshold Alerts</CardTitle>
                  <p className="text-sm text-muted-foreground">Stocks that have moved significantly</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Daily", "Weekly", "Monthly", "Yearly"].map((period, index) => (
                      <Button 
                        key={index} 
                        variant={index === 0 ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          index !== 0 && "bg-secondary/40"
                        )}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div>
                      <div className="flex items-center mb-4">
                        <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                        <h3 className="font-semibold text-lg">Top Gainers</h3>
                      </div>
                      <div className="space-y-1">
                        <div className="grid grid-cols-12 gap-2 px-3 py-2 text-sm text-muted-foreground">
                          <div className="col-span-2">Symbol</div>
                          <div className="col-span-5">Name</div>
                          <div className="col-span-3 text-right">Price</div>
                          <div className="col-span-2 text-right">Change</div>
                        </div>
                        {topGainers.map((stock, index) => (
                          <div key={index} className="grid grid-cols-12 gap-2 px-3 py-2 hover:bg-secondary/30 rounded-md">
                            <div className="col-span-2 font-medium">{stock.symbol}</div>
                            <div className="col-span-5">{stock.name}</div>
                            <div className="col-span-3 text-right">₹{stock.price.toLocaleString()}</div>
                            <div className="col-span-2 text-right text-green-500">+{stock.changePercent.toFixed(2)}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                        <h3 className="font-semibold text-lg">Top Losers</h3>
                      </div>
                      <div className="space-y-1">
                        <div className="grid grid-cols-12 gap-2 px-3 py-2 text-sm text-muted-foreground">
                          <div className="col-span-2">Symbol</div>
                          <div className="col-span-5">Name</div>
                          <div className="col-span-3 text-right">Price</div>
                          <div className="col-span-2 text-right">Change</div>
                        </div>
                        {topLosers.map((stock, index) => (
                          <div key={index} className="grid grid-cols-12 gap-2 px-3 py-2 hover:bg-secondary/30 rounded-md">
                            <div className="col-span-2 font-medium">{stock.symbol}</div>
                            <div className="col-span-5">{stock.name}</div>
                            <div className="col-span-3 text-right">₹{stock.price.toLocaleString()}</div>
                            <div className="col-span-2 text-right text-red-500">{stock.changePercent.toFixed(2)}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="marketData">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-panel p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <Tabs defaultValue="line" className="w-auto">
                        <TabsList className="bg-secondary/60">
                          <TabsTrigger value="line" onClick={() => setChartType('overview')} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <LineChartIcon className="h-4 w-4" />
                          </TabsTrigger>
                          <TabsTrigger value="bar" onClick={() => setChartType('sectors')} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <BarChart2 className="h-4 w-4" />
                          </TabsTrigger>
                          <TabsTrigger value="area" onClick={() => setChartType('comparison')} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <PieChart className="h-4 w-4" />
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <h2 className="font-semibold">
                        {chartType === 'overview' ? 'Market Overview' : 
                         chartType === 'sectors' ? 'Sector Performance' : 
                         'Index Comparison'}
                      </h2>
                    </div>
                    <div className="flex overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                      {timeframeOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={timeframe === option.value ? "default" : "outline"}
                          size="sm"
                          className={cn(
                            "rounded-full",
                            timeframe !== option.value && "bg-secondary/40"
                          )}
                          onClick={() => setTimeframe(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-72">
                    {chartType === 'overview' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stockData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <YAxis 
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend 
                            wrapperStyle={{ marginTop: 10 }}
                            formatter={(value) => <span className="text-muted-foreground uppercase text-xs">{value}</span>}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="spy" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="qqq" 
                            stroke="#818cf8" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, fill: '#818cf8' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="dia" 
                            stroke="#f472b6" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, fill: '#f472b6' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                    
                    {chartType === 'sectors' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sectorData} layout="vertical" margin={{ top: 10, right: 10, left: 80, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                          <XAxis 
                            type="number" 
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <YAxis 
                            type="category"
                            dataKey="name" 
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar 
                            dataKey="value" 
                            fill="hsl(var(--primary))" 
                            radius={[0, 4, 4, 0]}
                            background={{ fill: 'rgba(255,255,255,0.05)' }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                    
                    {chartType === 'comparison' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stockData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                          <defs>
                            <linearGradient id="colorSpy" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorQqq" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <YAxis 
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend 
                            wrapperStyle={{ marginTop: 10 }}
                            formatter={(value) => <span className="text-muted-foreground uppercase text-xs">{value}</span>}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="spy" 
                            stroke="hsl(var(--primary))" 
                            fillOpacity={1}
                            fill="url(#colorSpy)" 
                            strokeWidth={2}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="qqq" 
                            stroke="#818cf8" 
                            fillOpacity={1}
                            fill="url(#colorQqq)" 
                            strokeWidth={2}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="dia" 
                            stroke="#f472b6" 
                            fillOpacity={1}
                            fill="url(#colorDia)" 
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
                
                <div className="glass-panel p-5">
                  <h2 className="font-semibold mb-4">Market Indicators</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <IndicatorCard 
                      name="VIX Volatility"
                      value="18.42"
                      change="-2.15%"
                      status="green"
                      description="30-day expected volatility of the S&P 500"
                    />
                    <IndicatorCard 
                      name="10Y Treasury"
                      value="4.21%"
                      change="+0.05%"
                      status="red"
                      description="10-year U.S. treasury yield"
                    />
                    <IndicatorCard 
                      name="USD Index"
                      value="104.25"
                      change="+0.32%"
                      status="red"
                      description="Measure of USD vs basket of currencies"
                    />
                    <IndicatorCard 
                      name="Gold"
                      value="$1,932.50"
                      change="+1.2%"
                      status="green"
                      description="Gold spot price per troy ounce"
                    />
                    <IndicatorCard 
                      name="WTI Crude"
                      value="$78.65"
                      change="-0.8%"
                      status="red"
                      description="West Texas Intermediate crude oil price"
                    />
                    <IndicatorCard 
                      name="S&P 500 P/E"
                      value="21.4"
                      change="-0.2"
                      status="neutral"
                      description="Price to earnings ratio of the S&P 500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <AiInsights type="market" timeframe={timeframe} />
                
                <div className="glass-panel p-5">
                  <h2 className="font-semibold mb-4">Market Calendar</h2>
                  <div className="space-y-3">
                    <CalendarItem 
                      date="Today"
                      events={[
                        { time: "8:30 AM", title: "CPI Report", importance: "high" },
                        { time: "2:00 PM", title: "FOMC Minutes", importance: "high" }
                      ]}
                    />
                    <CalendarItem 
                      date="Tomorrow"
                      events={[
                        { time: "8:30 AM", title: "Jobless Claims", importance: "medium" },
                        { time: "9:45 AM", title: "PMI Data", importance: "medium" },
                        { time: "10:00 AM", title: "Housing Starts", importance: "low" }
                      ]}
                    />
                    <CalendarItem 
                      date="Friday, Dec 15"
                      events={[
                        { time: "8:30 AM", title: "Retail Sales", importance: "high" },
                        { time: "9:15 AM", title: "Industrial Production", importance: "medium" }
                      ]}
                    />
                  </div>
                  
                  <div className="divider" />
                  
                  <h3 className="font-medium text-sm mb-2">Earnings Calendar</h3>
                  <div className="space-y-2">
                    <EarningsItem company="ORCL" name="Oracle Corp" time="After Close" est="$1.32" />
                    <EarningsItem company="ADBE" name="Adobe Inc" time="Tomorrow AMC" est="$4.05" />
                    <EarningsItem company="COST" name="Costco Wholesale" time="Thursday AMC" est="$3.45" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="aiAnalysis">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StrategySignals />
              </div>
              
              <div>
                <Tabs defaultValue="market" onValueChange={setAnalysisSectionActive}>
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="market" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Market
                    </TabsTrigger>
                    <TabsTrigger value="strategy" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Strategy
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {analysisSectionActive === "market" ? (
                  <AiInsights type="market" timeframe={timeframe} />
                ) : (
                  <AiInsights type="strategy" timeframe={timeframe} />
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const IndicatorCard = ({ 
  name, 
  value, 
  change, 
  status, 
  description 
}: { 
  name: string; 
  value: string; 
  change: string; 
  status: 'green' | 'red' | 'neutral'; 
  description: string; 
}) => {
  return (
    <div className="bg-secondary/40 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium">{name}</h3>
        <div className={cn(
          "text-xs rounded-full px-2 py-0.5",
          status === 'green' && "bg-success/20 text-success",
          status === 'red' && "bg-destructive/20 text-destructive",
          status === 'neutral' && "bg-secondary text-muted-foreground"
        )}>
          {change}
        </div>
      </div>
      <p className="text-xl font-semibold mb-2">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const CalendarItem = ({ 
  date, 
  events 
}: { 
  date: string; 
  events: { time: string; title: string; importance: 'high' | 'medium' | 'low' }[] 
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{date}</h3>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="flex items-center">
            <div className={cn(
              "w-2 h-2 rounded-full mr-2",
              event.importance === 'high' && "bg-destructive",
              event.importance === 'medium' && "bg-warning",
              event.importance === 'low' && "bg-primary"
            )} />
            <span className="text-xs text-muted-foreground w-[75px]">{event.time}</span>
            <span className="text-sm">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EarningsItem = ({ 
  company, 
  name, 
  time, 
  est 
}: { 
  company: string; 
  name: string; 
  time: string; 
  est: string; 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded bg-secondary/80 flex items-center justify-center mr-3">
          <span className="font-semibold text-xs">{company}</span>
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
      <div className="text-sm">
        <span className="text-muted-foreground mr-1">Est:</span>
        <span>{est}</span>
      </div>
    </div>
  );
};

export default Analysis;
