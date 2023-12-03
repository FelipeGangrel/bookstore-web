import { Id } from './types'
import { Query, withQuery } from './utils'

export const backend = {
  auth: {
    adminSignIn: () => '/auth/admin-login' as const,
    clientSignIn: () => '/auth/client-login' as const,
    signOut: () => '/auth/sign-out' as const,
  },
  categories: {
    list: (q?: Query) => withQuery('/categories', q),
    show: (id: Id) => `/categories/${id}` as const,
    edit: (id: Id) => `/categories/${id}` as const,
    delete: (id: Id) => `/categories/${id}` as const,
    create: () => '/categories' as const,
  },
  genres: {
    list: (q?: Query) => withQuery('/genres', q),
    show: (id: Id) => `/genres/${id}` as const,
    edit: (id: Id) => `/genres/${id}` as const,
    delete: (id: Id) => `/genres/${id}` as const,
    create: () => '/genres' as const,
  },
  passwordReset: {
    generateToken: () => '/password-reset/generate-token' as const,
    updatePassword: () => '/password-reset/update-password' as const,
  },
  users: {
    adminSignUp: () => '/users/register-admin' as const,
    clientSignUp: () => '/users/register-client' as const,
  },
}
