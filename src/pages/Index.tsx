import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Video, Award, Users, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of experience',
    },
    {
      icon: Video,
      title: 'Live Sessions',
      description: 'Interactive live classes with real-time Q&A and collaboration',
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Earn recognized certificates upon course completion',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a vibrant community of learners and mentors',
    },
  ];

  const stats = [
    { label: 'Active Students', value: '10,000+' },
    { label: 'Expert Teachers', value: '500+' },
    { label: 'Courses Available', value: '1,000+' },
    { label: 'Success Rate', value: '95%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm" />
            <h1 className="text-xl font-bold text-white">EduPlatform</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate('/auth/login')}>
              Sign In
            </Button>
            <Button className="bg-white text-primary hover:bg-white/90" onClick={() => navigate('/auth/signup')}>
              Get Started
            </Button>
          </div>
        </nav>

        <div className="relative z-10 px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl animate-fade-in">
              Transform Your Future with
              <span className="block bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                Expert-Led Learning
              </span>
            </h1>
            <p className="mb-8 text-lg lg:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Join thousands of learners mastering new skills with our comprehensive courses,
              live sessions, and expert instructors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button size="xl" variant="accent" onClick={() => navigate('/auth/signup')}>
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="xl" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                Explore Courses
              </Button>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="shadow-card text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                    {stat.value}
                  </CardTitle>
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EduPlatform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={feature.title} className="shadow-card hover:shadow-elevated transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="mb-4 h-12 w-12 rounded-lg gradient-primary flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Card className="shadow-elevated gradient-primary overflow-hidden">
            <CardContent className="p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-lg mb-8 text-white/90">
                Join our community today and unlock your potential with world-class education
              </p>
              <Button size="xl" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate('/auth/signup')}>
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="gradient-primary h-8 w-8 rounded-lg" />
              <span className="font-semibold">EduPlatform</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EduPlatform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
