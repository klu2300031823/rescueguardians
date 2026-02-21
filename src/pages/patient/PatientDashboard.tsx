import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Heart, LayoutDashboard, Activity, Pill, Bell, UserCircle, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import PatientHome from '@/pages/patient/PatientHome';
import HealthStatus from '@/pages/patient/HealthStatus';
import MedicationReminder from '@/pages/patient/MedicationReminder';
import PatientAlerts from '@/pages/patient/PatientAlerts';
import PatientProfile from '@/pages/patient/PatientProfile';

const navItems = [
  { key: 'home', label: 'Dashboard Home', icon: LayoutDashboard },
  { key: 'health', label: 'My Health Status', icon: Activity },
  { key: 'medication', label: 'Medication Reminder', icon: Pill },
  { key: 'alerts', label: 'Alerts', icon: Bell },
  { key: 'profile', label: 'Profile', icon: UserCircle },
];

const PatientDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!currentUser || currentUser.role !== 'patient') return <Navigate to="/login" />;

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <PatientHome />;
      case 'health': return <HealthStatus />;
      case 'medication': return <MedicationReminder />;
      case 'alerts': return <PatientAlerts />;
      case 'profile': return <PatientProfile />;
      default: return <PatientHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-0 -translate-x-full lg:w-16 lg:translate-x-0'
      )}>
        <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
          <Heart className="h-6 w-6 text-sidebar-primary shrink-0" />
          {sidebarOpen && <span className="text-lg font-bold text-sidebar-accent-foreground">ResGuard</span>}
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); if (window.innerWidth < 1024) setSidebarOpen(false); }}
              className={cn(
                'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors',
                activeTab === item.key
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className={cn('flex-1 transition-all duration-300', sidebarOpen ? 'lg:ml-64' : 'lg:ml-16')}>
        <header className="sticky top-0 z-40 flex items-center gap-4 px-4 py-3 bg-card border-b border-border shadow-card">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{navItems.find(i => i.key === activeTab)?.label}</h2>
            <p className="text-xs text-muted-foreground">Welcome, {currentUser.name}</p>
          </div>
        </header>
        <div className="p-4 lg:p-6 animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default PatientDashboard;
