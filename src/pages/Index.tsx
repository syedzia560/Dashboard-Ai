import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PeopleAnalytics } from "@/components/dashboard/sections/PeopleAnalytics";
import { StaffOperations } from "@/components/dashboard/sections/StaffOperations";
import { CameraHealth } from "@/components/dashboard/sections/CameraHealth";
import { ZoneAnalytics } from "@/components/dashboard/sections/ZoneAnalytics";
import { SecurityAlerts } from "@/components/dashboard/sections/SecurityAlerts";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Real-time analytics and monitoring for SmartMarket Downtown
          </p>
        </div>

        <PeopleAnalytics />
        <StaffOperations />
        <CameraHealth />
        <ZoneAnalytics />
        <SecurityAlerts />
      </div>
    </DashboardLayout>
  );
};

export default Index;
