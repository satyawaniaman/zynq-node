
import { isAuthenticated } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import LogoutButton from "../features/auth/components/logout-button";

async function DashboardPage() {
   await isAuthenticated();
  const data = await caller.getUsers();
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">You have {data.length} users in your database.</p>
      {data.map((user) => (
        <div key={user.id} className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-800">{user.email}</p>
        </div>
      ))}
      <LogoutButton />
    </div>
  );
}

export default DashboardPage;