import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { Button } from "./ui/button";

const scenarios = [
  { name: "Optimistic", value: 8.2, color: "hsl(var(--chart-1))" },
  { name: "Baseline", value: 5.4, color: "hsl(var(--chart-3))" },
  { name: "Pessimistic", value: 2.3, color: "hsl(var(--chart-4))" },
];

const algorithms = [
  { name: "LSTM Accuracy", value: "94.2%" },
  { name: "OCISITM", value: "89.7%" },
  { name: "ARIMA", value: "86.1%" },
];

export const PredictionScenarios = () => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-6">
        PREDICTION SCENARIOS
      </h3>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-muted-foreground">Optimistic</span>
          </div>
          <p className="text-2xl font-bold text-primary">+8.2%</p>
        </div>
        
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-muted-foreground">Pessimistic</span>
          </div>
          <p className="text-2xl font-bold text-foreground">+2.3%</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={scenarios} layout="horizontal">
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" hide />
          <Bar dataKey="value" radius={[4, 4, 4, 4]}>
            {scenarios.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-6 space-y-3">
        {algorithms.map((algo) => (
          <div key={algo.name} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{algo.name}</span>
            <span className="text-sm font-semibold text-foreground">{algo.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full text-sm">
          Switch Algorithm
        </Button>
        <Button variant="outline" className="w-full text-sm">
          View Details
        </Button>
      </div>
    </div>
  );
};
