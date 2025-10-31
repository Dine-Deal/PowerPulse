import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useToast } from "@/hooks/use-toast";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const WorldMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string>("");
  const { toast } = useToast();

  const handleClick = (geo: any, event: any) => {
    const bounds = event.target.getBBox();
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    
    // Approximate lat/lng from SVG coordinates (simplified)
    const lat = (90 - (centerY / 4)).toFixed(2);
    const lng = ((centerX / 8) - 180).toFixed(2);
    
    toast({
      title: `${geo.properties.name}`,
      description: `Approximate coordinates: ${lat}°, ${lng}°`,
    });
  };

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 147,
          center: [0, 20]
        }}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                onMouseLeave={() => setHoveredCountry("")}
                onClick={(event) => handleClick(geo, event)}
                style={{
                  default: {
                    fill: "hsl(var(--primary) / 0.2)",
                    stroke: "hsl(var(--primary) / 0.3)",
                    strokeWidth: 0.5,
                    outline: "none",
                    transition: "all 0.2s",
                  },
                  hover: {
                    fill: "hsl(var(--primary) / 0.4)",
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 1,
                    outline: "none",
                    cursor: "pointer",
                  },
                  pressed: {
                    fill: "hsl(var(--primary) / 0.6)",
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 1,
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      
      <div className="absolute bottom-4 left-4 space-y-2">
        <p className="text-sm text-muted-foreground">Clickable regions</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 bg-primary/20 border border-primary/30 rounded" />
          <span>Real-time updates</span>
        </div>
      </div>
      
      {hoveredCountry && (
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium">{hoveredCountry}</p>
        </div>
      )}
    </div>
  );
};
