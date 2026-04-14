'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import css from './NoteDetails.module.css'

export default function NoteDetailsClient() {
  const params = useParams()
  const id = params.id as string

  const {
    data: note,
    isLoading,
    error
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id)
  })

  if (isLoading) {
    return <p className="p-4 text-center">Loading, please wait...</p>
  }

  if (error || !note) {
    return <p className="p-4 text-center text-red-500">Something went wrong.</p>
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div
        className={`${css.container} rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
      >
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={`${css.tag} min-w-full`}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
