import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePatients } from '@/contexts/PatientContext';
import { VitalCard } from '@/components/VitalCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Heart, Thermometer, Activity, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PatientHome: React.FC = () => {
  const { currentUser } = useAuth();
  const { getPatientByEmail } = usePatients();
  const patient = currentUser ? getPatientByEmail(currentUser.email) : undefined;

  if (!patient) {
    return (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center">
          <Activity className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No Monitoring Data</h3>
          <p className="text-sm text-muted-foreground">Your caretaker hasn't added you to the system yet. Please contact your caretaker to get started.</p>
        </CardContent>
      </Card>
    );
  }

  const hrVariant = patient.status === 'Emergency' ? 'emergency' : patient.status === 'Warning' ? 'warning' : 'normal';

  return (
    <div className="space-y-6">
      {patient.status === 'Emergency' && (
        <Card className="border-status-emergency/50 bg-status-emergency/5 animate-pulse-slow">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-status-emergency" />
            <p className="text-sm font-medium text-foreground">🔴 Emergency Alert: Your vitals are abnormal. Please seek medical attention.</p>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-3 mb-2">
        <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
        <StatusBadge status={patient.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <VitalCard title="Heart Rate" value={patient.vitals.heartRate} unit="bpm" icon={Heart} variant={hrVariant} />
        <VitalCard title="Temperature" value={patient.vitals.temperature} unit="°C" icon={Thermometer} variant={hrVariant} />
        <VitalCard title="Medication" value={patient.medicationTime} icon={Clock} />
        <VitalCard title="Status" value={patient.status} icon={Activity} variant={hrVariant} />
      </div>

      {patient.lastUpdated && (
        <p className="text-xs text-muted-foreground">Last updated: {new Date(patient.lastUpdated).toLocaleTimeString()}</p>
      )}
    </div>
  );
};

export default PatientHome;
