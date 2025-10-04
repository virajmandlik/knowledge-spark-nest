import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Video, Calendar, Users, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const mockSessions = [
  {
    id: '1',
    title: 'Advanced Data Structures',
    courseName: 'Introduction to Algorithms',
    startsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 90,
    participants: 45,
    status: 'UPCOMING' as const,
  },
  {
    id: '2',
    title: 'Sorting Algorithms Deep Dive',
    courseName: 'Introduction to Algorithms',
    startsAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 60,
    participants: 52,
    status: 'ENDED' as const,
  },
];

export default function Sessions() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startsAt: '',
    durationMinutes: '60',
  });

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    toast.success('Live session scheduled successfully!');
    setOpen(false);
    setFormData({ title: '', description: '', startsAt: '', durationMinutes: '60' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'bg-blue-500/10 text-blue-500';
      case 'LIVE': return 'bg-green-500/10 text-green-500';
      case 'ENDED': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Sessions</h1>
          <p className="text-muted-foreground">Manage your live teaching sessions</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
              <DialogDescription>Create a new live session for your students</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-title">Title *</Label>
                <Input
                  id="session-title"
                  placeholder="e.g., Advanced Data Structures"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-desc">Description</Label>
                <Textarea
                  id="session-desc"
                  placeholder="What will you cover in this session?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="session-time">Start Time *</Label>
                  <Input
                    id="session-time"
                    type="datetime-local"
                    value={formData.startsAt}
                    onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-duration">Duration (min) *</Label>
                  <Input
                    id="session-duration"
                    type="number"
                    placeholder="60"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit">Create Session</Button>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {mockSessions.map((session) => (
          <Card key={session.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    {session.title}
                  </CardTitle>
                  <CardDescription>{session.courseName}</CardDescription>
                </div>
                <Badge className={getStatusColor(session.status)}>
                  {session.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(session.startsAt).toLocaleDateString('en-IN', {
                    dateStyle: 'medium',
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {new Date(session.startsAt).toLocaleTimeString('en-IN', {
                    timeStyle: 'short',
                  })} ({session.durationMinutes} min)
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {session.participants} enrolled
                </div>
              </div>
              {session.status === 'UPCOMING' && (
                <div className="mt-4 flex gap-2">
                  <Button size="sm">Edit</Button>
                  <Button size="sm" variant="outline">Cancel Session</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
