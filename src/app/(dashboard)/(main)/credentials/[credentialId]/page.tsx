interface PageProps {
  params: {
    credentialId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  return (
    <div>credentials {params.credentialId} Page</div>
  )
}

export default Page