'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import { Modal } from '@/components/Modal/Modal'
import css from './NotePreview.module.css'

interface Props {
  id: string
}

export default function NotePreview({ id }: Props) {
  const router = useRouter()

  const {
    data: note,
    isLoading,
    error
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false
  })

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p className="p-4 text-center">Loading, please wait...</p>}

      {error && <p className="p-4 text-center text-red-500">Something went wrong.</p>}

      {note && (
        <div className="flex flex-1 items-center justify-center">
          <div
            className={`${css.container} rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
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
      )}
    </Modal>
  )
}
