import { Course } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const levelColors = {
    Beginner: 'bg-success/10 text-success border-success/20',
    Intermediate: 'bg-secondary/10 text-secondary border-secondary/20',
    Advanced: 'bg-warning/10 text-warning border-warning/20',
    Expert: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <Card 
      className="group h-full shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/dashboard/courses/${course.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400'}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {course.price === 0 && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
            Free
          </Badge>
        )}
        <Badge className={`absolute top-3 left-3 ${levelColors[course.level]}`}>
          {course.level}
        </Badge>
      </div>

      <CardHeader>
        <div className="space-y-1">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
        </div>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-medium">{course.rating || 'New'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.enrollmentCount?.toLocaleString() || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}h</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            By {course.teacherName || 'Instructor'}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-1">
          {course.price > 0 ? (
            <>
              <IndianRupee className="h-4 w-4" />
              <span className="text-2xl font-bold">{course.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-success">Free</span>
          )}
        </div>
        <Button variant="secondary" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
