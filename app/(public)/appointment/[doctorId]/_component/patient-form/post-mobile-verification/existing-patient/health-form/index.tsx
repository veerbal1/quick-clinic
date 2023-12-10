'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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

const healthIssuesSchema = z.object({
  healthIssues: z
    .string()
    .min(3, 'Please provide at least 3 character')
    .max(1000, 'Please provide a maximum of 1000 characters'),
});

function HealthForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof healthIssuesSchema>>({
    resolver: zodResolver(healthIssuesSchema),
    defaultValues: {
      healthIssues: '',
    },
  });

  function onSubmit(values: z.infer<typeof healthIssuesSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
                <Textarea {...field} />
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
