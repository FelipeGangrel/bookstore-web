import * as RadixDialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

export type DialogPortalProps = {
  overlayProps?: RadixDialog.DialogOverlayProps
} & RadixDialog.PortalProps

export const Portal: React.FC<DialogPortalProps> = ({
  children,
  overlayProps,
  ...props
}) => {
  return (
    <RadixDialog.Portal {...props}>
      <RadixDialog.Overlay
        {...overlayProps}
        className={twMerge(
          'fixed inset-0 z-20 bg-black bg-opacity-50',
          overlayProps?.className
        )}
      />
      {children}
    </RadixDialog.Portal>
  )
}

Portal.displayName = 'Dialog.Portal'
