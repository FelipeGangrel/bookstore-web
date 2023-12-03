import type { Id } from './types'

export const storefront = {
  account: {
    profile: () => '/my-account' as const,
    purchaseHistory: () => '/purchase-history' as const,
  },
  auth: {
    signIn: () => '/sign-in' as const,
    signUp: () => '/sign-up' as const,
    passwordReset: () => '/password-reset' as const,
  },
  genres: {
    show: (id: Id) => `/genres/${id}`,
  },
  home: () => '/' as const,
}

const dashboardRoot = '/dashboard' as const

export const dashboard = {
  account: {
    profile: () => `${dashboardRoot}/my-account` as const,
  },
  auth: {
    signIn: () => `${dashboardRoot}/sign-in` as const,
    passwordReset: () => `${dashboardRoot}/password-reset` as const,
  },
  genres: {
    list: () => `${dashboardRoot}/genres`,
    show: (id: Id) => `${dashboardRoot}/genres/${id}`,
    create: () => `${dashboardRoot}/genres/create`,
    edit: (id: Id) => `${dashboardRoot}/genres/${id}/edit`,
  },
  home: () => dashboardRoot,
}
