import Sidebar from '@/app/_components/sidebar';
import NavLink from '@/app/_components/sidebar/sidebar-item';

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

function SidebarDashboard() {
  return (
    <Sidebar>
      {navLinks.map((item) => (
        <NavLink key={item.link} item={item} />
      ))}
    </Sidebar>
  );
}

export default SidebarDashboard;
