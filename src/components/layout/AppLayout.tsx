
import { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarRail, SidebarInset } from "@/components/ui/sidebar";
import AppNavigation from "./AppNavigation";
import AppTopbar from "./AppTopbar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-full pattern-rangoli">
        <AppNavigation />
        <SidebarInset className="flex flex-col h-full">
          <AppTopbar />
          <main className={`flex-1 h-full overflow-y-auto ${isMobile ? "pb-20" : "pb-8"} px-4 md:px-8 relative`}>
            <SidebarRail className="hidden md:flex" />
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
