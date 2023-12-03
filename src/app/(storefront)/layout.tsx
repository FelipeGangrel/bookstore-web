import { Footer, Navbar } from '@/components/storefront/layout'

type Props = {
  readonly children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </>
  )
}
