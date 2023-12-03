import { PageHeader } from '@/components/dashboard/shared'
import { frontend } from '@/libs/navigation'

export default function ListGenrePage() {
  return (
    <div>
      <PageHeader
        title="Gêneros de livros"
        description="Gerencie gêneros de livros"
        addActionUrl={frontend.dashboard.genres.create()}
        addActionLabel="Novo gênero"
      />
    </div>
  )
}
