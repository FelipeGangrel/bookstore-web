'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Navbar, Sidebar } from '@/components/dashboard/layout'
import { ActivityIndicator } from '@/components/shared/agnostic'
import { frontend } from '@/libs/navigation'

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
    return redirect(frontend.dashboard.auth.signIn())
  }

  return (
    <>
      <div className="flex min-h-screen flex-col gap-8 bg-slate-50">
        <Navbar />
        <div className="container mx-auto flex gap-8 pb-8">
          <Sidebar />
          <main className="flex h-[800px] w-full flex-col gap-6 rounded-md bg-white p-6 shadow">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
