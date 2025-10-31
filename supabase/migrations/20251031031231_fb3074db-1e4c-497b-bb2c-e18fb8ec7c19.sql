-- Enable Row Level Security on all tables
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_consumption ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prediction_metrics ENABLE ROW LEVEL SECURITY;

-- Create public read policies for dashboard data (publicly viewable)
CREATE POLICY "Allow public read access to locations"
  ON locations FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to energy consumption"
  ON energy_consumption FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to predictions"
  ON predictions FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to metrics"
  ON prediction_metrics FOR SELECT
  USING (true);