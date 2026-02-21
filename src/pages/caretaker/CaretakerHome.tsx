import React from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { VitalCard } from '@/components/VitalCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Users, Activity, AlertTriangle, HeartPulse } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CaretakerHome: React.FC = () => {
  const { patients } = usePatients();
  const active = patients.filter(p => p.isMonitoring).length;
  const emergencies = patients.filter(p => p.status === 'Emergency').length;
  const recovered = patients.filter(p => p.status === 'Recovered').length;

  const recentAlerts = patients
    .flatMap(p => p.alerts.map(a => ({ ...a, patientName: p.name })))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VitalCard title="Total Patients" value={patients.length} icon={Users} />
        <VitalCard title="Active Monitoring" value={active} icon={Activity} variant="normal" />
        <VitalCard title="Emergency Cases" value={emergencies} icon={AlertTriangle} variant={emergencies > 0 ? 'emergency' : 'default'} />
        <VitalCard title="Recovered" value={recovered} icon={HeartPulse} />
      </div>

      {emergencies > 0 && (
        <Card className="border-status-emergency/50 bg-status-emergency/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-status-emergency" />
            <p className="text-sm font-medium text-foreground">
              ⚠️ Emergency Alert: {emergencies} patient(s) require immediate attention!
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Recent Alerts</CardTitle></CardHeader>
        <CardContent>
          {recentAlerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts yet. Start monitoring patients to see alerts.</p>
          ) : (
            <div className="space-y-2">
              {recentAlerts.map(a => (
                <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.patientName}</p>
                    <p className="text-xs text-muted-foreground">{a.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaretakerHome;
