import { getServerSession } from '@/libs/session'

import { BannersCarousel, ClientCard } from './_components/home'

export default async function Home() {
  const session = await getServerSession()

  console.log('server side session', session)

  return (
    <main className="h-[2000px] bg-slate-300">
      <section className="bg-gray-900 pt-20">
        <BannersCarousel />
        <ClientCard />
      </section>
    </main>
  )
}
