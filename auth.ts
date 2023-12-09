import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/lib/definitions';
import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const { rows, rowCount } =
      await sql<User>`SELECT * FROM quick_clinic_users WHERE email=${email}`;
    return rowCount ? rows[0] : undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Database query failed.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error('Invalid input credentials format.');
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) {
          throw new Error('No user found with the provided email.');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          throw new Error('Incorrect password.');
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, profile, session, account }) {
      // console.log('JWT', token, user, profile, session, account);
      if (user) {
        token.publicId = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ user, session, token }) {
      session.user.id = token.sub as string;
      session.user.role = (token.role as string) || null;
      return session;
    },
  },
});
