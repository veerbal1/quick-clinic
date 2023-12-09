import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import SidebarDashboard from '../sidebar';

function SlideSidebar({
  navLinks,
}: {
  navLinks: {
    title: string;
    link: string;
  }[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-72" side="left">
        <div className="w-full pt-4">
          <SidebarDashboard navLinks={navLinks} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SlideSidebar;
