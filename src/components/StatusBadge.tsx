import React from 'react';
import { cn } from '@/lib/utils';
import type { PatientStatus } from '@/contexts/PatientContext';

const statusStyles: Record<PatientStatus, string> = {
  Normal: 'bg-status-normal text-status-normal-foreground',
  Warning: 'bg-status-warning text-status-warning-foreground',
  Emergency: 'bg-status-emergency text-status-emergency-foreground animate-pulse',
  Recovered: 'bg-status-recovered text-status-recovered-foreground',
  'Not Monitoring': 'bg-muted text-muted-foreground',
};

export const StatusBadge: React.FC<{ status: PatientStatus; className?: string }> = ({ status, className }) => (
  <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', statusStyles[status], className)}>
    {status === 'Emergency' && <span className="mr-1">🔴</span>}
    {status}
  </span>
);
