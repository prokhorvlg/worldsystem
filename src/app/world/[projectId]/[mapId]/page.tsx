'use client'

// import MapViewer from '@/components/_common/MapViewer/MapViewer'
import { Text } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function MapPage({ params }: { params: { mapId: string } }) {
  const MapViewer = useMemo(
    () =>
      dynamic(() => import('@/components/_common/MapViewer/MapViewer'), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    []
  )

  return (
    <main>
      <Text>Map Page {params.mapId}</Text>
      <MapViewer />
    </main>
  )
}
