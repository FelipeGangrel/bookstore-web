import { User } from '@phosphor-icons/react'

import { Button } from '@/components/agnostic'
import { Dialog } from '@/components/client-side'

import { LoginForm } from './LoginForm'

export const LoginDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <User size="24" />
        <span className="sr-only">Login</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="border-0">
          <Dialog.Header>
            <h4>Login</h4>
          </Dialog.Header>
          <Dialog.Body>
            <LoginForm />
          </Dialog.Body>
          <Dialog.Footer className="flex-col">
            <Button size="md" variant="dark" className="w-full">
              Entrar
            </Button>
            <Button
              size="md"
              variant="light"
              className="w-full border-transparent"
            >
              Criar conta
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
