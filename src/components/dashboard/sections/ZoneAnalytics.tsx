import { MapPin, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { StatCard } from "../StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const zones = [
  { name: "Entrance", engagement: 98, avgTime: "2.1 min", visitors: 1247, status: "hot" },
  { name: "Aisle 1-3", engagement: 76, avgTime: "5.4 min", visitors: 892, status: "hot" },
  { name: "Aisle 4-6", engagement: 64, avgTime: "4.2 min", visitors: 654, status: "warm" },
  { name: "Aisle 7-9", engagement: 45, avgTime: "3.1 min", visitors: 423, status: "cold" },
  { name: "Produce", engagement: 89, avgTime: "6.8 min", visitors: 1034, status: "hot" },
  { name: "Frozen", engagement: 52, avgTime: "3.8 min", visitors: 512, status: "warm" },
  { name: "Bakery", engagement: 71, avgTime: "4.5 min", visitors: 743, status: "warm" },
  { name: "Checkout", engagement: 94, avgTime: "4.2 min", visitors: 1189, status: "hot" },
];

const heatmapGrid = [
  ["hot", "hot", "warm", "warm"],
  ["hot", "warm", "cold", "cold"],
  ["warm", "warm", "warm", "cold"],
  ["hot", "hot", "hot", "warm"],
];

const getHeatColor = (status: string) => {
  switch (status) {
    case "hot":
      return "bg-status-danger/30 border-status-danger";
    case "warm":
      return "bg-status-warning/30 border-status-warning";
    case "cold":
      return "bg-status-info/20 border-status-info";
    default:
      return "bg-muted";
  }
};

export const ZoneAnalytics = () => {
  const avgEngagement = Math.round(
    zones.reduce((sum, z) => sum + z.engagement, 0) / zones.length
  );

  return (
    <div className="space-y-6" id="zones">
      <h2 className="text-2xl font-bold">Zone & Shelf Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Hot Zones"
          value="4"
          icon={TrendingUp}
          subtitle="High traffic areas"
          status="danger"
        />
        <StatCard
          title="Cold Zones"
          value="2"
          icon={TrendingDown}
          subtitle="Low engagement"
          status="info"
        />
        <StatCard
          title="Avg Engagement"
          value={`${avgEngagement}%`}
          icon={MapPin}
          status="success"
        />
        <StatCard
          title="Avg Zone Dwell"
          value="4.3 min"
          icon={Clock}
          status="info"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Store Heatmap</CardTitle>
            <p className="text-sm text-muted-foreground">Live visitor density</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {heatmapGrid.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2">
                  {row.map((cell, cellIdx) => (
                    <div
                      key={cellIdx}
                      className={cn(
                        "flex-1 h-20 border-2 rounded-lg transition-colors",
                        getHeatColor(cell)
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-status-info/20 border-2 border-status-info" />
                <span className="text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-status-warning/30 border-2 border-status-warning" />
                <span className="text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-status-danger/30 border-2 border-status-danger" />
                <span className="text-muted-foreground">High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zone Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {zones.map((zone) => (
                <div
                  key={zone.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{zone.name}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          zone.status === "hot" &&
                            "bg-status-danger/10 text-status-danger border-status-danger",
                          zone.status === "warm" &&
                            "bg-status-warning/10 text-status-warning border-status-warning",
                          zone.status === "cold" &&
                            "bg-status-info/10 text-status-info border-status-info"
                        )}
                      >
                        {zone.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{zone.visitors} visitors</span>
                      <span>Avg: {zone.avgTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{zone.engagement}%</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
