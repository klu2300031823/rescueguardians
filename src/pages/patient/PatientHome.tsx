import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePatients } from '@/contexts/PatientContext';
import { VitalCard } from '@/components/VitalCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Heart, Thermometer, Activity, Clock, AlertTriangle, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function getHealthSuggestions(heartRate: number, temperature: number) {
  if (temperature > 40 || heartRate > 90) {
    return {
      level: 'emergency' as const,
      icon: AlertTriangle,
      title: 'Critical Alert',
      items: [
        'Critical condition detected.',
        'Please seek immediate medical attention.',
        'Avoid physical activity.',
        'Contact your caregiver immediately.',
      ],
    };
  }
  if (temperature >= 38 && temperature <= 40) {
    return {
      level: 'warning' as const,
      icon: AlertCircle,
      title: 'Health Warning',
      items: [
        'You may have mild fever.',
        'Stay hydrated.',
        'Take prescribed medication.',
        'Rest properly.',
      ],
    };
  }
  if (heartRate >= 85 && heartRate <= 90) {
    return {
      level: 'elevated' as const,
      icon: Info,
      title: 'Elevated Heart Rate',
      items: [
        'Your heart rate is slightly elevated.',
        'Avoid stress.',
        'Practice deep breathing.',
      ],
    };
  }
  return {
    level: 'normal' as const,
    icon: ShieldCheck,
    title: 'All Good',
    items: [
      'Your vitals are normal.',
      'Maintain a healthy routine.',
      'Stay hydrated and active.',
    ],
  };
}

const suggestionStyles = {
  emergency: 'border-status-emergency/50 bg-status-emergency/5',
  warning: 'border-status-warning/50 bg-status-warning/5',
  elevated: 'border-status-warning/30 bg-status-warning/5',
  normal: 'border-status-normal/50 bg-status-normal/5',
};

const suggestionIconStyles = {
  emergency: 'text-status-emergency',
  warning: 'text-status-warning',
  elevated: 'text-status-warning',
  normal: 'text-status-normal',
};

const suggestionBulletStyles = {
  emergency: 'bg-status-emergency',
  warning: 'bg-status-warning',
  elevated: 'bg-status-warning',
  normal: 'bg-status-normal',
};

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

      {patient.isMonitoring && (() => {
        const suggestions = getHealthSuggestions(patient.vitals.heartRate, patient.vitals.temperature);
        const SugIcon = suggestions.icon;
        return (
          <Card className={cn('shadow-card transition-all', suggestionStyles[suggestions.level])}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <SugIcon className={cn('h-5 w-5', suggestionIconStyles[suggestions.level])} />
                <h4 className="font-semibold text-foreground">{suggestions.title}</h4>
              </div>
              <p className="text-xs font-medium text-muted-foreground mb-3">Health Suggestions</p>
              <ul className="space-y-2">
                {suggestions.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className={cn('mt-1.5 h-2 w-2 rounded-full shrink-0', suggestionBulletStyles[suggestions.level])} />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })()}
    </div>
  );
};

export default PatientHome;
