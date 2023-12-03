import type { FC, HTMLAttributes, ReactNode } from 'react'

type Props = {
  title: ReactNode
  description?: ReactNode
} & HTMLAttributes<HTMLDivElement>

export const Info: FC<Props> = ({ title, description, ...props }) => {
  return (
    <div {...props}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  )
}
