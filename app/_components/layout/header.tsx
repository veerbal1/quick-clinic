import AvatarUI from '../avatar';
import Logo from '../logo';

function Header({ menu, noAvatar }: { menu?: any; noAvatar?: boolean }) {
  return (
    <div className="px-4 py-2 flex justify-between items-center top-0 w-full bg-white sticky z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex gap-2">
        <div className="md:hidden">{menu}</div>
        <Logo />
      </div>
      {!noAvatar && <AvatarUI />}
    </div>
  );
}

export default Header;
