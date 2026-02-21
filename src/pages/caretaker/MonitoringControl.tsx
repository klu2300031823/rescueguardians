import React from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, Activity } from 'lucide-react';

const MonitoringControl: React.FC = () => {
  const { patients, startMonitoring, stopMonitoring } = usePatients();
  const monitorable = patients.filter(p => p.status !== 'Recovered');

  return (
    <div className="space-y-4">
      <Card className="shadow-card">
        <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Monitoring Control Panel</CardTitle></CardHeader>
        <CardContent>
          {monitorable.length === 0 ? (
            <p className="text-muted-foreground text-sm">No patients available for monitoring.</p>
          ) : (
            <div className="space-y-3">
              {monitorable.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${p.isMonitoring ? 'bg-status-normal animate-pulse' : 'bg-muted-foreground/30'}`} />
                    <div>
                      <p className="font-medium text-foreground text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.isMonitoring ? 'Live monitoring' : 'Idle'}</p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  {p.isMonitoring ? (
                    <Button size="sm" variant="outline" onClick={() => stopMonitoring(p.id)}><Square className="h-3.5 w-3.5 mr-1" /> Stop</Button>
                  ) : (
                    <Button size="sm" onClick={() => startMonitoring(p.id)}><Play className="h-3.5 w-3.5 mr-1" /> Start</Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringControl;
