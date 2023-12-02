'use client'

import { Button, Fieldset } from '@/components/agnostic'
import { PinInput } from '@/components/client-side'

export default function ResetPwdStep2() {
  return (
    <form onSubmit={() => {}} className="flex w-full flex-col gap-8">
      <h4 className="text-center text-lg font-semibold">Crie uma nova senha</h4>

      <div className="flex flex-col gap-4">
        <Fieldset>
          <PinInput
            length={6}
            onChange={console.log}
            className="justify-around rounded-md bg-black px-2 py-4"
            inputClassName="bg-transparent text-blue-300 font-semibold text-2xl border-0 border-b-4 rounded-none border-b-pink-300"
          />
        </Fieldset>
        <Fieldset>
          <PinInput length={6} onChange={console.log} />
        </Fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <Button type="submit" className="w-full">
          Enviar código
        </Button>
      </div>
    </form>
  )
}
