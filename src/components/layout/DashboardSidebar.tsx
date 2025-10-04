import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  ShoppingCart,
  GraduationCap,
  Video,
  Users,
  UserCog,
  Settings,
  LayoutDashboard,
  Plus,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Courses',
    href: '/dashboard/courses',
    icon: BookOpen,
  },
  {
    title: 'My Courses',
    href: '/dashboard/my-courses',
    icon: GraduationCap,
    roles: ['STUDENT'],
  },
  {
    title: 'Cart',
    href: '/dashboard/cart',
    icon: ShoppingCart,
    roles: ['STUDENT'],
  },
  {
    title: 'Create Course',
    href: '/teacher/create-course',
    icon: Plus,
    roles: ['TEACHER'],
  },
  {
    title: 'My Sessions',
    href: '/teacher/sessions',
    icon: Video,
    roles: ['TEACHER'],
  },
  {
    title: 'Students',
    href: '/dashboard/admin/students',
    icon: Users,
    roles: ['ADMIN_STUDENT', 'SUPERADMIN'],
  },
  {
    title: 'Teachers',
    href: '/dashboard/admin/teachers',
    icon: UserCog,
    roles: ['ADMIN_TEACHER', 'SUPERADMIN'],
  },
  {
    title: 'Settings',
    href: '/settings/profile',
    icon: Settings,
  },
];

export const DashboardSidebar = () => {
  const { user } = useAuth();

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(user?.role || '')
  );

  return (
    <aside className="hidden w-64 border-r bg-card lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
