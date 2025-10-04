import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, MoreVertical, Mail, Calendar, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockTeachers = [
  { id: 't1', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', courses: 8, pendingApproval: 2, joinedAt: '2024-01-10', status: 'active' },
  { id: 't2', name: 'Mike Chen', email: 'mike@example.com', courses: 5, pendingApproval: 0, joinedAt: '2024-02-15', status: 'active' },
  { id: 't3', name: 'Dr. Emily Watson', email: 'emily@example.com', courses: 12, pendingApproval: 1, joinedAt: '2024-03-01', status: 'active' },
  { id: 't4', name: 'Alex Rivera', email: 'alex@example.com', courses: 3, pendingApproval: 3, joinedAt: '2024-04-20', status: 'active' },
];

export default function Teachers() {
  const [search, setSearch] = useState('');

  const filteredTeachers = mockTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(search.toLowerCase()) ||
    teacher.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Management</h1>
          <p className="text-muted-foreground">Manage teachers and approve course pricing</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Teacher Admin
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teachers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
          <CardDescription>Total: {filteredTeachers.length} teachers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Published Courses</TableHead>
                <TableHead>Pending Approval</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {teacher.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {teacher.courses}
                    </div>
                  </TableCell>
                  <TableCell>
                    {teacher.pendingApproval > 0 ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-warning" />
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                          {teacher.pendingApproval}
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(teacher.joinedAt).toLocaleDateString('en-IN')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Courses
                        </DropdownMenuItem>
                        {teacher.pendingApproval > 0 && (
                          <DropdownMenuItem>
                            <Clock className="h-4 w-4 mr-2" />
                            Review Pending ({teacher.pendingApproval})
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Payment Reports</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
