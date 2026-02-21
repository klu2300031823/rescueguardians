import { jsPDF } from 'jspdf';
import type { Patient } from '@/contexts/PatientContext';

export function generatePDF(patient: Patient) {
  const doc = new jsPDF();
  const now = new Date();

  doc.setFontSize(20);
  doc.setTextColor(33, 97, 194);
  doc.text('ResGuard Health Report', 20, 25);

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated: ${now.toLocaleString()}`, 20, 33);

  doc.setDrawColor(33, 97, 194);
  doc.line(20, 37, 190, 37);

  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  let y = 48;
  const line = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 75, y);
    y += 9;
  };

  line('Patient Name', patient.name);
  line('Email', patient.email);
  line('Age', String(patient.age));
  line('Medication Time', patient.medicationTime);
  line('Heart Rate', `${patient.vitals.heartRate} bpm`);
  line('Temperature', `${patient.vitals.temperature}°C`);
  line('Status', patient.status);
  line('Recovery Status', patient.status === 'Recovered' ? 'Recovered' : 'Active');

  if (patient.monitoringStartTime) {
    const duration = Math.round((now.getTime() - new Date(patient.monitoringStartTime).getTime()) / 60000);
    line('Monitoring Duration', `${duration} minutes`);
  }

  if (patient.lastUpdated) {
    line('Last Updated', new Date(patient.lastUpdated).toLocaleString());
  }

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('ResGuard — Smart Real-Time Health Monitoring and Alert System', 20, 280);

  doc.save(`ResGuard_Report_${patient.name.replace(/\s+/g, '_')}.pdf`);
}
