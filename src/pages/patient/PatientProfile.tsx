import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

const PatientProfile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Card className="shadow-card max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><UserCircle className="h-5 w-5 text-primary" /> My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
          <div className="p-3 rounded-full gradient-primary">
            <UserCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">{currentUser?.name}</p>
            <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
            <p className="text-xs text-muted-foreground capitalize">Role: {currentUser?.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
