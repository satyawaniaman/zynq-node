import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

// Simple Users component since we removed client.tsx
function Users() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
      <p className="text-gray-600">
        This is the main page with TRPC setup preserved for future development.
      </p>
      <p className="text-sm text-blue-600 mt-4">
        <a href="/dashboard" className="underline">
          Go to Dashboard
        </a>{" "}
        (protected route)
      </p>
    </div>
  );
}

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div className="min-h-screen flex flex-col items-center justify-center min-w-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <Users />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
