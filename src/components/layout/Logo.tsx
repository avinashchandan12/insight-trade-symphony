
import { IndianMarketIcon } from "@/assets/icons/IndianMarket";

export const Logo = () => (
  <div className="flex items-center">
    <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center mr-3">
      <IndianMarketIcon className="w-5 h-5 text-white" />
    </div>
    <div>
      <h1 className="font-display font-semibold tracking-tight text-lg">TradeInsight</h1>
      <p className="text-muted-foreground text-xs">Indian Markets AI</p>
    </div>
  </div>
);
