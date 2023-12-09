import { auth } from '@/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { logout } from '@/lib/actions';
import SignoutButton from './signout-button';
import { getInitialsFromName } from '@/lib/format';

async function AvatarUI() {
  const session = await auth();
  const user = session?.user;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="">
          <AvatarFallback>
            {getInitialsFromName(user?.name as string)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] mr-4">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user?.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email}
          </p>
        </div>
        <hr className='my-4'/>
        <form action={logout}>
          <SignoutButton />
        </form>
      </PopoverContent>
    </Popover>
  );
}
export default AvatarUI;
