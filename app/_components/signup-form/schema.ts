import * as z from 'zod';

const signUpFormSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
    gender: z
      .string()
      .refine(
        (value) => value === 'male' || value === 'female',
        "Gender must be either 'male' or 'female'"
      ),
    qualifications: z.string().optional(),
    experience: z
      .string({ required_error: 'Experience is required' })
      .refine(
        (value) => !isNaN(parseInt(value)),
        'Experience must be a number'
      ),
    specialization: z.string().max(255),
    bio: z.string(),
    contactNumber: z
      .string()
      .refine(
        (value) => value.toString().length === 10,
        'Contact number must be 10 digits long'
      ),
    location: z.string().max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default signUpFormSchema;
