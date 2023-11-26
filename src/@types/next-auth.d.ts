import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    token?: string
    user: {
      role?: string | null
    } & DefaultSession['user']
  }

  interface User {
    role?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string | null
  }
}
