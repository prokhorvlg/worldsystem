import MapViewer from '@/components/_common/MapViewer/MapViewer'
import { Text } from '@mantine/core'

export default async function WorldPage({
  params
}: {
  params: { projectId: string }
}) {
  return (
    <main>
      <Text>World page {params.projectId}</Text>
    </main>
  )
}
