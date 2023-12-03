import { PageHeader } from '@/components/dashboard/shared'
import { frontend } from '@/libs/navigation'

export default function ListGenrePage() {
  return (
    <>
      <PageHeader
        title="Gêneros de livros"
        description="Gerencie gêneros de livros"
        addActionUrl={frontend.dashboard.genres.create()}
        addActionLabel="Novo gênero"
      />
    </>
  )
}
