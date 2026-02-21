import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, User } from 'lucide-react';

const CaretakerSettings: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-lg mx-auto">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
            <div className="p-3 rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{currentUser?.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{currentUser?.role}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">ResGuard v1.0 — Smart Real-Time Health Monitoring and Alert System</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaretakerSettings;
