import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface VitalCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  variant?: 'default' | 'normal' | 'warning' | 'emergency';
  className?: string;
}

const variantStyles = {
  default: 'border-border',
  normal: 'border-status-normal/30 bg-status-normal/5',
  warning: 'border-status-warning/30 bg-status-warning/5',
  emergency: 'border-status-emergency/30 bg-status-emergency/5 animate-pulse-slow',
};

const iconVariant = {
  default: 'text-primary',
  normal: 'text-status-normal',
  warning: 'text-status-warning',
  emergency: 'text-status-emergency',
};

export const VitalCard: React.FC<VitalCardProps> = ({ title, value, unit, icon: Icon, variant = 'default', className }) => (
  <Card className={cn('shadow-card transition-all hover:shadow-card-hover', variantStyles[variant], className)}>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {value}{unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
        <div className={cn('p-3 rounded-xl bg-secondary', iconVariant[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </CardContent>
  </Card>
);
