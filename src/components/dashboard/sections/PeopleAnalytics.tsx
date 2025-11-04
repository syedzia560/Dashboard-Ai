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
import { getDatabank } from "@/data/databank";

export const PeopleAnalytics = () => {
  const db = getDatabank();
  const genderData = db.people.genderData;
  const ageData = db.people.ageData;
  const trafficData = db.people.trafficData;
  const returningPct = 60 + Math.round((genderData[0].value - 50) / 2); // simple derived value
  const newPct = 100 - returningPct;

  return (
    <div className="space-y-6" id="people">
      <h2 className="text-2xl font-bold">People Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="People Entered Today"
          value={db.people.enteredToday}
          icon={UserPlus}
          trend={{ value: "+12% vs yesterday", positive: true }}
          status="success"
        />
        <StatCard
          title="People Left Today"
          value={db.people.leftToday}
          icon={UserMinus}
          trend={{ value: "+8% vs yesterday", positive: true }}
          status="info"
        />
        <StatCard
          title="Currently in Store"
          value={db.people.currentInStore}
          icon={Users}
          subtitle="Live count"
          status="success"
        />
        <StatCard
          title="Average Dwell Time"
          value={`${db.people.avgDwellMin} min`}
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
                <span className="text-sm text-muted-foreground">{returningPct}%</span>
              </div>
              <Progress value={returningPct} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">New Customers</span>
                <span className="text-sm text-muted-foreground">{newPct}%</span>
              </div>
              <Progress value={newPct} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Queue Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {db.people.queue.map((q) => (
              <div key={q.counter} className="flex justify-between items-center">
                <span className="text-sm">{q.counter}</span>
                <span className="text-lg font-bold">{q.people} people</span>
              </div>
            ))}
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg Wait Time</span>
                <span className="text-lg font-bold text-primary">{(db.people.queue.reduce((a, b) => a + b.people, 0) / db.people.queue.length).toFixed(1)} min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
