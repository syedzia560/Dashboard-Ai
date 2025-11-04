import { Shield, AlertTriangle, PackageX, UserX, Flame } from "lucide-react";
import { StatCard } from "../StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDatabank } from "@/data/databank";

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "border-status-danger text-status-danger";
    case "medium":
      return "border-status-warning text-status-warning";
    case "low":
      return "border-status-info text-status-info";
    default:
      return "";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-status-danger/10 text-status-danger border-status-danger";
    case "investigating":
      return "bg-status-warning/10 text-status-warning border-status-warning";
    case "resolved":
      return "bg-status-success/10 text-status-success border-status-success";
    case "monitoring":
      return "bg-status-info/10 text-status-info border-status-info";
    default:
      return "";
  }
};

export const SecurityAlerts = () => {
  const db = getDatabank();
  const recentAlerts = db.alerts;
  const activeAlerts = recentAlerts.filter((a) => a.status === "active").length;
  const highSeverityCount = recentAlerts.filter((a) => a.severity === "high").length;

  return (
    <div className="space-y-6" id="security">
      <h2 className="text-2xl font-bold">Security & Safety Monitoring</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Alerts"
          value={activeAlerts}
          icon={AlertTriangle}
          status="danger"
          subtitle="Requires immediate attention"
        />
        <StatCard
          title="High Severity"
          value={highSeverityCount}
          icon={Shield}
          status="warning"
        />
        <StatCard
          title="Total Today"
          value={Math.max(8, recentAlerts.length + 8)}
          icon={AlertTriangle}
          trend={{ value: "-3 vs yesterday", positive: true }}
          status="info"
        />
        <StatCard
          title="Avg Response Time"
          value={`${(2.4 + (activeAlerts ? 0.1 * activeAlerts : 0)).toFixed(1)} min`}
          icon={Shield}
          status="success"
        />
      </div>

      <Card className="border-status-danger/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-status-danger" />
            Recent Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "flex items-center justify-between p-4 border rounded-lg",
                  alert.status === "active" && "border-status-danger/30 bg-status-danger/5"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      alert.severity === "high" && "bg-status-danger/10",
                      alert.severity === "medium" && "bg-status-warning/10",
                      alert.severity === "low" && "bg-status-info/10"
                    )}
                  >
                    <alert.icon
                      className={cn(
                        "h-5 w-5",
                        alert.severity === "high" && "text-status-danger",
                        alert.severity === "medium" && "text-status-warning",
                        alert.severity === "low" && "text-status-info"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{alert.type}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{alert.location}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alert Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-danger" />
                  <span className="text-sm">Abandoned Objects</span>
                </div>
                <span className="font-bold">4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-warning" />
                  <span className="text-sm">Loitering</span>
                </div>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-info" />
                  <span className="text-sm">Unauthorized Entry</span>
                </div>
                <span className="font-bold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-1" />
                  <span className="text-sm">Suspicious Behavior</span>
                </div>
                <span className="font-bold">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg border-status-success/30 bg-status-success/5">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-status-success" />
                  <span className="font-medium">Fire Detection</span>
                </div>
                <p className="text-sm text-muted-foreground">All clear - No issues detected</p>
              </div>
              <div className="p-3 border rounded-lg border-status-success/30 bg-status-success/5">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-status-success" />
                  <span className="font-medium">Emergency Exits</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  All exits clear and accessible
                </p>
              </div>
              <div className="p-3 border rounded-lg border-status-success/30 bg-status-success/5">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-status-success" />
                  <span className="font-medium">Slip/Fall Detection</span>
                </div>
                <p className="text-sm text-muted-foreground">No incidents in last 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
