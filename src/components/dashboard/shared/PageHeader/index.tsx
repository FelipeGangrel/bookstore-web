'use client'

import NextLink from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/shared/agnostic'

type Props = {
  title: string
  description?: string
  addAction?: string | (() => void)
  addActionLabel?: string
}

export const PageHeader: FC<Props> = ({
  title,
  description,
  addAction,
  addActionLabel,
}) => (
  <div className="flex items-center justify-between border border-transparent border-b-slate-100 pb-4">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    {addActionLabel && (
      <>
        {typeof addAction === 'string' && (
          <NextLink href={addAction}>
            <Button>{addActionLabel}</Button>
          </NextLink>
        )}
        {typeof addAction === 'function' && (
          <Button onClick={addAction}>{addActionLabel}</Button>
        )}
      </>
    )}
  </div>
)
