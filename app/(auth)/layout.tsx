import Logo from '../_components/logo';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <Logo />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Revolutionizing healthcare with a click. Our platform connects
              patients with top healthcare professionals seamlessly, ensuring
              fast, personalized medical attention. Experience healthcare
              convenience like never before!
            </p>
            <footer className="text-sm">Dr. Veerbal Singh</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
