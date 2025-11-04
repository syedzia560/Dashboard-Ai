import { UserCircle, UserCheck, AlertTriangle, Clock } from "lucide-react";
import { StatCard } from "../StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getDatabank } from "@/data/databank";

export const StaffOperations = () => {
  const db = getDatabank();
  const staffMembers = db.staff.members;
  const unattendedZones = db.staff.unattendedZones;

  return (
    <div className="space-y-6" id="staff">
      <h2 className="text-2xl font-bold">Staff & Operations</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Staff on Duty"
          value={staffMembers.filter((s) => s.status === "Active").length}
          icon={UserCircle}
          subtitle={`Out of ${staffMembers.length} scheduled`}
          status="success"
        />
        <StatCard
          title="Staff-Customer Ratio"
          value={`1:${Math.max(10, Math.round(db.people.currentInStore / Math.max(1, staffMembers.length)))}`}
          icon={UserCheck}
          subtitle="Optimal: 1:20"
          status="success"
        />
        <StatCard
          title="Unattended Zones"
          value={unattendedZones.length}
          icon={AlertTriangle}
          status="warning"
        />
        <StatCard
          title="Avg Response Time"
          value={`${(3 + (unattendedZones.length ? 0.2 * unattendedZones.length : 0)).toFixed(1)} min`}
          icon={Clock}
          trend={{ value: "-0.5 min vs avg", positive: true }}
          status="info"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Staff Activity Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {staffMembers.map((staff) => (
                <div
                  key={staff.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={staff.status === "Active" ? "default" : "secondary"}
                      className={
                        staff.status === "Active"
                          ? "bg-status-success/10 text-status-success border-status-success"
                          : ""
                      }
                    >
                      {staff.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{staff.zone}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unattended Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unattendedZones.map((zone, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-lg border-status-warning/30 bg-status-warning/5"
                >
                  <div>
                    <p className="font-medium">{zone.zone}</p>
                    <p className="text-sm text-muted-foreground">
                      Unattended for {zone.duration}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      zone.priority === "high"
                        ? "border-status-danger text-status-danger"
                        : "border-status-warning text-status-warning"
                    }
                  >
                    {zone.priority.toUpperCase()}
                  </Badge>
                </div>
              ))}

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Staff Productivity</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Active Time</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Interactions</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
