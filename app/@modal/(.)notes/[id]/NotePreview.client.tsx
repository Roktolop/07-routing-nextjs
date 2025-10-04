'use client';

import { Note } from '@/types/note';
import css from './NotePreview.module.css'

interface Props {
  note: Note
}

export function NotePreviewClient({ note }: Props) {
  return (
    <>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </>
  )
}