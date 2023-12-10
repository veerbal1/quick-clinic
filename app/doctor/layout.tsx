import { auth } from '@/auth';
import Header from '../_components/layout/header';
import SlideSidebar from '../admin/_components/slide-sidebar';
import SidebarDashboard from './_components/sidebar';
import { notFound } from 'next/navigation';
import { getDoctorDetails } from '@/lib/db-queries';
import PendingStatus from './_components/admin-approval-status/pending';
import Rejected from './_components/admin-approval-status/rejected';

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

  const { data } = await getDoctorDetails(session?.user.id);

  const pending = data?.verifiedstatus === 'pending';
  const rejected = data?.verifiedstatus === 'rejected';
  const underProcess = pending || rejected;

  return (
    <div className="w-full">
      <Header menu={!underProcess && <SlideSidebar navLinks={navLinks} />} />
      {!underProcess && (
        <div className="pt-5 p-5 flex gap-2">
          <div className="hidden md:block">
            <SidebarDashboard navLinks={navLinks} />
          </div>
          <div className="flex-1">
            {JSON.stringify(data)}
            {children}
          </div>
        </div>
      )}
      {pending && <PendingStatus />}
      {rejected && <Rejected />}
    </div>
  );
}

export default Layout;
