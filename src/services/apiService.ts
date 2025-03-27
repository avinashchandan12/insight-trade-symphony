
// This file would contain the actual API integration code
// For now, we'll create mock implementations

import { toast } from "sonner";

// Mock API types
export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  date: string;
  profitLoss?: number;
  status: 'open' | 'closed';
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface MarketSummary {
  indexName: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  rules: string;
  created: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  tags: string[];
}

// Mock data
const mockTrades: Trade[] = [
  {
    id: "1",
    symbol: "AAPL",
    type: "buy",
    price: 180.45,
    quantity: 10,
    date: "2023-09-15T14:30:00",
    status: "open"
  },
  {
    id: "2",
    symbol: "MSFT",
    type: "sell",
    price: 324.78,
    quantity: 5,
    date: "2023-09-20T10:15:00",
    profitLoss: 120.50,
    status: "closed"
  },
  {
    id: "3",
    symbol: "TSLA",
    type: "buy",
    price: 210.30,
    quantity: 8,
    date: "2023-10-05T11:45:00",
    status: "open"
  }
];

const mockStockData: StockData[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 1.23, changePercent: 0.68 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 328.79, change: -2.45, changePercent: -0.74 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 214.65, change: 8.30, changePercent: 4.02 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 132.87, change: 0.56, changePercent: 0.42 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 174.36, change: -1.89, changePercent: -1.07 }
];

const mockMarketSummary: MarketSummary[] = [
  { indexName: "S&P 500", value: 4567.89, change: 12.54, changePercent: 0.28 },
  { indexName: "Nasdaq", value: 14239.45, change: 45.87, changePercent: 0.32 },
  { indexName: "Dow Jones", value: 35678.92, change: -89.54, changePercent: -0.25 }
];

const mockStrategies: Strategy[] = [
  {
    id: "1",
    name: "Mean Reversion Strategy",
    description: "Buy stocks that have fallen significantly and sell stocks that have risen significantly over the past week.",
    rules: "# Mean Reversion Strategy\n\n## Rules:\n\n### Buy Conditions:\n- Stock has dropped by at least 10% in the past week\n- Stock is above its 200-day moving average\n- RSI is below 30 (oversold)\n\n### Sell Conditions:\n- Stock has gained at least 7% from purchase price\n- Stock has been held for more than 30 days\n- RSI moves above 70 (overbought)\n\n## Risk Management:\n- Stop loss at 5% below purchase price\n- Position size not more than 5% of portfolio",
    created: "2023-08-12T09:20:00"
  },
  {
    id: "2",
    name: "Momentum Strategy",
    description: "Buy stocks showing strong upward momentum and sell on signs of weakening momentum.",
    rules: "# Momentum Strategy\n\n## Rules:\n\n### Buy Conditions:\n- Stock has risen by at least 5% in the past week\n- Volume is above 50-day average volume\n- MACD is showing bullish crossover\n\n### Sell Conditions:\n- Stock has fallen by 3% or more from recent high\n- Volume starts declining\n- MACD shows bearish crossover\n\n## Risk Management:\n- Trailing stop of 7%\n- Maximum exposure of 10% to any single sector",
    created: "2023-09-05T15:45:00"
  }
];

const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    date: "2023-10-10T08:30:00",
    title: "Tech stock analysis",
    content: "I've noticed that tech stocks are showing signs of recovery after the recent market correction. Apple seems particularly strong with solid fundamentals and good technical signals. I'm considering increasing my position.",
    mood: "positive",
    tags: ["tech", "analysis", "apple"]
  },
  {
    id: "2",
    date: "2023-10-15T14:20:00",
    title: "Earnings season reflection",
    content: "Mixed results from earnings reports this week. Tesla beat expectations but guidance was cautious. Need to be more selective with entries as market seems to be pricing in perfection.",
    mood: "neutral",
    tags: ["earnings", "tesla", "market conditions"]
  }
];

// Mock API functions
export const fetchTrades = async (): Promise<Trade[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockTrades];
};

export const addTrade = async (trade: Omit<Trade, 'id'>): Promise<Trade> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  const newTrade = {
    ...trade,
    id: Math.random().toString(36).substring(2, 9)
  };
  mockTrades.push(newTrade as Trade);
  toast.success("Trade added successfully");
  return newTrade as Trade;
};

export const fetchWatchlist = async (): Promise<StockData[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [...mockStockData];
};

export const fetchMarketSummary = async (): Promise<MarketSummary[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockMarketSummary];
};

export const fetchStrategies = async (): Promise<Strategy[]> => {
  await new Promise(resolve => setTimeout(resolve, 550));
  return [...mockStrategies];
};

export const fetchJournalEntries = async (): Promise<JournalEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 650));
  return [...mockJournalEntries];
};

export const addJournalEntry = async (entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  const newEntry = {
    ...entry,
    id: Math.random().toString(36).substring(2, 9)
  };
  mockJournalEntries.push(newEntry as JournalEntry);
  toast.success("Journal entry added successfully");
  return newEntry as JournalEntry;
};

// Integration with the real Upstox API would go here
// For now, we're providing placeholders that could later be replaced with actual API calls

export const getAuthUrl = () => {
  // In a real implementation, this would return the Upstox OAuth URL
  return "https://api.upstox.com/v2/login/authorization/dialog";
};

export const authenticateWithCode = async (code: string) => {
  // This would exchange the auth code for an access token
  console.log("Authenticating with code:", code);
  return { success: true, token: "sample-token" };
};
