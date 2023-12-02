import { Book } from '@phosphor-icons/react/dist/ssr'

type Props = {
  readonly children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="flex w-full max-w-lg flex-col items-center gap-4 px-8">
        <div className="flex flex-row items-center gap-4 text-white">
          <Book size="24" />
          <span className="text-2xl font-semibold">BookStore</span>
        </div>
        <div className="w-full rounded-md bg-white px-6 py-4">{children}</div>
      </div>
    </main>
  )
}
