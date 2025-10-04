import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Video, TrendingUp, Award, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'STUDENT':
        return [
          { title: 'Enrolled Courses', value: '5', icon: BookOpen, trend: '+2 this month' },
          { title: 'Completed', value: '3', icon: Award, trend: '60% completion' },
          { title: 'Live Sessions', value: '12', icon: Video, trend: '3 upcoming' },
          { title: 'Hours Learned', value: '48', icon: TrendingUp, trend: '+8 this week' },
        ];
      case 'TEACHER':
        return [
          { title: 'My Courses', value: '8', icon: BookOpen, trend: '2 pending approval' },
          { title: 'Total Students', value: '342', icon: Users, trend: '+45 this month' },
          { title: 'Live Sessions', value: '24', icon: Video, trend: '5 scheduled' },
          { title: 'Avg Rating', value: '4.8', icon: TrendingUp, trend: 'Excellent' },
        ];
      case 'ADMIN_STUDENT':
      case 'ADMIN_TEACHER':
      case 'SUPERADMIN':
        return [
          { title: 'Total Courses', value: '156', icon: BookOpen, trend: '+12 this month' },
          { title: 'Active Users', value: '2,543', icon: Users, trend: '+234 this month' },
          { title: 'Revenue', value: '$45.2K', icon: DollarSign, trend: '+18% this month' },
          { title: 'Sessions', value: '89', icon: Video, trend: 'This week' },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your learning journey today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Completed Module {i}</p>
                    <p className="text-xs text-muted-foreground">
                      Introduction to Algorithms
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{i}h ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Live sessions you don't want to miss</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Advanced Data Structures</p>
                    <p className="text-xs text-muted-foreground">
                      Today at {14 + i}:00
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
