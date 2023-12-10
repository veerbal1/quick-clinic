import Header from '../_components/layout/header';
import SlideSidebar from '../admin/_components/slide-sidebar';
import SidebarDashboard from './_components/sidebar';

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

function Layout({ children }: { children: React.ReactNode }) {
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
