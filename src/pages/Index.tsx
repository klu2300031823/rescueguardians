import { Link } from 'react-router-dom';
import { Heart, Shield, Activity, Bell, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Activity, title: 'Real-Time Monitoring', desc: 'Continuous vital signs tracking with automatic updates every 3 seconds' },
  { icon: Bell, title: 'Smart Alerts', desc: 'Instant emergency notifications for abnormal vital readings' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Separate dashboards for caretakers and patients' },
  { icon: FileText, title: 'PDF Reports', desc: 'Generate and download comprehensive patient health reports' },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    {/* Hero */}
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-5" />
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg gradient-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">ResGuard</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" asChild><Link to="/login">Sign In</Link></Button>
          <Button asChild><Link to="/signup">Get Started</Link></Button>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20 lg:py-28">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Activity className="h-3.5 w-3.5" /> Smart Health Monitoring
        </div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
          Real-Time Health<br />
          <span className="text-primary">Monitoring & Alerts</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          ResGuard provides continuous vital signs monitoring with instant emergency alerts, helping caretakers deliver better patient care.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild className="gap-2">
            <Link to="/signup">Start Monitoring <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>

    {/* Features */}
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold text-foreground text-center mb-10">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(f => (
          <div key={f.title} className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all">
            <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-4">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
      ResGuard © {new Date().getFullYear()} — Smart Real-Time Health Monitoring and Alert System
    </footer>
  </div>
);

export default Index;
