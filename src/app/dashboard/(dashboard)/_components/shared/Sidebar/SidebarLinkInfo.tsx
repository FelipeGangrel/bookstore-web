import type { FC } from 'react'

type Props = {
  title: string
  description?: string
}

export const SidebarLinkInfo: FC<Props> = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold">{title}</div>
      {description && (
        <div className="text-xs text-slate-500">{description}</div>
      )}
    </div>
  )
}
