
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/layout/Logo";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Import custom SVG icons for better aesthetic
import DashboardIcon from "@/components/icons/DashboardIcon";
import WatchlistIcon from "@/components/icons/WatchlistIcon";
import TradesIcon from "@/components/icons/TradesIcon";
import AnalysisIcon from "@/components/icons/AnalysisIcon";
import StrategyIcon from "@/components/icons/StrategyIcon";
import JournalIcon from "@/components/icons/JournalIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import UserIcon from "@/components/icons/UserIcon";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Dashboard", path: "/", icon: DashboardIcon },
  { name: "Watchlist", path: "/watchlist", icon: WatchlistIcon },
  { name: "Trades", path: "/trades", icon: TradesIcon },
  { name: "Analysis", path: "/analysis", icon: AnalysisIcon },
  { name: "Strategy", path: "/strategy", icon: StrategyIcon },
  { name: "Journal", path: "/journal", icon: JournalIcon },
  { name: "Settings", path: "/settings", icon: SettingsIcon },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Render mobile navigation separately
  if (isMobile) {
    return (
      <div className="flex h-full pattern-rangoli">
        <main className="flex-1 h-full overflow-y-auto pb-20 px-4 md:px-8 relative">
          <div className="sticky top-0 z-50 py-3 flex justify-end items-center gap-2 bg-background/80 backdrop-blur-md">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link to="/auth">
                <UserIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {children}
        </main>
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
      </div>
    );
  }
  
  // Desktop layout with collapsible sidebar
  return (
    <SidebarProvider>
      <div className="flex h-full pattern-rangoli">
        <DesktopSidebar />
        <main className="flex-1 h-full overflow-y-auto pb-8 px-4 md:px-8 relative">
          <div className="sticky top-0 z-50 py-3 flex justify-end items-center gap-2 bg-background/80 backdrop-blur-md">
            <ThemeToggle />
            <SidebarTrigger className="ml-2" />
            <Avatar className="ml-2 cursor-pointer">
              <AvatarFallback>
                <Link to="/auth">U</Link>
              </AvatarFallback>
            </Avatar>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

const DesktopSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.path}
                    tooltip={item.name}
                    asChild
                    className="transition-all hover:bg-primary/10 dark:hover:bg-primary/20"
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

const MobileNavItem = ({ name, path, icon: Icon, isActive }: { name: string, path: string, icon: any, isActive: boolean }) => {
  return (
    <Link
      to={path}
      className="flex flex-col items-center justify-center px-1 py-1"
    >
      <div 
        className={`p-1.5 rounded-lg transition-colors mb-1 ${
          isActive ? "gradient-primary text-white" : "text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className={`text-xs font-medium ${
        isActive ? "text-primary" : "text-muted-foreground"
      }`}>
        {name}
      </span>
    </Link>
  );
};

export default AppLayout;
