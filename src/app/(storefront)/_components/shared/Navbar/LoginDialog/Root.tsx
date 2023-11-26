'use client'

import type { FC } from 'react'

import { Dialog } from '@/components/client-side'

import { LoginForm } from './LoginForm'

type Props = Dialog.DialogProps

export const Root: FC<Props> = ({ children, ...props }) => {
  return (
    <Dialog.Root {...props}>
      {children}
      <Dialog.Portal>
        <Dialog.Content className="border-0">
          <Dialog.Header>
            <h4>Login</h4>
          </Dialog.Header>
          <Dialog.Body>
            <LoginForm />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
