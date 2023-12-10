'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { PatientProfile } from '../../type';
import { redirect } from 'next/navigation';

const healthIssuesSchema = z.object({
  healthIssues: z
    .string()
    .min(3, 'Please provide at least 3 character')
    .max(1000, 'Please provide a maximum of 1000 characters'),
});

function HealthForm({
  doctorId,
  patientProfile,
}: {
  doctorId: string;
  patientProfile: PatientProfile;
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof healthIssuesSchema>>({
    resolver: zodResolver(healthIssuesSchema),
    defaultValues: {
      healthIssues: '',
    },
  });

  function onSubmit(values: z.infer<typeof healthIssuesSchema>) {
    setLoading(true);
    // Patientid, doctorid, healthIssues, date, token number
    fetch('/api/submit-new-appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientId: patientProfile.id,
        doctorId: doctorId,
        healthIssues: values.healthIssues,
        date: new Date().toDateString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log('Appointment created', data)
        if (data.data.status === 'success') {
          router.push('/appointment-token/' + data.data.appointmentId)
        }
      });
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="healthIssues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health Issues</FormLabel>
              <FormControl>
                <Textarea readOnly={loading} {...field} />
              </FormControl>
              <FormDescription>
                Please provide a brief description of your health issues.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default HealthForm;
