import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Heart, LayoutDashboard, UserPlus, Users, Activity, FileText, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import CaretakerHome from '@/pages/caretaker/CaretakerHome';
import AddPatient from '@/pages/caretaker/AddPatient';
import PatientList from '@/pages/caretaker/PatientList';
import MonitoringControl from '@/pages/caretaker/MonitoringControl';
import Reports from '@/pages/caretaker/Reports';
import Analytics from '@/pages/caretaker/Analytics';
import CaretakerSettings from '@/pages/caretaker/CaretakerSettings';

const navItems = [
  { key: 'home', label: 'Dashboard Home', icon: LayoutDashboard },
  { key: 'add', label: 'Add Patient', icon: UserPlus },
  { key: 'list', label: 'Patient List', icon: Users },
  { key: 'monitoring', label: 'Monitoring Control', icon: Activity },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const CaretakerDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!currentUser || currentUser.role !== 'caretaker') return <Navigate to="/login" />;

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <CaretakerHome />;
      case 'add': return <AddPatient />;
      case 'list': return <PatientList />;
      case 'monitoring': return <MonitoringControl />;
      case 'reports': return <Reports />;
      case 'analytics': return <Analytics />;
      case 'settings': return <CaretakerSettings />;
      default: return <CaretakerHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
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

      {/* Main */}
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default CaretakerDashboard;
