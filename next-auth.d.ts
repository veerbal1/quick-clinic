import NextAuth, { DefaultSession, User, JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string | null;
      approval_status: string | null;
    } & DefaultSession['user'];
  }
  interface User {
    id: string;
    name?: string | null;
    role?: string | null;
    permissions?: string[] | null;
    approval_status?: any;
  }
}
