'use client'

import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '@/lib/api'
import type { Note } from '@/types/note'
import css from './NoteList.module.css'

interface NoteListProps {
  notes: Note[]
}

export function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  if (notes.length === 0) return null

  return (
    <ul className={`${css.list} grid gap-4`}>
      {notes.map(note => (
        <li
          key={note.id}
          className={`${css.item} flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 `}
        >
          <h2 className={css.title}>{note.title}</h2>
          <p className={`${css.content} mt-2 text-sm text-gray-600 line-clamp-3`}>{note.content}</p>
          <p className={`${css.tag} min-w-full`}>{note.tag}</p>
          <div className={`${css.actions} mt-4 flex items-center justify-between`}>
            <Link
              href={`/notes/${note.id}`}
              className={css.link}
            >
              View details
            </Link>
            <button
              type="button"
              className={`${css.button}`}
              onClick={() => deleteMutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
