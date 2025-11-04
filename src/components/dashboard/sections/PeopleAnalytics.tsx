import { Users, UserPlus, UserMinus, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "../StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const genderData = [
  { name: "Male", value: 58, color: "hsl(var(--chart-1))" },
  { name: "Female", value: 42, color: "hsl(var(--chart-2))" },
];

const ageData = [
  { age: "18-25", count: 45 },
  { age: "26-35", count: 78 },
  { age: "36-45", count: 62 },
  { age: "46-55", count: 41 },
  { age: "56+", count: 28 },
];

const trafficData = [
  { time: "9AM", visitors: 45 },
  { time: "11AM", visitors: 89 },
  { time: "1PM", visitors: 142 },
  { time: "3PM", visitors: 98 },
  { time: "5PM", visitors: 156 },
  { time: "7PM", visitors: 67 },
];

export const PeopleAnalytics = () => {
  return (
    <div className="space-y-6" id="people">
      <h2 className="text-2xl font-bold">People Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="People Entered Today"
          value="1,247"
          icon={UserPlus}
          trend={{ value: "+12% vs yesterday", positive: true }}
          status="success"
        />
        <StatCard
          title="People Left Today"
          value="1,189"
          icon={UserMinus}
          trend={{ value: "+8% vs yesterday", positive: true }}
          status="info"
        />
        <StatCard
          title="Currently in Store"
          value="58"
          icon={Users}
          subtitle="Live count"
          status="success"
        />
        <StatCard
          title="Average Dwell Time"
          value="23 min"
          icon={Clock}
          trend={{ value: "+2 min vs avg", positive: true }}
          status="info"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Group Segmentation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageData}>
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Trends - Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trafficData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Returning Customers</span>
                <span className="text-sm text-muted-foreground">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">New Customers</span>
                <span className="text-sm text-muted-foreground">32%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Queue Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Counter 1</span>
              <span className="text-lg font-bold">4 people</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Counter 2</span>
              <span className="text-lg font-bold">7 people</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Counter 3</span>
              <span className="text-lg font-bold">3 people</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg Wait Time</span>
                <span className="text-lg font-bold text-primary">4.2 min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
