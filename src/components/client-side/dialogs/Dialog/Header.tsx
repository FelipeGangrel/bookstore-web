import { X } from '@phosphor-icons/react'
import * as RadixDialog from '@radix-ui/react-dialog'

import { cn } from '@/libs/styles'

export type DialogHeaderProps = {
  titleProps?: Omit<RadixDialog.DialogTitleProps, 'children'>
} & React.HTMLAttributes<HTMLDivElement>

export const Header: React.FC<DialogHeaderProps> = ({
  children,
  titleProps,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center justify-between px-6 py-4',
        props.className
      )}
    >
      <RadixDialog.Title
        {...titleProps}
        className={cn(
          'text-lg font-medium text-slate-900',
          titleProps?.className
        )}
      >
        {children}
      </RadixDialog.Title>
      <RadixDialog.Close className="inline-flex h-6 w-6 items-center justify-center outline-none">
        <X />
      </RadixDialog.Close>
    </div>
  )
}

Header.displayName = 'Dialog.Header'
