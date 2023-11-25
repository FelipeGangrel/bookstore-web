import * as RadixDialog from '@radix-ui/react-dialog'

import { cn } from '@/libs/styles'

export type DialogContentProps = RadixDialog.DialogContentProps

export const Content: React.FC<DialogContentProps> = ({
  children,
  ...props
}) => {
  return (
    <RadixDialog.Content
      {...props}
      className={cn(
        'fixed left-[50%] top-[50%] w-full max-w-[480px]',
        'translate-x-[-50%] translate-y-[-50%]',
        'rounded-md border-2 border-slate-200 bg-slate-50 shadow-xl',
        props.className
      )}
    >
      {children}
    </RadixDialog.Content>
  )
}
