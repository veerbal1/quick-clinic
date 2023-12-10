import Sidebar from '@/app/_components/sidebar';
import NavLink from '@/app/_components/sidebar/sidebar-item';

function SidebarDashboard({
  navLinks,
}: {
  navLinks: {
    title: string;
    link: string;
  }[];
}) {
  return (
    <Sidebar>
      {navLinks.map((item) => (
        <NavLink key={item.link} item={item} />
      ))}
    </Sidebar>
  );
}

export default SidebarDashboard;
