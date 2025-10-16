"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function Users() {
  const trpc = useTRPC();
  const query = useSuspenseQuery(trpc.getUsers.queryOptions());
  return (
    <div>
      {query.data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}