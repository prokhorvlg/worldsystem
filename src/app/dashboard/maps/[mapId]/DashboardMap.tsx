'use client'

import { SideNav } from '@/components/dashboard/SideNav'
import { SortableTree } from '@/components/dashboard/SortableTree'
import { useLocations } from '@/services/locations/useLocations'
import { useMaps } from '@/services/maps/useMaps'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      maxWidth: 600,
      padding: 10,
      margin: '0 auto',
      marginTop: '10%'
    }}
  >
    {children}
  </div>
)

const DashboardMap = ({ mapId }: { mapId: number }) => {
  const { data: session } = useSession()
  const { maps, error, isLoading } = useMaps()
  const { locations, createLocation } = useLocations()

  const selectedMap =
    !isLoading && maps ? maps.find((map) => map.id === mapId) : undefined

  if (isLoading) return <>loading</>
  if (error) return <>error</>
  if (!selectedMap) return <>Failed to find map.</>

  return (
    <section className="flex flex-row h-full">
      <SideNav user={session?.user} />
      <div>{selectedMap.name}</div>
      <Wrapper>
        <SortableTree collapsible indicator removable />
      </Wrapper>
      <ul>
        {locations?.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      <button onClick={() => createLocation()}>Add Location</button>
    </section>
  )
}

export default DashboardMap
