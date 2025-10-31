import { DashboardHeader } from "@/components/DashboardHeader";
import { WorldMap } from "@/components/WorldMap";
import { MetricCard } from "@/components/MetricCard";
import { QuickActions } from "@/components/QuickActions";
import { ForecastChart } from "@/components/ForecastChart";
import { PredictionScenarios } from "@/components/PredictionScenarios";
import { Eye, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-8 space-y-6">
        {/* Top Section: Map, Accuracy, Quick Actions */}
        <div className="grid grid-cols-12 gap-6">
          {/* World Map */}
          <div className="col-span-5 bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              WORLD MAP
            </h3>
            <div className="h-[280px]">
              <WorldMap />
            </div>
          </div>
          
          {/* Prediction Accuracy */}
          <div className="col-span-4 bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              PREDICTION ACCURACY
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">MAPE</p>
                  <p className="text-4xl font-bold text-foreground">92.3%</p>
                </div>
                <Eye className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">RMSE</p>
                  <p className="text-xl font-bold text-foreground">145.2<span className="text-sm text-muted-foreground ml-1">MW</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CONFIDENCE</p>
                  <p className="text-xl font-bold text-foreground">89<span className="text-sm text-muted-foreground">%</span></p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Last Updated: 2h ago</p>
                <Button variant="outline" className="w-full">
                  Retrain Models
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="col-span-3">
            <QuickActions />
          </div>
        </div>
        
        {/* Metrics Row */}
        <div className="grid grid-cols-5 gap-4">
          <MetricCard
            label="Total Consumption"
            value="245.6"
            subtitle="GW"
            icon={Zap}
          />
          <MetricCard
            label="Trend Direction"
            value="+2.3%"
            icon={TrendingUp}
            trend={{ value: "Increasing", positive: true }}
          />
          <MetricCard
            label="7-Day Forecast"
            value="+1.8%"
            subtitle="89%"
          />
          <MetricCard
            label="30-Day"
            value="87%"
            subtitle="CONPIAECE"
          />
          <MetricCard
            label="Anomalies Detected"
            value="3"
            className="bg-destructive/5 border-destructive/20"
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <ForecastChart />
          </div>
          <div className="col-span-4">
            <PredictionScenarios />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
