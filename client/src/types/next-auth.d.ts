declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    role: 'ong';
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}