import type { FC } from 'react'

import { Link } from '@/components/shared/client-side'

type Props = Parameters<typeof Link>[0]

export const SidebarLink: FC<Props> = ({ children, ...props }) => {
  return (
    <Link
      className="flex w-full items-center gap-4 px-6 py-4 hover:bg-slate-100 hover:no-underline"
      {...props}
    >
      {children}
    </Link>
  )
}
