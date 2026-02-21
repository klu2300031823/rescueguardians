import React from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Square, HeartPulse, FileDown, Thermometer, Heart } from 'lucide-react';
import { generatePDF } from '@/lib/pdfGenerator';

const PatientList: React.FC = () => {
  const { patients, startMonitoring, stopMonitoring, markRecovered } = usePatients();

  return (
    <div className="space-y-4">
      {patients.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No patients added yet. Go to "Add Patient" to register patients.</p>
          </CardContent>
        </Card>
      ) : (
        patients.map(p => (
          <Card key={p.id} className={`shadow-card transition-all animate-fade-in ${p.status === 'Emergency' ? 'border-status-emergency/50 bg-status-emergency/5' : ''}`}>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                    <span>📧 {p.email}</span>
                    <span>🎂 Age: {p.age}</span>
                    <span>💊 Med: {p.medicationTime}</span>
                  </div>
                  {p.isMonitoring && (
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-status-emergency" /> {p.vitals.heartRate} bpm</span>
                      <span className="flex items-center gap-1"><Thermometer className="h-3.5 w-3.5 text-status-warning" /> {p.vitals.temperature}°C</span>
                      {p.lastUpdated && <span className="text-muted-foreground">Updated: {new Date(p.lastUpdated).toLocaleTimeString()}</span>}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.status !== 'Recovered' && !p.isMonitoring && (
                    <Button size="sm" onClick={() => startMonitoring(p.id)} className="gap-1">
                      <Play className="h-3.5 w-3.5" /> Start
                    </Button>
                  )}
                  {p.isMonitoring && (
                    <Button size="sm" variant="outline" onClick={() => stopMonitoring(p.id)} className="gap-1">
                      <Square className="h-3.5 w-3.5" /> Stop
                    </Button>
                  )}
                  {p.status !== 'Recovered' && (
                    <Button size="sm" variant="outline" onClick={() => markRecovered(p.id)} className="gap-1 text-status-normal border-status-normal/30 hover:bg-status-normal/10">
                      <HeartPulse className="h-3.5 w-3.5" /> Recovered
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => generatePDF(p)} className="gap-1">
                    <FileDown className="h-3.5 w-3.5" /> PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PatientList;
