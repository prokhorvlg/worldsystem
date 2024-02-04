export default async function WorldPage({
    params 
}: {
    params: { id: string };
}) {
    
  return (
    <main>
      World page {params.id}
    </main>
  )
}
