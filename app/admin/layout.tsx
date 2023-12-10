import { auth } from '@/auth';
import Header from '../_components/layout/header';
import Sidebar from './_components/sidebar';
import SlideSidebar from './_components/slide-sidebar';
import { notFound } from 'next/navigation';

const navLinks = [
  {
    title: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    title: 'Verify Doctors',
    link: '/admin/verify-doctors',
  },
];

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) return null;

  if (session?.user.role !== 'admin') {
    notFound();
  }
  return (
    <div className="w-full">
      <Header menu={<SlideSidebar navLinks={navLinks} />} />
      <div className="pt-5 p-5 flex gap-2">
        <div className="hidden md:block">
          <Sidebar navLinks={navLinks} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
