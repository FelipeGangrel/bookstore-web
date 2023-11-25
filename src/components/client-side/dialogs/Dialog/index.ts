import * as RadixDialog from '@radix-ui/react-dialog'

export type DialogCloseProps = RadixDialog.DialogCloseProps
export type DialogProps = RadixDialog.DialogProps
export type DialogTriggerProps = RadixDialog.DialogTriggerProps
export type DialogDescriptionProps = RadixDialog.DialogDescriptionProps

export const Root = RadixDialog.Root
export const Trigger = RadixDialog.Trigger
export const Close = RadixDialog.Close
export const Description = RadixDialog.Description

export * from './Body'
export * from './Content'
export * from './Footer'
export * from './Header'
export * from './Portal'

Root.displayName = 'Dialog.Root'
Trigger.displayName = 'Dialog.Trigger'
Close.displayName = 'Dialog.Close'
Description.displayName = 'Dialog.Description'
