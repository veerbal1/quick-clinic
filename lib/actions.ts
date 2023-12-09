'use server';

import { signIn, signOut } from '@/auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { createClient } from '@vercel/postgres';
import signUpFormSchema from '@/app/_components/signup-form/schema';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    throw error;
  }
}

export async function signUpAction(
  prevState: string | undefined,
  formData: FormData
) {
  let success = false;
  try {
    const client = createClient();
    await client.connect();
    const formDataObject = Object.fromEntries(formData);
    const validatedData = signUpFormSchema.parse(formDataObject);
    console.log('Validated data', validatedData);

    const { rowCount, rows: singleUser } =
      await client.sql`SELECT id FROM quick_clinic_users WHERE email = ${validatedData.email};`;
    if (rowCount) return 'User already exists';

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    await client.sql`
      INSERT INTO 
        quick_clinic_users (name, email, password, role) 
        VALUES (
          ${validatedData.name}, 
          ${validatedData.email}, 
          ${hashedPassword},
          'doctor'
        );`;
    console.log('User inserted');
    const { rows } = await client.sql`
    SELECT id, name FROM quick_clinic_users WHERE email = ${validatedData.email};`;
    const user = rows[0];
    const { id: userId } = user;
    const experience = parseInt(validatedData.experience);

    await client.sql`
          INSERT INTO quick_clinic_doctors (
              doctorId,
              gender,
              specialization,
              qualifications,
              experience,
              bio,
              contactNumber,
              location
            )
          VALUES (
            ${userId},
            ${validatedData.gender},
            ${validatedData.specialization},
            ${validatedData.qualifications},
            ${experience},
            ${validatedData.bio},
            ${validatedData.contactNumber},
            ${validatedData.location}
          );
    `;
    console.log('Doctor details inserted');

    success = true;
    await client.end();
    return 'User Submitted Successfully';
  } catch (error) {
    console.log('Signup error', error);
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return error.errors.map((err) => err.message).join(', ');
    }

    if ((error as Error).message.includes('CredentialsSignup')) {
      return 'CredentialsSignup';
    }
    return JSON.stringify(error);
  } finally {
    if (success) {
      redirect('/');
    }
  }
}

export async function logout() {
  await signOut();
}
