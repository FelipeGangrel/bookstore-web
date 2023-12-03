'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { ActivityIndicator } from '@/components/agnostic'

import { Footer, Navbar } from './_components/shared'

type Props = {
  readonly children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-xl font-bold text-slate-900">
          <ActivityIndicator size={48} />
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return redirect('/admin/sign-in')
  }

  return (
    <>
      <Navbar />
      <main className="grow bg-slate-50">{children}</main>
      <Footer />
    </>
  )
}
