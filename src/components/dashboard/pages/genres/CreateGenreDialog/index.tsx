'use client'

import { FC, SyntheticEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import {
  Button,
  FieldMessage,
  Fieldset,
  Input,
  Label,
} from '@/components/shared/agnostic'
import { Dialog } from '@/components/shared/client-side'
import { FetchClient } from '@/libs/fetch-client'
import { backend } from '@/libs/navigation'

type ValidationErrors = {
  name?: string
}

type Props = {
  dialogOpen?: boolean
  onDialogOpenChange?: (open: boolean) => void
}

export const CreateGenreDialog: FC<Props> = ({
  dialogOpen,
  onDialogOpenChange,
}) => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault()

      const fetchClient = new FetchClient()
      const url = backend.genres.create()

      const formData = new FormData(event.currentTarget)
      const data = Object.fromEntries(formData)

      setLoading(true)
      const apiRes = await fetchClient.post(url, data)
      setLoading(false)

      if (!apiRes.ok) {
        const { message, validationErrors } = await apiRes.json()
        validationErrors && setValidationErrors(validationErrors)
        message && toast.warning(message)
      } else {
        onDialogOpenChange?.(false)
        toast.success('Gênero criado com sucesso')
      }
    },
    [onDialogOpenChange]
  )

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={onDialogOpenChange}>
      <Dialog.Portal>
        <Dialog.Content>
          <Dialog.Header>
            <h4>Novo gênero de livro</h4>
          </Dialog.Header>
          <form onSubmit={handleSubmit}>
            <Dialog.Body>
              <Fieldset>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" type="text" />
                {validationErrors.name && (
                  <FieldMessage variant="error">
                    {validationErrors.name}
                  </FieldMessage>
                )}
              </Fieldset>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                type="submit"
                className="ml-auto"
                disabled={loading}
                loading={loading}
              >
                Salvar
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
