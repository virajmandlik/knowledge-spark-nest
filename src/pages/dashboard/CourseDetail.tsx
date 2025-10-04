import { useParams, useNavigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, Users, IndianRupee, ShoppingCart, PlayCircle, BookOpen, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const course = mockCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold mb-2">Course not found</h2>
        <Button onClick={() => navigate('/dashboard/courses')}>Back to Courses</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success('Course added to cart!');
  };

  const handleEnroll = () => {
    if (course.price === 0) {
      toast.success('Successfully enrolled!');
      navigate('/dashboard/my-courses');
    } else {
      navigate('/dashboard/checkout', { state: { courseId: course.id } });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Button variant="ghost" onClick={() => navigate('/dashboard/courses')}>
        ← Back to Courses
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-card overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <Badge className="mb-2">{course.category}</Badge>
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-sm opacity-90">By {course.teacherName}</p>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-semibold">What you'll learn</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Award className="h-4 w-4 mt-0.5 text-success" />
                          <span>Master core concepts and fundamentals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="h-4 w-4 mt-0.5 text-success" />
                          <span>Build real-world projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="h-4 w-4 mt-0.5 text-success" />
                          <span>Get industry-ready skills</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Requirements</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Basic computer skills</li>
                        <li>• Passion for learning</li>
                        <li>• Internet connection</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="syllabus" className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>12 modules • 48 lessons • {course.duration} hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((module) => (
                      <div key={module} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Module {module}: Introduction</h4>
                          <Badge variant="outline">{module * 3} lessons</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Learn the fundamentals and get started with the basics.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>{course.enrollmentCount} students enrolled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-warning text-warning"
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">Student {review}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Excellent course! The instructor explains everything clearly and the
                          projects are very practical.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card className="shadow-elevated sticky top-20">
            <CardHeader>
              <div className="flex items-baseline gap-2">
                {course.price === 0 ? (
                  <span className="text-3xl font-bold text-success">Free</span>
                ) : (
                  <>
                    <IndianRupee className="h-6 w-6" />
                    <span className="text-3xl font-bold">{course.price.toLocaleString()}</span>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    Rating
                  </span>
                  <span className="font-medium">{course.rating}/5</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Students
                  </span>
                  <span className="font-medium">{course.enrollmentCount?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration
                  </span>
                  <span className="font-medium">{course.duration} hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Level
                  </span>
                  <span className="font-medium">{course.level}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                {user?.role === 'STUDENT' && (
                  <>
                    <Button className="w-full" size="lg" onClick={handleEnroll}>
                      <PlayCircle className="mr-2 h-5 w-5" />
                      {course.price === 0 ? 'Enroll Now' : 'Enroll Course'}
                    </Button>
                    {course.price > 0 && (
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </Button>
                    )}
                  </>
                )}
              </div>

              <div className="text-xs text-center text-muted-foreground pt-2 border-t">
                30-day money-back guarantee
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
