import { cn } from '@/libs/styles'

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

export const Footer: React.FC<DialogFooterProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={cn('flex flex-row gap-4 px-6 py-4', props.className)}
    >
      {children}
    </div>
  )
}

Footer.displayName = 'Dialog.Footer'
