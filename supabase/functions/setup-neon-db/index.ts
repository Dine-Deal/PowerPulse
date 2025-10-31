import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DATABASE_URL = Deno.env.get('DATABASE_URL');
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL not configured');
    }

    const client = new Client(DATABASE_URL);
    await client.connect();

    try {
      console.log('Creating tables...');
      
      // Create locations table
      await client.queryObject(`
        CREATE TABLE IF NOT EXISTS locations (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          city TEXT NOT NULL,
          country TEXT NOT NULL,
          region TEXT,
          latitude DECIMAL(9,6) NOT NULL,
          longitude DECIMAL(9,6) NOT NULL,
          timezone TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `);

      // Create energy_consumption table
      await client.queryObject(`
        CREATE TABLE IF NOT EXISTS energy_consumption (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
          timestamp TIMESTAMPTZ NOT NULL,
          consumption_kwh DECIMAL(12,2) NOT NULL,
          temperature DECIMAL(5,2),
          weather_condition TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `);

      // Create predictions table
      await client.queryObject(`
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
        )
      `);

      // Create prediction_metrics table
      await client.queryObject(`
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
        )
      `);

      console.log('Creating indices...');
      await client.queryObject(`CREATE INDEX IF NOT EXISTS idx_energy_consumption_location ON energy_consumption(location_id)`);
      await client.queryObject(`CREATE INDEX IF NOT EXISTS idx_energy_consumption_timestamp ON energy_consumption(timestamp)`);
      await client.queryObject(`CREATE INDEX IF NOT EXISTS idx_predictions_location ON predictions(location_id)`);
      await client.queryObject(`CREATE INDEX IF NOT EXISTS idx_predictions_forecast_timestamp ON predictions(forecast_timestamp)`);

      console.log('Inserting sample location (Abu Dhabi)...');
      const locationResult = await client.queryObject(`
        INSERT INTO locations (city, country, region, latitude, longitude, timezone)
        VALUES ('Abu Dhabi', 'United Arab Emirates', 'Middle East', 24.4539, 54.3773, 'Asia/Dubai')
        ON CONFLICT DO NOTHING
        RETURNING id
      `);

      let locationId: string | null = null;
      if (locationResult.rows.length > 0) {
        locationId = (locationResult.rows[0] as any).id;
      } else {
        // Get existing location
        const existingLocation = await client.queryObject(`SELECT id FROM locations WHERE city = 'Abu Dhabi' LIMIT 1`);
        if (existingLocation.rows.length > 0) {
          locationId = (existingLocation.rows[0] as any).id;
        }
      }

      if (locationId) {
        console.log('Inserting sample metrics...');
        await client.queryObject(`
          INSERT INTO prediction_metrics (location_id, algorithm, mae, rmse, mape, confidence)
          VALUES ($1, 'LSTM', 112.5, 145.2, 92.3, 89)
          ON CONFLICT DO NOTHING
        `, [locationId]);

        console.log('Inserting sample historical data...');
        const now = new Date();
        for (let i = 0; i < 30; i++) {
          const timestamp = new Date(now.getTime() - (30 - i) * 24 * 60 * 60 * 1000);
          const consumption = 240000 + Math.sin(i * 0.3) * 15000 + (Math.random() - 0.5) * 5000;
          const temperature = 25 + Math.sin(i * 0.2) * 8 + (Math.random() - 0.5) * 3;
          
          await client.queryObject(`
            INSERT INTO energy_consumption (location_id, timestamp, consumption_kwh, temperature, weather_condition)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT DO NOTHING
          `, [locationId, timestamp.toISOString(), consumption, temperature, 'Clear']);
        }

        console.log('Inserting sample predictions...');
        for (let i = 1; i <= 24; i++) {
          const forecastTimestamp = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
          const predictedValue = 245000 + Math.sin(i * 0.3) * 15000 + (Math.random() - 0.5) * 5000;
          const confidenceLower = predictedValue - 8000;
          const confidenceUpper = predictedValue + 8000;
          
          await client.queryObject(`
            INSERT INTO predictions (location_id, prediction_timestamp, forecast_timestamp, predicted_value, confidence_lower, confidence_upper, algorithm)
            VALUES ($1, $2, $3, $4, $5, $6, 'LSTM')
            ON CONFLICT DO NOTHING
          `, [locationId, now.toISOString(), forecastTimestamp.toISOString(), predictedValue, confidenceLower, confidenceUpper]);
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Neon database initialized successfully with tables, indices, and sample data',
          locationId
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } finally {
      await client.end();
    }

  } catch (error) {
    console.error('Error in setup-neon-db:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});