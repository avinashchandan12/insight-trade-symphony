
import { BellIcon, Search, UserCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const AppTopbar = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-16 border-b border-border/40 px-4 flex items-center justify-between gap-4 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:flex" />
        <div className="relative hidden md:flex items-center w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 h-9 bg-muted/40 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <BellIcon className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <UserCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AppTopbar;
