
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  BookText, 
  Home, 
  LineChart, 
  Settings, 
  ChevronRight, 
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { IndianMarketIcon } from "@/assets/icons/IndianMarket";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Trades", path: "/trades", icon: BarChart3 },
  { name: "Analysis", path: "/analysis", icon: LineChart },
  { name: "Strategy", path: "/strategy", icon: ShieldCheck },
  { name: "Journal", path: "/journal", icon: BookText },
  { name: "Settings", path: "/settings", icon: Settings },
];

const AppNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar backdrop-blur-lg border-t border-border/50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <MobileNavItem 
              key={item.path}
              name={item.name}
              path={item.path}
              icon={item.icon}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
      </nav>
    );
  }
  
  return (
    <Sidebar>
      <SidebarHeader className="py-4">
        <Logo collapsed={state === "collapsed"} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
                tooltip={item.name}
              >
                <Link to={item.path}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

const Logo = ({ collapsed }: { collapsed: boolean }) => (
  <div className="flex items-center px-2">
    <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center mr-3">
      <IndianMarketIcon className="w-5 h-5 text-white" />
    </div>
    {!collapsed && (
      <div>
        <h1 className="font-display font-semibold tracking-tight text-lg">TradeInsight</h1>
        <p className="text-muted-foreground text-xs">Indian Markets AI</p>
      </div>
    )}
  </div>
);

const MobileNavItem = ({ name, path, icon: Icon, isActive }: { name: string, path: string, icon: any, isActive: boolean }) => {
  return (
    <Link
      to={path}
      className="flex flex-col items-center justify-center px-1 py-1"
    >
      <div 
        className={cn(
          "p-1.5 rounded-lg transition-colors mb-1", 
          isActive ? "gradient-primary text-white" : "text-muted-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className={cn(
        "text-xs font-medium", 
        isActive ? "text-primary" : "text-muted-foreground"
      )}>
        {name}
      </span>
    </Link>
  );
};

export default AppNavigation;
