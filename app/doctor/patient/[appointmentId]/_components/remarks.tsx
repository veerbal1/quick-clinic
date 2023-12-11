'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { addRemarks } from '@/lib/actions';
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';

function Remarks({ appointmentId }: { appointmentId: string }) {
  const [state, dispatch] = useFormState(addRemarks, undefined);
  return (
    <div className="grid grid-cols-1 gap-2">
      <h1 className="text-lg font-bold text-muted-foreground">Remarks</h1>
      <form className="grid grid-cols-1 gap-2" action={dispatch}>
        <Textarea
          name="doctorremarks"
          placeholder="Enter your remarks here..."
          required
          minLength={5}
        />
        <input
          className="hidden"
          type="radio"
          name="appointment_id"
          value={appointmentId}
          defaultChecked
          defaultValue={appointmentId}
        ></input>
        <CompleteButton />
      </form>
    </div>
  );
}

const CompleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <ReloadIcon className="mr-2" />
      ) : (
        <CheckIcon className="mr-2" />
      )}
      Complete
    </Button>
  );
};
export default Remarks;
