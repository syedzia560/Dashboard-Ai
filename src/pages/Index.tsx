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
        <div id="overview">
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

        <div id="settings" className="space-y-2">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Project settings placeholder.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
