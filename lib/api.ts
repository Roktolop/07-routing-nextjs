import axios from 'axios'
import { Category, Note, NoteTag } from '@/types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesRequest {
  searchText?: string,
  page: number,
  categoryId?: string,
}

export interface FetchNotesResponse {
  notes: Note[],
  totalPages: number,
}

export interface CreateNoteProps {
  title: string,
  content: string,
  tag: NoteTag,
}


export const api = axios.create({
  baseURL: 'https://next-docs-9f0504b0a741.herokuapp.com',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function fetchNotes({ searchText, page, categoryId }: FetchNotesRequest): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage: 12,
      categoryId,
    },
  });

  console.log(response.data);

  return response.data;
};

export async function createNote(data: CreateNoteProps): Promise<Note> {
  const response = await api.post<Note>(`/notes`, data);

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`)

  console.log(response.data)

  return response.data
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
}

export async function fetchCategories() {
  console.log("Fetching categories from:", `${api.defaults.baseURL}/categories`);

  const response = await api.get<Category[]>(`/categories`);

  return response.data;
}