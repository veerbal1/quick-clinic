import Header from '../_components/layout/header';
import Sidebar from './_components/sidebar';
import SlideSidebar from './_components/slide-sidebar';

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

function Layout({ children }: { children: React.ReactNode }) {
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
