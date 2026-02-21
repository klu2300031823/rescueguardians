import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePatients } from '@/contexts/PatientContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertTriangle } from 'lucide-react';

const PatientAlerts: React.FC = () => {
  const { currentUser } = useAuth();
  const { getPatientByEmail } = usePatients();
  const patient = currentUser ? getPatientByEmail(currentUser.email) : undefined;

  const alerts = patient?.alerts ?? [];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No alerts at this time.</p>
        ) : (
          <div className="space-y-2">
            {alerts.slice().reverse().map(a => (
              <div key={a.id} className={`p-3 rounded-lg text-sm ${a.type === 'emergency' ? 'bg-status-emergency/10 border border-status-emergency/30' : 'bg-secondary'}`}>
                <div className="flex items-center gap-2">
                  {a.type === 'emergency' && <AlertTriangle className="h-4 w-4 text-status-emergency" />}
                  <span className="text-foreground">{a.message}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{new Date(a.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientAlerts;
