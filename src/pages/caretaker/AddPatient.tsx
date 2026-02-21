import React, { useState } from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Check } from 'lucide-react';

const AddPatient: React.FC = () => {
  const { addPatient } = usePatients();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [medicationTime, setMedicationTime] = useState('08:00');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !age) return;
    addPatient({ name, email, age: parseInt(age), medicationTime });
    setName(''); setEmail(''); setAge(''); setMedicationTime('08:00');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-primary" /> Add New Patient</CardTitle>
          <CardDescription>Register a patient for health monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pname">Patient Name</Label>
              <Input id="pname" placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pemail">Email</Label>
              <Input id="pemail" type="email" placeholder="patient@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="page">Age</Label>
              <Input id="page" type="number" min="1" max="150" placeholder="45" value={age} onChange={e => setAge(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pmed">Medication Time</Label>
              <Input id="pmed" type="time" value={medicationTime} onChange={e => setMedicationTime(e.target.value)} />
            </div>
            {success && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-status-normal/10 text-status-normal text-sm">
                <Check className="h-4 w-4" /> Patient added successfully!
              </div>
            )}
            <Button type="submit" className="w-full">Add Patient</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPatient;
