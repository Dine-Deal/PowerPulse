import { Info, Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";

export const DashboardHeader = () => {
  return (
    <header className="bg-card border-b border-border px-8 py-6 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          GLOBAL ELECTRICITY INTELLIGENCE DASHBOARD
        </h1>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Info className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
