import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ filters: string[] }>;
}

export default async function FilteresPage({ params }: Props) {
  const { filters } = await params;
  console.log('filters', filters);

  const [categoryId] = filters;

  const requestParams = {
    categoryId: categoryId === 'all' ? undefined : categoryId, page: 1,
    searchText: ''
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, requestParams.categoryId],
    queryFn: () => fetchNotes(requestParams),
  })

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient categoryId={requestParams.categoryId} />
    </HydrationBoundary>
  )
}