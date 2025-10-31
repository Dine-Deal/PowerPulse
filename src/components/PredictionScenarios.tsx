import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface Scenario {
  name: string;
  value: number;
  color: string;
}

interface Algorithm {
  name: string;
  performance: number;
}

export const PredictionScenarios = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const { data: result, error } = await supabase.functions.invoke('ml-predictions', {
          body: { type: 'scenarios' }
        });

        if (error) throw error;
        if (result?.scenarios) setScenarios(result.scenarios);
        if (result?.algorithms) setAlgorithms(result.algorithms);
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading scenarios...</p>
      </div>
    );
  }

  const optimistic = scenarios.find(s => s.name === 'Optimistic');
  const pessimistic = scenarios.find(s => s.name === 'Pessimistic');

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-full">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-6">
        PREDICTION SCENARIOS
      </h3>
      
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-muted-foreground">Optimistic</span>
          </div>
          <p className="text-2xl font-bold text-primary">{optimistic?.value || 0} GW</p>
        </div>
        
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-muted-foreground">Pessimistic</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{pessimistic?.value || 0} GW</p>
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
            <span className="text-sm font-semibold text-foreground">{algo.performance}%</span>
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