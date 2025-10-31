import { ArrowRight, GitCompare, TrendingUp, Download, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { icon: GitCompare, label: "Compare" },
  { icon: TrendingUp, label: "Forecast" },
  { icon: Download, label: "Export" },
  { icon: AlertCircle, label: "Alert" },
];

export const QuickActions = () => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        QUICK ACTIONS
      </h3>
      
      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg",
                "hover:bg-accent/10 transition-all group text-left"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-sm font-medium text-foreground">{action.label}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
