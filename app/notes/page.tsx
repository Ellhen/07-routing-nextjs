import { dehydrate } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import { getQueryClient } from '@/lib/getQueryClient'
import HydrateClient from '@/lib/hydration'
import NotesClient from './Notes.client'

const PER_PAGE = 12

interface NotesPageProps {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams
  const page = Number(params.page ?? '1')
  const search = params.search ?? ''

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search })
  })

  return (
    <HydrateClient state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={page}
        initialSearch={search}
      />
    </HydrateClient>
  )
}
