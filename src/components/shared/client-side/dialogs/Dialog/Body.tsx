import { cn } from '@/libs/styles'

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>

export const Body: React.FC<DialogBodyProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        'max-h-[60vh] overflow-y-auto px-6 py-6 text-sm',
        props.className
      )}
    >
      {children}
    </div>
  )
}

Body.displayName = 'Dialog.Body'
