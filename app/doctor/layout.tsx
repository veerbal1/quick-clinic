import { auth } from '@/auth';
import Header from '../_components/layout/header';
import SlideSidebar from '../admin/_components/slide-sidebar';
import SidebarDashboard from './_components/sidebar';
import { notFound } from 'next/navigation';

const navLinks = [
  {
    title: 'Dashboard',
    link: '/doctor/dashboard',
  },
  {
    title: 'Appointments',
    link: '/doctor/appointments',
  },
];

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) return null;

  if (session?.user.role !== 'doctor') {
    notFound();
  }
  return (
    <div className="w-full">
      <Header menu={<SlideSidebar navLinks={navLinks} />} />
      <div className="pt-5 p-5 flex gap-2">
        <div className="hidden md:block">
          <SidebarDashboard navLinks={navLinks} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
