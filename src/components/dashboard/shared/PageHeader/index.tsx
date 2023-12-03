'use client'

import NextLink from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/shared/agnostic'

type Props = {
  title: string
  description?: string
  addActionUrl?: string
  addActionLabel?: string
}

export const PageHeader: FC<Props> = ({
  title,
  description,
  addActionUrl,
  addActionLabel,
}) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    {addActionUrl && addActionLabel && (
      <NextLink href={addActionUrl}>
        <Button>{addActionLabel}</Button>
      </NextLink>
    )}
  </div>
)
