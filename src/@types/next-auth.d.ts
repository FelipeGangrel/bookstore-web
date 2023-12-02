import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      jwt?: string | null
      role?: string | null
    } & DefaultSession['user']
  }

  interface User {
    role?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt?: string | null
  }
}
