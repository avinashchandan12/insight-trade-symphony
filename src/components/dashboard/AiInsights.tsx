
import { useQuery } from "@tanstack/react-query";
import { getAIAnalysis } from "@/services/aiService";
import { Sparkles, TrendingUp, TrendingDown, Workflow, Clock3, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiInsightsProps {
  type?: 'market' | 'stock' | 'strategy';
  timeframe?: string;
}

const AiInsights = ({ type = 'market', timeframe }: AiInsightsProps) => {
  const { data: aiData, isLoading } = useQuery({
    queryKey: ["aiAnalysis", type, timeframe],
    queryFn: () => getAIAnalysis({ type, timeframe }),
    // Using placeholder data to ensure component always shows something
    placeholderData: {
      sentiment: 'bullish',
      confidence: 0.78,
      analysis: type === 'market' 
        ? "The overall market appears to be in a strong uptrend with positive momentum across most sectors. Major indices are showing resilience despite recent economic data showing mixed signals. The tech and financial sectors are leading the gains, while defensive sectors like utilities and consumer staples are lagging."
        : type === 'stock'
        ? "This stock is showing strong technical signals with a clear uptrend pattern. Recent trading volume has been above average, suggesting institutional interest. The stock is currently trading above all major moving averages, which indicates bullish momentum."
        : "Your current strategy of buying on 5% dips and selling on 10% rises has been effective in the current market conditions. This mean-reversion approach has captured significant value in the recent volatile trading sessions, particularly in mid-cap stocks.",
      keyPoints: [
        type === 'market' 
          ? "Foreign institutional investors have been net buyers for the last 5 sessions"
          : type === 'stock'
          ? "Stock is trading above 50-day and 200-day moving averages"
          : "Strategy has outperformed buy-and-hold by 12% this quarter",
        type === 'market'
          ? "Market breadth is positive with more advances than declines"
          : type === 'stock'
          ? "Recent earnings exceeded analyst expectations by 8%"
          : "Mean reversion signals have had a 72% win rate",
        type === 'market'
          ? "Option Put/Call ratio indicates optimistic sentiment"
          : type === 'stock'
          ? "The stock has formed a golden cross pattern"
          : "Average gain per winning trade is 14.5%"
      ],
      recommendations: [
        type === 'market'
          ? "Maintain exposure to high-growth technology stocks"
          : type === 'stock'
          ? "Consider adding to positions on minor pullbacks"
          : "Consider increasing position size on trades with higher conviction signals",
        type === 'market'
          ? "Monitor upcoming Fed statements for potential policy shifts"
          : type === 'stock'
          ? "Set a trailing stop at 7% below current price"
          : "Add a volume filter to improve signal quality",
        type === 'market'
          ? "Be selective with new positions given elevated valuations"
          : type === 'stock'
          ? "Look for confirmation from sector peers before larger positions"
          : "Backtest strategy on different market conditions to ensure robustness"
      ]
    }
  });
  
  return (
    <div className="dark:bg-[#18191E] rounded-lg p-5 border border-gray-800">
      <div className="flex items-center mb-4">
        <div className="mr-3 p-2 rounded-lg bg-emerald-500/20">
          {type === 'strategy' ? (
            <Brain className="h-5 w-5 text-emerald-500" />
          ) : (
            <Sparkles className="h-5 w-5 text-emerald-500" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            DeepSeek AI {type === 'market' ? 'Market Analysis' : 
             type === 'stock' ? 'Stock Analysis' : 
             'Strategy Analysis'}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <p>Get advanced AI-powered insights and trading recommendations</p>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={cn(
              "px-3 py-1.5 rounded-lg flex items-center text-sm font-medium",
              aiData?.sentiment === 'bullish' ? "bg-success/20 text-success" :
              aiData?.sentiment === 'bearish' ? "bg-destructive/20 text-destructive" :
              "bg-warning/20 text-warning"
            )}>
              {aiData?.sentiment === 'bullish' ? (
                <TrendingUp className="h-4 w-4 mr-1.5" />
              ) : aiData?.sentiment === 'bearish' ? (
                <TrendingDown className="h-4 w-4 mr-1.5" />
              ) : (
                <Workflow className="h-4 w-4 mr-1.5" />
              )}
              <span className="capitalize">{aiData?.sentiment}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Confidence: <span className="text-foreground font-medium">{(aiData?.confidence * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm ml-auto gap-2">
              <Clock3 className="h-3.5 w-3.5" />
              <span>Updated {timeframe === '1d' ? 'just now' : '3 hours ago'}</span>
            </div>
          </div>
          
          <p className="text-sm leading-relaxed">
            {aiData?.analysis}
          </p>
          
          <div className="pt-2">
            <h3 className="text-sm font-medium mb-2">Key Points</h3>
            <ul className="space-y-1.5">
              {aiData?.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-medium text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {aiData?.recommendations && (
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Recommendations</h3>
              <ul className="space-y-1.5">
                {aiData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-emerald-500 mr-2.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              Powered by DeepSeek AI - Analysis is for informational purposes only
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiInsights;
