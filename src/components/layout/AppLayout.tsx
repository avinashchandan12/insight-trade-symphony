
import { ReactNode } from "react";
import AppNavigation from "./AppNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-full">
      <AppNavigation />
      <main className={`flex-1 h-full overflow-y-auto ${isMobile ? "pb-20" : "pb-8"} px-4 md:px-8`}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
