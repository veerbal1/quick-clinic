import Header from '../_components/layout/header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Header noAvatar />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Layout;
