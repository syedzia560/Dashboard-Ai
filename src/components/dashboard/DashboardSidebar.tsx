import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Camera,
  MapPin,
  Shield,
  UserCircle,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Overview", url: "#overview", icon: LayoutDashboard },
  { title: "People Analytics", url: "#people", icon: Users },
  { title: "Staff Operations", url: "#staff", icon: UserCircle },
  { title: "Camera Health", url: "#cameras", icon: Camera },
  { title: "Zone Analytics", url: "#zones", icon: MapPin },
  { title: "Security Alerts", url: "#security", icon: Shield },
  { title: "Settings", url: "#settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="px-4 py-6">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-sidebar-primary" />
            {state !== "collapsed" && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">SmartMarket</h2>
                <p className="text-xs text-sidebar-foreground/60">CCTV Analytics</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
<NavLink 
                      to={item.url}
                      onClick={(e) => {
                        if (item.url.startsWith("#")) {
                          e.preventDefault();
                          const el = document.getElementById(item.url.slice(1));
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                            history.replaceState(null, "", item.url);
                          }
                        }
                      }}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
