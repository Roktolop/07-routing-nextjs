import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function FilteresPage({ params }: Props) {
  const { slug } = await params;
  console.log('filters', slug);

  const [categoryId] = slug;

  const requestParams = {
    categoryId: categoryId === 'All' ? undefined : categoryId, page: 1,
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