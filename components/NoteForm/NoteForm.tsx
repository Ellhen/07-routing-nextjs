'use client'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createNote } from '@/lib/api'
import type { NoteTag } from '@/types/note'
import css from './NoteForm.module.css'

interface NoteFormProps {
  onClose: () => void
}

interface NoteFormValues {
  title: string
  content: string
  tag: NoteTag
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo'
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .min(5, 'Minimum 5 characters')
    .max(500, 'Maximum 500 characters')
    .required('Content is required'),
  tag: Yup.string().required('Tag is required')
})

export function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      onClose()
    }
  })

  const handleSubmit = async (values: NoteFormValues) => {
    await mutation.mutateAsync(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={`${css.form} space-y-4`}>
        <label className={`${css.label} flex flex-col gap-2`}>
          Title
          <Field
            name="title"
            className={css.input}
          />
          <ErrorMessage
            name="title"
            component="span"
            className={css.error}
          />
        </label>

        <label className={`${css.label} flex flex-col gap-2`}>
          Content
          <Field
            as="textarea"
            name="content"
            className={css.textarea}
          />
          <ErrorMessage
            name="content"
            component="span"
            className={css.error}
          />
        </label>

        <label className={`${css.label} flex flex-col gap-2`}>
          Tag
          <Field
            as="select"
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
        </label>

        <div className={`${css.actions} flex gap-3`}>
          <button
            type="submit"
            className="cursor-pointer rounded bg-blue-600 px-3 py-1.5 text-base text-white transition-colors duration-200 hover:bg-blue-700"
          >
            Create note
          </button>
          <button
            type="button"
            className="cursor-pointer rounded bg-[#dc3545] px-3 py-1.5 text-base text-white transition-colors duration-200 hover:bg-[#bb2d3b]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  )
}
