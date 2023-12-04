'use client'

import { useState } from 'react'

import { CreateGenreDialog } from '@/components/dashboard/pages/genres'
import { PageHeader } from '@/components/dashboard/shared'

export default function ListGenrePage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <PageHeader
        title="Gêneros de livros"
        description="Gerencie gêneros de livros"
        addAction={() => setDialogOpen(true)}
        addActionLabel="Novo gênero"
      />
      <CreateGenreDialog
        dialogOpen={dialogOpen}
        onDialogOpenChange={setDialogOpen}
      />
    </>
  )
}
