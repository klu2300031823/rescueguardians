import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePatients } from '@/contexts/PatientContext';
import { VitalCard } from '@/components/VitalCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Heart, Thermometer, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HealthStatus: React.FC = () => {
  const { currentUser } = useAuth();
  const { getPatientByEmail } = usePatients();
  const patient = currentUser ? getPatientByEmail(currentUser.email) : undefined;

  if (!patient) return <p className="text-muted-foreground">No health data available.</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VitalCard title="Heart Rate" value={patient.vitals.heartRate} unit="bpm" icon={Heart} variant={patient.status === 'Emergency' ? 'emergency' : 'normal'} />
        <VitalCard title="Temperature" value={patient.vitals.temperature} unit="°C" icon={Thermometer} variant={patient.status === 'Warning' ? 'warning' : 'normal'} />
        <VitalCard title="Overall Status" value={patient.status} icon={Activity} />
      </div>
      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Health Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Current Status:</span><StatusBadge status={patient.status} /></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Monitoring:</span><span className="text-foreground">{patient.isMonitoring ? 'Active' : 'Inactive'}</span></div>
            {patient.lastUpdated && <div className="flex justify-between"><span className="text-muted-foreground">Last Updated:</span><span className="text-foreground">{new Date(patient.lastUpdated).toLocaleTimeString()}</span></div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthStatus;
