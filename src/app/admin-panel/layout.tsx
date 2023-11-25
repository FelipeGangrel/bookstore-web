import { Navbar } from './_components/shared'

type Props = {
  readonly children: React.ReactNode
}

export default function AdminPanelLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
