'use client'

import { useMaps } from '@/services/maps/useMaps'
import { TextInput } from '@mantine/core'

export default async function MapPage({ params }: { params: { id: string } }) {
  const { maps, error, isLoading } = useMaps()

  if (isLoading) return <>loading</>

  if (error) return <>error</>
  return <>{maps[0].name}</>

  return (
    <>
      Map Editor!! {params.id}
      <TextInput type="text" placeholder="here" label="JSON here" />
    </>
  )
}
