"use client"
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
  const trpc = useTRPC()
  
  // Query workflows with error handling for authentication
  const { data: workflows, isLoading, error } = useQuery({
    ...trpc.getWorkflows.queryOptions(),
    retry: false,
  })
  
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success('Workflow created successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to create workflow: ${error.message}`)
    }
  }))

  // Check if user is not authenticated
  const isUnauthorized = error?.message?.includes('Unauthorized')

  if (isUnauthorized) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center min-w-screen'>
        <h1 className="text-2xl font-bold mb-4">Welcome to ZynqNode</h1>
        <p className="text-gray-600 mb-6">Please sign in to access workflows</p>
        
        <div className="space-x-4">
          <Link href="/login">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="px-4 py-2 rounded-md">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center min-w-screen'>
      <h1 className="text-2xl font-bold mb-4">Welcome to ZynqNode</h1>
      
      <div className="mb-4">
        <Button 
          onClick={() => create.mutate()} 
          disabled={create.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {create.isPending ? 'Creating...' : 'Create Workflow'}
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Existing Workflows:</h2>
        {isLoading ? (
          <p>Loading workflows...</p>
        ) : workflows && workflows.length > 0 ? (
          <ul className="space-y-2">
            {workflows.map((workflow) => (
              <li key={workflow.id} className="p-2 border rounded">
                {workflow.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No workflows found.</p>
        )}
      </div>
    </div>
  );
}
