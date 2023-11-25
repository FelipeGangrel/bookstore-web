import * as RadixDialog from '@radix-ui/react-dialog'

export type DialogProps = RadixDialog.DialogProps
export type DialogTriggerProps = RadixDialog.DialogTriggerProps
export type DialogCloseProps = RadixDialog.DialogCloseProps
export type DialogDescriptionProps = RadixDialog.DialogDescriptionProps

export const Root = RadixDialog.Root
export const Trigger = RadixDialog.Trigger
export const Close = RadixDialog.Close
export const Description = RadixDialog.Description

export * from './Portal'
export * from './Content'
export * from './Header'
export * from './Body'
export * from './Footer'

Root.displayName = 'Dialog.Root'
Trigger.displayName = 'Dialog.Trigger'
Close.displayName = 'Dialog.Close'
Description.displayName = 'Dialog.Description'
