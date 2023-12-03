'use client'

import { Plus } from '@phosphor-icons/react'

import { Button } from '@/components/agnostic'

import { Header } from '../../shared'

export const PageHeader = () => {
  return (
    <div>
      <Header.Root>
        <Header.Info
          title="Gêneros de livros"
          description="Gerencie os gêneros de livros cadastrados no sistema."
        />
        <Header.Actions>
          <Button>
            <Plus weight="bold" />
            <span>Novo gênero</span>
          </Button>
        </Header.Actions>
      </Header.Root>
    </div>
  )
}
