interface PageProps {
  params: {
    executionId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  return (
    <div>executions {params.executionId} Page</div>
  )
}

export default Page