import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, IndianRupee } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { courseId: '1', course: mockCourses[0] },
    { courseId: '2', course: mockCourses[1] },
  ]);

  const removeFromCart = (courseId: string) => {
    setCartItems(cartItems.filter(item => item.courseId !== courseId));
    toast.success('Course removed from cart');
  };

  const total = cartItems.reduce((sum, item) => sum + item.course.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="rounded-full bg-muted p-8 mb-6">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Explore our courses and add them to your cart
        </p>
        <Button onClick={() => navigate('/dashboard/courses')}>
          Browse Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} in your cart
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.courseId} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={item.course.thumbnailUrl}
                    alt={item.course.title}
                    className="h-24 w-32 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <Badge variant="outline" className="mb-1">{item.course.category}</Badge>
                      <h3 className="font-semibold line-clamp-1">{item.course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        By {item.course.teacherName}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{item.course.level}</span>
                      <span>•</span>
                      <span>{item.course.duration}h</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center gap-1 text-xl font-bold">
                      <IndianRupee className="h-5 w-5" />
                      {item.course.price.toLocaleString()}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.courseId)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="shadow-elevated sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="flex items-center">
                    <IndianRupee className="h-4 w-4" />
                    {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-success">-₹0</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {total.toLocaleString()}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full" size="lg" onClick={() => navigate('/dashboard/checkout')}>
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/dashboard/courses')}
              >
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
