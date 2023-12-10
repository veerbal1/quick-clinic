'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import patientFormSchema from './schema';
import * as z from 'zod';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function PatientForm() {
  const [mobileVerificationState, setMobileVerification] = useState({
    mobileNumber: '',
    verified: false,
  });
  return (
    <div>
      {!mobileVerificationState.verified && (
        <MobileVerification setMobileVerification={setMobileVerification} />
      )}
      {mobileVerificationState.verified && (
        <div>Mobile Verified - {mobileVerificationState.mobileNumber}</div>
      )}
    </div>
  );
}

const MobileVerification = ({
  setMobileVerification,
}: {
  setMobileVerification: any;
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [userTypedOtp, setUserTypedOtp] = useState('');
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      mobileNumber: '',
    },
  });

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setOtp(otp.toString());
  };

  const verifyOTP = () => {
    console.log('otp' + otp, userTypedOtp);
    if (parseInt(otp) === parseInt(userTypedOtp)) {
      console.log('OTP verified');
      setError('');
      setMobileVerification({
        mobileNumber: form.getValues('mobileNumber'),
        verified: true,
      });
    } else {
      console.log('OTP not verified');
      setError('OTP did not match');
      setMobileVerification({
        mobileNumber: form.getValues('mobileNumber'),
        verified: false,
      });
    }
  };

  function onSubmit(values: z.infer<typeof patientFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    generateOTP();
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="mobileNumber"
            disabled={Boolean(otp)}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    aria-label="Mobile Number"
                    type="number"
                    disabled={Boolean(otp)}
                    {...field}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button size={'sm'} disabled={Boolean(otp)} type="submit">
              Get OTP
            </Button>
            {otp && (
              <Button type="button" size={'sm'} onClick={generateOTP}>
                Resend OTP
              </Button>
            )}
          </div>
        </form>
      </Form>
      {otp && (
        <>
          <h4 className="text-sm text-green-600">
            OTP is {otp} (for demo purpose only)
          </h4>
          <Input
            value={userTypedOtp}
            onChange={(e) => setUserTypedOtp(e.target.value)}
            placeholder="Enter OTP"
            className="mt-4"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button onClick={verifyOTP}>Submit</Button>
        </>
      )}
    </div>
  );
};

export default PatientForm;
