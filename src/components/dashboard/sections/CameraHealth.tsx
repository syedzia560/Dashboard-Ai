import { Camera, CheckCircle, XCircle, AlertTriangle, Eye } from "lucide-react";
import { StatCard } from "../StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDatabank } from "@/data/databank";

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-status-success/10 text-status-success border-status-success";
    case "warning":
      return "bg-status-warning/10 text-status-warning border-status-warning";
    case "offline":
      return "bg-status-danger/10 text-status-danger border-status-danger";
    default:
      return "";
  }
};

export const CameraHealth = () => {
  const db = getDatabank();
  const cameras = db.cameras;
  const onlineCameras = cameras.filter((c) => c.status === "online").length;
  const warningCameras = cameras.filter((c) => c.status === "warning").length;
  const offlineCameras = cameras.filter((c) => c.status === "offline").length;

  return (
    <div className="space-y-6" id="cameras">
      <h2 className="text-2xl font-bold">Camera Health & System Status</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Cameras"
          value={cameras.length}
          icon={Camera}
          status="info"
        />
        <StatCard
          title="Online Cameras"
          value={onlineCameras}
          icon={CheckCircle}
          status="success"
          subtitle={`${Math.round((onlineCameras / cameras.length) * 100)}% operational`}
        />
        <StatCard
          title="Low Quality / Issues"
          value={warningCameras}
          icon={AlertTriangle}
          status="warning"
        />
        <StatCard
          title="Offline Cameras"
          value={offlineCameras}
          icon={XCircle}
          status="danger"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Camera Grid Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cameras.map((camera) => (
              <div
                key={camera.id}
                className={cn(
                  "p-4 border rounded-lg transition-colors",
                  camera.status === "online" && "border-status-success/30",
                  camera.status === "warning" && "border-status-warning/30",
                  camera.status === "offline" && "border-status-danger/30"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm font-medium">
                      {camera.id}
                    </span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(camera.status)}>
                    {camera.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {camera.location}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Eye className="h-3 w-3" />
                  <span>Quality: {camera.quality}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {(offlineCameras > 0 || warningCameras > 0) && (
        <Card className="border-status-warning/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-status-warning" />
              Cameras Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {cameras
                .filter((c) => c.status !== "online")
                .map((camera) => (
                  <div
                    key={camera.id}
                    className="flex items-center justify-between p-3 border rounded"
                  >
                    <div>
                      <p className="font-medium">
                        {camera.id} - {camera.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {camera.status === "offline"
                          ? "No signal detected"
                          : `Low quality: ${camera.quality}%`}
                      </p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(camera.status)}>
                      {camera.status === "offline" ? "OFFLINE" : "LOW QUALITY"}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
