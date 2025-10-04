export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN_STUDENT' | 'ADMIN_TEACHER' | 'SUPERADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
  locale?: string;
  createdAt: string;
}

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type CourseStatus = 'DRAFT' | 'PENDING_PRICE_APPROVAL' | 'PUBLISHED' | 'ARCHIVED';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: CourseLevel;
  price: number;
  currency: string;
  teacherId: string;
  teacherName?: string;
  thumbnailUrl?: string;
  published: boolean;
  status: CourseStatus;
  rating?: number;
  enrollmentCount?: number;
  duration?: number; // in hours
  createdAt: string;
  updatedAt: string;
}

export interface LiveSession {
  id: string;
  courseId: string;
  courseName?: string;
  title: string;
  description?: string;
  startsAt: string;
  durationMinutes: number;
  roomId: string;
  joinToken?: string;
  createdBy: string;
  participants?: number;
  status?: 'UPCOMING' | 'LIVE' | 'ENDED';
}

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type PaymentProvider = 'RAZORPAY' | 'STRIPE' | 'PAYPAL';

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  courseName?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  createdAt: string;
}

export type NotificationType = 'SESSION_START' | 'PAYMENT_SUCCESS' | 'ADMIN_MESSAGE' | 'COURSE_APPROVED' | 'FEEDBACK_REQUEST';

export interface Notification {
  id: string;
  toUserId: string;
  type: NotificationType;
  title: string;
  message?: string;
  payload?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

export type FeedbackType = 'SESSION' | 'TEACHER' | 'COURSE';

export interface Feedback {
  id: string;
  fromUserId: string;
  fromUserName?: string;
  type: FeedbackType;
  targetId: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved?: boolean;
}

export interface CartItem {
  courseId: string;
  course: Course;
  addedAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  course?: Course;
  progress: number;
  enrolledAt: string;
  completedAt?: string;
}
