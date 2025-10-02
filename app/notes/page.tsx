import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from '@/lib/api';
import { QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes('', 1),
  })

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />
    </HydrationBoundary>
  )
}