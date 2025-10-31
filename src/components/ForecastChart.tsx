import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { time: "1D", historical: 32, prediction: 32, confidence_low: 30, confidence_high: 34 },
  { time: "7D", historical: 35, prediction: 36, confidence_low: 33, confidence_high: 39 },
  { time: "1M", historical: 38, prediction: 39, confidence_low: 35, confidence_high: 43 },
  { time: "3M", historical: 40, prediction: 42, confidence_low: 37, confidence_high: 47 },
  { time: "5M", historical: 42, prediction: 44, confidence_low: 39, confidence_high: 49 },
  { time: "6M", historical: 41, prediction: 43, confidence_low: 38, confidence_high: 48 },
  { time: "9Y", historical: 40, prediction: null, confidence_low: null, confidence_high: null },
  { time: "1Y", historical: null, prediction: 45, confidence_low: 40, confidence_high: 50 },
  { time: "ALL", historical: null, prediction: 48, confidence_low: 42, confidence_high: 54 },
];

export const ForecastChart = () => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          CONSUMPTION FORECAST vs ACTUAL (MAIN CHART)
        </h3>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="line"
          />
          
          {/* Confidence band */}
          <Area
            type="monotone"
            dataKey="confidence_high"
            stroke="none"
            fill="url(#colorConfidence)"
            fillOpacity={1}
          />
          
          {/* Historical line */}
          <Line
            type="monotone"
            dataKey="historical"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
            name="HISTORICAL"
          />
          
          {/* Prediction line */}
          <Line
            type="monotone"
            dataKey="prediction"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            name="PREDICTION"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
