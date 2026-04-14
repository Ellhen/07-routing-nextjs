import { dehydrate } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import { getQueryClient } from '@/lib/getQueryClient'
import HydrateClient from '@/lib/hydration'
import NoteDetailsClient from './NoteDetails.client'

interface Props {
  params: Promise<{ id: string }>
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id)
  })

  return (
    <HydrateClient state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrateClient>
  )
}
