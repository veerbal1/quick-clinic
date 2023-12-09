'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({
  item,
}: {
  item: {
    title: string;
    link: string;
  };
}) {
  const pathname = usePathname();
  return (
    <Link href={item.link}>
      <Button
        variant={pathname === item.link ? 'default' : 'secondary'}
        className={cn('w-full justify-start')}
      >
        {item.title}
      </Button>
    </Link>
  );
}

export default NavLink;
