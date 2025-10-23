import { caller } from "@/trpc/server";


export default async function Home() {
  const users= await caller.getUsers();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center min-w-screen'>
      <h1 className="text-2xl font-bold mb-4">Welcome to ZynqNode</h1>
      {JSON.stringify(users)}
    </div>
  );
}
