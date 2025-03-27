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
  historicalData?: {
    daily: { price: number; change: number; changePercent: number; };
    weekly: { price: number; change: number; changePercent: number; };
    monthly: { price: number; change: number; changePercent: number; };
    yearly: { price: number; change: number; changePercent: number; };
  };
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

// Mock data with Indian stocks
const mockTrades: Trade[] = [
  {
    id: "1",
    symbol: "RELIANCE",
    type: "buy",
    price: 2480.75,
    quantity: 10,
    date: "2023-09-15T14:30:00",
    status: "open"
  },
  {
    id: "2",
    symbol: "HDFCBANK",
    type: "sell",
    price: 1645.30,
    quantity: 5,
    date: "2023-09-20T10:15:00",
    profitLoss: 1205.50,
    status: "closed"
  },
  {
    id: "3",
    symbol: "TCS",
    type: "buy",
    price: 3590.45,
    quantity: 8,
    date: "2023-10-05T11:45:00",
    status: "open"
  }
];

const mockStockData: StockData[] = [
  { 
    symbol: "RELIANCE", 
    name: "Reliance Industries", 
    price: 2487.25, 
    change: 12.50, 
    changePercent: 0.51,
    historicalData: {
      daily: { price: 2487.25, change: 12.50, changePercent: 0.51 },
      weekly: { price: 2437.80, change: 49.45, changePercent: 2.03 },
      monthly: { price: 2390.00, change: 97.25, changePercent: 4.07 },
      yearly: { price: 2280.10, change: 207.15, changePercent: 9.08 }
    }
  },
  { 
    symbol: "HDFCBANK", 
    name: "HDFC Bank Ltd.", 
    price: 1651.80, 
    change: -8.75, 
    changePercent: -0.53,
    historicalData: {
      daily: { price: 1651.80, change: -8.75, changePercent: -0.53 },
      weekly: { price: 1675.45, change: -23.65, changePercent: -1.41 },
      monthly: { price: 1705.90, change: -54.10, changePercent: -3.17 },
      yearly: { price: 1580.25, change: 71.55, changePercent: 4.53 }
    }
  },
  { 
    symbol: "TCS", 
    name: "Tata Consultancy Services", 
    price: 3598.60, 
    change: 28.15, 
    changePercent: 0.79,
    historicalData: {
      daily: { price: 3598.60, change: 28.15, changePercent: 0.79 },
      weekly: { price: 3520.40, change: 78.20, changePercent: 2.22 },
      monthly: { price: 3475.50, change: 123.10, changePercent: 3.54 },
      yearly: { price: 3350.75, change: 247.85, changePercent: 7.40 }
    }
  },
  { 
    symbol: "INFY", 
    name: "Infosys Ltd.", 
    price: 1532.45, 
    change: 6.30, 
    changePercent: 0.41,
    historicalData: {
      daily: { price: 1532.45, change: 6.30, changePercent: 0.41 },
      weekly: { price: 1510.70, change: 21.75, changePercent: 1.44 },
      monthly: { price: 1480.30, change: 52.15, changePercent: 3.52 },
      yearly: { price: 1425.60, change: 106.85, changePercent: 7.50 }
    }
  },
  { 
    symbol: "ICICIBANK", 
    name: "ICICI Bank Ltd.", 
    price: 954.20, 
    change: -5.65, 
    changePercent: -0.59,
    historicalData: {
      daily: { price: 954.20, change: -5.65, changePercent: -0.59 },
      weekly: { price: 972.35, change: -18.15, changePercent: -1.87 },
      monthly: { price: 940.60, change: 13.60, changePercent: 1.45 },
      yearly: { price: 885.90, change: 68.30, changePercent: 7.71 }
    }
  },
  { 
    symbol: "TATASTEEL", 
    name: "Tata Steel Ltd.", 
    price: 134.80, 
    change: -7.20, 
    changePercent: -5.07,
    historicalData: {
      daily: { price: 134.80, change: -7.20, changePercent: -5.07 },
      weekly: { price: 144.90, change: -10.10, changePercent: -6.97 },
      monthly: { price: 152.30, change: -17.50, changePercent: -11.49 },
      yearly: { price: 122.75, change: 12.05, changePercent: 9.82 }
    }
  },
  { 
    symbol: "WIPRO", 
    name: "Wipro Ltd.", 
    price: 450.75, 
    change: 3.25, 
    changePercent: 0.73,
    historicalData: {
      daily: { price: 450.75, change: 3.25, changePercent: 0.73 },
      weekly: { price: 442.30, change: 8.45, changePercent: 1.91 },
      monthly: { price: 435.60, change: 15.15, changePercent: 3.48 },
      yearly: { price: 420.90, change: 29.85, changePercent: 7.09 }
    }
  },
  { 
    symbol: "AXISBANK", 
    name: "Axis Bank Ltd.", 
    price: 975.30, 
    change: -6.30, 
    changePercent: -0.64,
    historicalData: {
      daily: { price: 975.30, change: -6.30, changePercent: -0.64 },
      weekly: { price: 990.45, change: -15.15, changePercent: -1.53 },
      monthly: { price: 960.80, change: 14.50, changePercent: 1.51 },
      yearly: { price: 930.25, change: 45.05, changePercent: 4.84 }
    }
  }
];

const mockMarketSummary: MarketSummary[] = [
  { indexName: "NIFTY 50", value: 21456.70, change: 86.45, changePercent: 0.40 },
  { indexName: "SENSEX", value: 71324.80, change: 245.60, changePercent: 0.35 },
  { indexName: "NIFTY BANK", value: 46789.50, change: -125.30, changePercent: -0.27 }
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

export const fetchWatchlist = async (timeFrame: string = 'daily'): Promise<StockData[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // For demonstration, logging the timeframe
  console.log(`Fetching watchlist data for timeframe: ${timeFrame}`);
  
  if (timeFrame === 'daily' || !timeFrame) {
    return [...mockStockData];
  }
  
  // For other timeframes, update the data with historical values
  return mockStockData.map(stock => {
    if (!stock.historicalData) return stock;
    
    const historicalData = stock.historicalData[timeFrame as keyof typeof stock.historicalData];
    if (!historicalData) return stock;
    
    return {
      ...stock,
      change: historicalData.change,
      changePercent: historicalData.changePercent
    };
  });
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

// User authentication mock services
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const signIn = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate a successful login (in a real app, this would validate credentials)
  if (email && password) {
    return {
      id: "user123",
      name: "Demo User",
      email
    };
  }
  
  throw new Error("Invalid credentials");
};

export const signUp = async (name: string, email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate a successful registration
  if (name && email && password) {
    return {
      id: "user123",
      name,
      email
    };
  }
  
  throw new Error("Invalid registration details");
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
