-- Create table for locations/cities
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  timezone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for historical energy consumption data
CREATE TABLE IF NOT EXISTS energy_consumption (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL,
  consumption_kwh DECIMAL(12,2) NOT NULL,
  temperature DECIMAL(5,2),
  weather_condition TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for ML predictions
CREATE TABLE IF NOT EXISTS predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  prediction_timestamp TIMESTAMPTZ NOT NULL,
  forecast_timestamp TIMESTAMPTZ NOT NULL,
  predicted_value DECIMAL(12,2) NOT NULL,
  confidence_lower DECIMAL(12,2),
  confidence_upper DECIMAL(12,2),
  algorithm TEXT DEFAULT 'LSTM',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for prediction metrics
CREATE TABLE IF NOT EXISTS prediction_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  algorithm TEXT NOT NULL,
  mae DECIMAL(10,4),
  rmse DECIMAL(10,4),
  mape DECIMAL(5,2),
  confidence DECIMAL(5,2),
  training_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indices for better query performance
CREATE INDEX IF NOT EXISTS idx_energy_consumption_location ON energy_consumption(location_id);
CREATE INDEX IF NOT EXISTS idx_energy_consumption_timestamp ON energy_consumption(timestamp);
CREATE INDEX IF NOT EXISTS idx_predictions_location ON predictions(location_id);
CREATE INDEX IF NOT EXISTS idx_predictions_forecast_timestamp ON predictions(forecast_timestamp);

-- Insert sample location (Abu Dhabi from the notebook)
INSERT INTO locations (city, country, region, latitude, longitude, timezone)
VALUES ('Abu Dhabi', 'United Arab Emirates', 'Middle East', 24.4539, 54.3773, 'Asia/Dubai')
ON CONFLICT DO NOTHING;