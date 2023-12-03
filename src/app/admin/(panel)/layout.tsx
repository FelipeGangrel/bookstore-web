import { redirect } from 'next/navigation'

import { getServerSession } from '@/libs/session'

import { Footer, Navbar } from './_components/shared'

type Props = {
  readonly children: React.ReactNode
}

export default async function Layout({ children }: Props) {
  const session = await getServerSession()

  if (session?.user?.role !== 'admin') {
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
