import { Home, Globe, TrendingUp, Lightbulb, Settings as SettingsIcon, BarChart3, AlertTriangle, Bell, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Globe, label: "World Map", path: "/world-map" },
  { icon: TrendingUp, label: "Forecast Models", path: "/forecast" },
  { icon: Lightbulb, label: "Scenario Planning", path: "/scenarios" },
  { icon: SettingsIcon, label: "Model Training", path: "/training" },
  { icon: BarChart3, label: "Sector Breakdown", path: "/sectors" },
  { icon: AlertTriangle, label: "Anomalies", path: "/anomalies" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
  { icon: User, label: "User Profile", path: "/profile" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-sm font-semibold text-muted-foreground tracking-wider">DASHBOARD</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover:bg-accent/10 text-sm font-medium",
                isActive 
                  ? "bg-accent/10 text-accent" 
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
