import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
  }
}