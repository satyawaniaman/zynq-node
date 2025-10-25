interface PageProps {
  params: {
    workflowId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  return (
    <div>workflows {params.workflowId} Page</div>
  )
}

export default Page