import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    token?: string
    user: DefaultSession['user'] & {
      role: string
    }
  }

  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string
  }
}
