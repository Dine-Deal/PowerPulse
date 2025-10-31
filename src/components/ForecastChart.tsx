import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface ForecastData {
  time: string;
  historical: number | null;
  prediction: number | null;
  confidenceUpper: number | null;
  confidenceLower: number | null;
}

export const ForecastChart = () => {
  const [data, setData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const { data: result, error } = await supabase.functions.invoke('ml-predictions', {
          body: { type: 'forecast' }
        });

        if (error) throw error;
        if (result?.forecast) {
          setData(result.forecast);
        }
      } catch (error) {
        console.error('Error fetching forecast:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading forecast data...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Consumption Forecast vs Actual
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
            dataKey="confidenceUpper"
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