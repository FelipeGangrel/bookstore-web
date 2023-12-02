import type {
  ChangeEvent,
  ClipboardEvent,
  FC,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
} from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Input } from '@/components/agnostic'
import { cn } from '@/libs/styles'

type OnPinChange = ({
  complete,
  value,
}: {
  complete: boolean
  value: string
}) => void

type props = HTMLAttributes<Omit<HTMLDivElement, 'children'>> & {
  length?: number
  onPinChange?: OnPinChange
  inputClassName?: string
}

export const PinInput: FC<props> = ({
  length = 6,
  className,
  inputClassName,
  onPinChange,
  ...props
}) => {
  const emptyPin = Array.from(Array(length).keys()).map((n) => ({
    id: `pin-${n}`,
    value: '',
  }))

  const [pin, setPin] = useState(emptyPin)

  const updatePin = useCallback((id: string, value: string) => {
    setPin((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, value }
        }
        return item
      })
    })
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement
      const key = event.key

      const { id, previousSibling, nextSibling } = target

      const focusPrevious = () => {
        if (previousSibling instanceof HTMLInputElement) {
          previousSibling.focus()
        }
      }

      const focusNext = () => {
        if (nextSibling instanceof HTMLInputElement) {
          nextSibling.focus()
        }
      }

      switch (key) {
        case 'Backspace':
        case 'Delete':
          updatePin(id, '')
          focusPrevious()
          break
        case 'ArrowLeft':
          focusPrevious()
          break
        case 'ArrowRight':
          focusNext()
          break
        default:
          break
      }
    },
    [updatePin]
  )

  const handleFocus = useCallback((event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      event.target.select()
    }
  }, [])

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value, nextSibling } = event.target

      const lastChar = value[value.length - 1]
      const isNumber = !isNaN(Number(lastChar))

      if (!isNumber) {
        return
      }

      updatePin(id, lastChar)
      if (nextSibling instanceof HTMLInputElement) {
        nextSibling.focus()
      }
    },
    [updatePin]
  )

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault()
      const { clipboardData } = event
      const pastedData = clipboardData.getData('text')
      const data = pastedData.slice(0, length)
      const dataArr = data.split('')

      dataArr.forEach((char, i) => {
        const id = `pin-${i}`
        updatePin(id, char)
      })
    },
    [length, updatePin]
  )

  useEffect(() => {
    const value = pin.map(({ value }) => value).join('')
    const complete = value.length === length
    onPinChange?.({ complete, value })
  }, [length, onPinChange, pin])

  return (
    <div
      {...props}
      className={cn('flex items-center justify-between', className)}
    >
      {pin.map(({ id, value }) => {
        return (
          <Input
            key={id}
            id={id}
            value={value}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onChange={handleChange}
            onPaste={handlePaste}
            className={cn('h-12 w-12 text-center focus:ring-0', inputClassName)}
          />
        )
      })}
    </div>
  )
}
