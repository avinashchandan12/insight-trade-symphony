
import { useQuery } from "@tanstack/react-query";
import { getAIAnalysis } from "@/services/aiService";
import { Sparkles, TrendingUp, TrendingDown, Workflow, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AiInsightsProps {
  type?: 'market' | 'stock' | 'strategy';
  timeframe?: string;
}

const AiInsights = ({ type = 'market', timeframe }: AiInsightsProps) => {
  const { data: aiData, isLoading } = useQuery({
    queryKey: ["aiAnalysis", type, timeframe],
    queryFn: () => getAIAnalysis({ type, timeframe })
  });
  
  return (
    <div className="glass-panel p-5">
      <div className="flex items-center mb-4">
        <div className="mr-3 p-2 rounded-lg bg-emerald-500/20">
          <Sparkles className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {type === 'market' ? 'DeepSeek AI Market Analysis' : 
             type === 'stock' ? 'DeepSeek AI Stock Analysis' : 
             'DeepSeek AI Strategy Analysis'}
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
