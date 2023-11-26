import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        user: {},
        jwt: {},
      },
      authorize: async (credentials) => {
        if (credentials?.user) {
          return {
            ...JSON.parse(credentials.user),
            jwt: credentials?.jwt,
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        return { ...session, user: token.user }
      }

      return session
    },
  },
}
