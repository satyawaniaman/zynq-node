import { AppSidebar } from "@/components/app-sidebar"
import { requireAuth } from "@/lib/auth-utils"
async function Page() {
  await requireAuth()
  return (
    <div>
      <AppSidebar/>
      <h1 className="flex items-center justify-center h-12">workflow page</h1>
    </div>
  )
}

export default Page
