import { caller, getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Users } from './client';
import { Suspense } from 'react';

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div className='min-h-screen flex flex-col items-center justify-center min-w-screen'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <Users /> 
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
