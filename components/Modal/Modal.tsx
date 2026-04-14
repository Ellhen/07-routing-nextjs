'use client'

import { useEffect } from 'react'
import css from './Modal.module.css'

interface Props {
  children: React.ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className={css.backdrop}
      onClick={onClose}
    >
      <div
        className={css.modal}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
