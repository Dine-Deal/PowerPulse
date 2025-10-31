import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const MetricCard = ({ label, value, subtitle, icon: Icon, trend, className }: MetricCardProps) => {
  return (
    <div className={cn("bg-card rounded-lg p-6 border border-border", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && <span className="text-sm text-muted-foreground">{subtitle}</span>}
          </div>
          {trend && (
            <p className={cn(
              "text-sm font-medium",
              trend.positive ? "text-primary" : "text-destructive"
            )}>
              {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};
