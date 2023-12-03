import { redirect } from 'next/navigation'

import { getServerSession } from '@/libs/session'

import { Navbar } from './_components/shared'

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
      {children}
    </>
  )
}
