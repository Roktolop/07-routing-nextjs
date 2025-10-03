export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  id: string,
  title: string,
  content: string,
  tag: NoteTag,
  createdAt: string,
  updatedAt: string
}

export interface Category {
  id: string,
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string
}
