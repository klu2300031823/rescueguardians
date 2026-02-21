import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

export type PatientStatus = 'Normal' | 'Warning' | 'Emergency' | 'Recovered' | 'Not Monitoring';

export interface PatientVitals {
  heartRate: number;
  temperature: number;
}

export interface PatientAlert {
  id: string;
  message: string;
  type: 'emergency' | 'warning' | 'info';
  timestamp: Date;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  medicationTime: string;
  vitals: PatientVitals;
  status: PatientStatus;
  isMonitoring: boolean;
  lastUpdated: Date | null;
  monitoringStartTime: Date | null;
  alerts: PatientAlert[];
}

interface PatientContextType {
  patients: Patient[];
  addPatient: (p: Omit<Patient, 'id' | 'vitals' | 'status' | 'isMonitoring' | 'lastUpdated' | 'monitoringStartTime' | 'alerts'>) => void;
  startMonitoring: (id: string) => void;
  stopMonitoring: (id: string) => void;
  markRecovered: (id: string) => void;
  getPatientByEmail: (email: string) => Patient | undefined;
}

const PatientContext = createContext<PatientContextType | null>(null);

export const usePatients = () => {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatients must be used within PatientProvider');
  return ctx;
};

function getStatus(vitals: PatientVitals): PatientStatus {
  if (vitals.temperature > 40 || vitals.heartRate > 90) return 'Emergency';
  if (vitals.temperature >= 38 && vitals.temperature <= 40) return 'Warning';
  return 'Normal';
}

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const intervalsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const addPatient = useCallback((p: Omit<Patient, 'id' | 'vitals' | 'status' | 'isMonitoring' | 'lastUpdated' | 'monitoringStartTime' | 'alerts'>) => {
    const newPatient: Patient = {
      ...p,
      id: crypto.randomUUID(),
      vitals: { heartRate: 72, temperature: 36.5 },
      status: 'Not Monitoring',
      isMonitoring: false,
      lastUpdated: null,
      monitoringStartTime: null,
      alerts: [],
    };
    setPatients(prev => [...prev, newPatient]);
  }, []);

  const updateVitals = useCallback((id: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id !== id || !p.isMonitoring || p.status === 'Recovered') return p;
      const heartRate = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
      const temperature = parseFloat((Math.random() * (41 - 36) + 36).toFixed(1));
      const vitals = { heartRate, temperature };
      const status = getStatus(vitals);
      const alerts = [...p.alerts];
      if (status === 'Emergency') {
        alerts.push({
          id: crypto.randomUUID(),
          message: `Emergency Alert: ${p.name}'s vitals are abnormal! HR: ${heartRate}, Temp: ${temperature}°C`,
          type: 'emergency',
          timestamp: new Date(),
        });
      }
      return { ...p, vitals, status, lastUpdated: new Date(), alerts };
    }));
  }, []);

  const startMonitoring = useCallback((id: string) => {
    if (intervalsRef.current.has(id)) return;
    setPatients(prev => prev.map(p =>
      p.id === id && p.status !== 'Recovered'
        ? { ...p, isMonitoring: true, status: 'Normal', monitoringStartTime: new Date(), lastUpdated: new Date() }
        : p
    ));
    const interval = setInterval(() => updateVitals(id), 3000);
    intervalsRef.current.set(id, interval);
    // immediate first update
    setTimeout(() => updateVitals(id), 500);
  }, [updateVitals]);

  const stopMonitoring = useCallback((id: string) => {
    const interval = intervalsRef.current.get(id);
    if (interval) { clearInterval(interval); intervalsRef.current.delete(id); }
    setPatients(prev => prev.map(p =>
      p.id === id ? { ...p, isMonitoring: false, status: p.status === 'Recovered' ? 'Recovered' : 'Not Monitoring' } : p
    ));
  }, []);

  const markRecovered = useCallback((id: string) => {
    const interval = intervalsRef.current.get(id);
    if (interval) { clearInterval(interval); intervalsRef.current.delete(id); }
    setPatients(prev => prev.map(p =>
      p.id === id ? { ...p, isMonitoring: false, status: 'Recovered' } : p
    ));
  }, []);

  const getPatientByEmail = useCallback((email: string) => {
    return patients.find(p => p.email === email);
  }, [patients]);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <PatientContext.Provider value={{ patients, addPatient, startMonitoring, stopMonitoring, markRecovered, getPatientByEmail }}>
      {children}
    </PatientContext.Provider>
  );
};
