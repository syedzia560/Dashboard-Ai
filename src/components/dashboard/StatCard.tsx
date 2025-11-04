import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  status?: "success" | "warning" | "danger" | "info";
  subtitle?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  status,
  subtitle,
}: StatCardProps) => {
  const statusColors = {
    success: "text-status-success bg-status-success/10",
    warning: "text-status-warning bg-status-warning/10",
    danger: "text-status-danger bg-status-danger/10",
    info: "text-status-info bg-status-info/10",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={cn(
            "p-2 rounded-lg",
            status ? statusColors[status] : "bg-muted"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <p
            className={cn(
              "text-xs mt-1",
              trend.positive ? "text-status-success" : "text-status-danger"
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
