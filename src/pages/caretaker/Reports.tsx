import React from 'react';
import { usePatients } from '@/contexts/PatientContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { FileDown } from 'lucide-react';
import { generatePDF } from '@/lib/pdfGenerator';

const Reports: React.FC = () => {
  const { patients } = usePatients();

  return (
    <div className="space-y-4">
      <Card className="shadow-card">
        <CardHeader><CardTitle>Patient Reports</CardTitle></CardHeader>
        <CardContent>
          {patients.length === 0 ? (
            <p className="text-sm text-muted-foreground">No patients to generate reports for.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Name</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Email</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(p => (
                    <tr key={p.id} className="border-b border-border/50">
                      <td className="py-2 px-3 text-foreground">{p.name}</td>
                      <td className="py-2 px-3 text-muted-foreground">{p.email}</td>
                      <td className="py-2 px-3"><StatusBadge status={p.status} /></td>
                      <td className="py-2 px-3">
                        <Button size="sm" variant="outline" onClick={() => generatePDF(p)} className="gap-1">
                          <FileDown className="h-3.5 w-3.5" /> Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
