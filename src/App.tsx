
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Analysis from "./pages/Analysis";
import Strategy from "./pages/Strategy";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
