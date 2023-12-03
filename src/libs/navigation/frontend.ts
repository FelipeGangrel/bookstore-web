import type { Id } from './types'

export const storefront = {
  account: {
    profile: () => {
      return '/my-account' as const
    },
    purchaseHistory: () => {
      return '/purchase-history' as const
    },
  },
  auth: {
    signIn: () => {
      return '/sign-in' as const
    },
    signUp: () => {
      return '/sign-up' as const
    },
    passwordReset: () => {
      return '/password-reset' as const
    },
  },
  genres: {
    show: (id: Id) => {
      return `/genres/${id}`
    },
  },
  home: () => {
    return '/' as const
  },
}

const dashboardRoot = '/dashboard' as const

export const dashboard = {
  account: {
    profile: () => {
      return `${dashboardRoot}/my-account` as const
    },
  },
  auth: {
    signIn: () => {
      return `${dashboardRoot}/sign-in` as const
    },
    passwordReset: () => {
      return `${dashboardRoot}/password-reset` as const
    },
  },
  genres: {
    list: () => {
      return `${dashboardRoot}/genres`
    },
    create: () => {
      return `${dashboardRoot}/genres/create`
    },
    edit: (id: Id) => {
      return `${dashboardRoot}/genres/edit/${id}`
    },
    show: (id: Id) => {
      return `${dashboardRoot}/genres/show/${id}`
    },
  },
  home: () => {
    return dashboardRoot
  },
}
