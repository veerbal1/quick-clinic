import SingupForm from '@/app/_components/signup-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function SignUpPage() {
  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Log in
      </Link>
      <div className="lg:p-8 mt-8 py-24">
        <div className="mx-auto flex w-full flex-col justify-center">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Doctor&apos;s Signup
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in the details below to start your journey as a doctor
            </p>
          </div>
          <br />
          <SingupForm />
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
