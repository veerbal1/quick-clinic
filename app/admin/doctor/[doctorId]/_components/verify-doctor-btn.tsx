'use client';
import { Button } from '@/components/ui/button';
import { verifyDoctor } from '@/lib/actions';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  id: '',
  status: '',
  message: '',
};

function VerifyDoctorButton({ id }: { id: string }) {
  const dispatchWrapper = () => verifyDoctor(id);
  const [state, formAction] = useFormState(dispatchWrapper, initialState);
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant="default" className="ml-2" disabled={pending}>
      {pending && <ReloadIcon className="animate-spin mr-2" />}
      Verify
    </Button>
  );
};

export default VerifyDoctorButton;
