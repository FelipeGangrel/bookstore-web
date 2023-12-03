import { Footer, Navbar } from './_components/shared'

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
