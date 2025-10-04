import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};


export default async function NotePage({ params }: Props) {
  const queryClient = new QueryClient();

  const { id } = await params;
  console.log('note id:', id)

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient></NoteDetailsClient>
    </HydrationBoundary>
  )
}