import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Courses from "./pages/dashboard/Courses";
import CourseDetail from "./pages/dashboard/CourseDetail";
import Cart from "./pages/dashboard/Cart";
import MyCourses from "./pages/dashboard/MyCourses";
import CreateCourse from "./pages/teacher/CreateCourse";
import Sessions from "./pages/teacher/Sessions";
import Students from "./pages/admin/Students";
import Teachers from "./pages/admin/Teachers";
import Profile from "./pages/settings/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="cart" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="my-courses" element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <MyCourses />
                </ProtectedRoute>
              } />
              <Route path="admin/students" element={
                <ProtectedRoute allowedRoles={['ADMIN_STUDENT', 'SUPERADMIN']}>
                  <Students />
                </ProtectedRoute>
              } />
              <Route path="admin/teachers" element={
                <ProtectedRoute allowedRoles={['ADMIN_TEACHER', 'SUPERADMIN']}>
                  <Teachers />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/teacher" element={
              <ProtectedRoute allowedRoles={['TEACHER']}>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="create-course" element={<CreateCourse />} />
              <Route path="sessions" element={<Sessions />} />
            </Route>

            <Route path="/settings" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
