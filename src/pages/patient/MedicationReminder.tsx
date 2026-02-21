import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePatients } from '@/contexts/PatientContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Clock } from 'lucide-react';

const MedicationReminder: React.FC = () => {
  const { currentUser } = useAuth();
  const { getPatientByEmail } = usePatients();
  const patient = currentUser ? getPatientByEmail(currentUser.email) : undefined;

  if (!patient) return <p className="text-muted-foreground">No medication data available.</p>;

  return (
    <Card className="shadow-card max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5 text-primary" /> Medication Reminder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
          <div className="p-3 rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-lg">{patient.medicationTime}</p>
            <p className="text-sm text-muted-foreground">Daily medication schedule</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationReminder;
