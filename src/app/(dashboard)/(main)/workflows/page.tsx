import { WorkflowList, WorkflowsContainer } from "@/app/features/workflows/components/workflows"
import { prefetchWorkflows } from "@/app/features/workflows/servers/prefetch"
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
async function Page() {
  await requireAuth()
  prefetchWorkflows()
  return (
      <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error fetching workflows</p>}>
          <Suspense fallback={<p>Loading workflows...</p>}>
            <WorkflowList/>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
      </WorkflowsContainer>
  )
}

export default Page
