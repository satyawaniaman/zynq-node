"use client"
import { EntityContainer, EntityHeader } from "@/components/entity-views";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkflowList = () => {
    const workflows = useSuspenseWorkflows();
    return (
        <div className="flex-1 flex justify-center items-center">
        <p>
            {JSON.stringify(workflows.data, null, 2)}            
        </p>
        </div>
    );
}
export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const { modal, handleError } = useUpgradeModal();
  const router = useRouter();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        // Navigate to the newly created workflow
        if (data?.id) {
          router.push(`/workflows/${data.id}`);
        }
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
      {modal}
    </>
  );
};
export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
