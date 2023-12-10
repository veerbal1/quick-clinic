import * as z from 'zod';

const patientFormSchema = z.object({
  mobileNumber: z
    .string()
    .min(10, 'Mobile number must be 10 digits')
    .max(10, 'Mobile number must be 10 digits'),
});

export default patientFormSchema;
