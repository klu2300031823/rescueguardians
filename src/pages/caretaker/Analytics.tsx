import React from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { VitalCard } from '@/components/VitalCard';
import { Users, Activity, AlertTriangle, HeartPulse } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(152,60%,45%)', 'hsl(38,92%,50%)', 'hsl(0,72%,55%)', 'hsl(213,80%,50%)', 'hsl(215,15%,70%)'];

const Analytics: React.FC = () => {
  const { patients } = usePatients();
  const total = patients.length;
  const active = patients.filter(p => p.isMonitoring).length;
  const emergency = patients.filter(p => p.status === 'Emergency').length;
  const recovered = patients.filter(p => p.status === 'Recovered').length;
  const normal = patients.filter(p => p.status === 'Normal').length;
  const warning = patients.filter(p => p.status === 'Warning').length;

  const pieData = [
    { name: 'Normal', value: normal },
    { name: 'Warning', value: warning },
    { name: 'Emergency', value: emergency },
    { name: 'Recovered', value: recovered },
    { name: 'Not Monitoring', value: total - active - recovered },
  ].filter(d => d.value > 0);

  const barData = [
    { name: 'Total', count: total },
    { name: 'Active', count: active },
    { name: 'Emergency', count: emergency },
    { name: 'Recovered', count: recovered },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VitalCard title="Total Patients" value={total} icon={Users} />
        <VitalCard title="Active Monitoring" value={active} icon={Activity} variant="normal" />
        <VitalCard title="Emergency Cases" value={emergency} icon={AlertTriangle} variant={emergency > 0 ? 'emergency' : 'default'} />
        <VitalCard title="Recovered" value={recovered} icon={HeartPulse} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Patient Overview</CardTitle></CardHeader>
          <CardContent>
            {total === 0 ? <p className="text-sm text-muted-foreground">Add patients to see analytics.</p> : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(213,80%,50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Status Distribution</CardTitle></CardHeader>
          <CardContent>
            {pieData.length === 0 ? <p className="text-sm text-muted-foreground">No data available.</p> : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
