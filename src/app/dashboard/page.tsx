
import { isAuthenticated } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import LogoutButton from "../features/auth/components/logout-button";
import type { Workflow } from "@/generated/prisma";

async function DashboardPage() {
   await isAuthenticated();
  const data = await caller.getWorkflows();
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">You have {data.length} workflows in your database.</p>
      {data.map((workflow: Workflow) => (
        <div key={workflow.id} className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-800">{workflow.name}</p>
        </div>
      ))}
      <LogoutButton />
    </div>
  );
}

export default DashboardPage;