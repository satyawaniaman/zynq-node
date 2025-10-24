"use client"
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default async function Home() {
  const trpc = useTRPC()
  
  // Query workflows with error handling for authentication
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success('Workflow created successfully!')
    },
    onError: (error) => {
      toast.error(`Failed to create workflow: ${error.message}`)
    }
  }))
  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(`Failed to test AI: ${error.message}`)
    }
  }))

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
      <div className="mb-4">
        <Button 
          onClick={() => testAi.mutate()}
          disabled={testAi.isPending}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
        >
          {testAi.isPending ? 'Testing...' : 'Test AI'}
        </Button>
      </div>
    </div>
  );
}
