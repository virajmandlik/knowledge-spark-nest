import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, BookOpen, Clock, Award } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export default function MyCourses() {
  const navigate = useNavigate();
  
  const enrolledCourses = [
    { ...mockCourses[0], progress: 65, lastAccessed: '2 hours ago' },
    { ...mockCourses[1], progress: 30, lastAccessed: '1 day ago' },
    { ...mockCourses[2], progress: 90, lastAccessed: '3 hours ago' },
  ];

  if (enrolledCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="rounded-full bg-muted p-8 mb-6">
          <BookOpen className="h-16 w-16 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No enrolled courses yet</h2>
        <p className="text-muted-foreground mb-6">
          Start learning by enrolling in a course
        </p>
        <Button onClick={() => navigate('/dashboard/courses')}>
          Explore Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Continue your learning journey
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/courses')}>
          Browse More Courses
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="shadow-card hover:shadow-elevated transition-all group">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
                {course.progress}% Complete
              </Badge>
            </div>

            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">{course.category}</Badge>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <CardDescription>
                Last accessed {course.lastAccessed}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}h</span>
                </div>
                {course.progress === 100 && (
                  <div className="flex items-center gap-1 text-success">
                    <Award className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" onClick={() => navigate(`/dashboard/courses/${course.id}`)}>
                <PlayCircle className="mr-2 h-4 w-4" />
                {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
