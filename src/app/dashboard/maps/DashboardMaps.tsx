'use client'

import { SideNav } from '@/components/dashboard/SideNav'
import { useMaps } from '@/services/maps/useMaps'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const DashboardMaps = () => {
  const { data: session } = useSession()
  const { maps, error, isLoading, createMap } = useMaps()

  useEffect(() => {
    console.log('maps', maps)
    if (maps && maps.length === 0) {
      createMap()
    }
  }, [maps])

  if (isLoading) return <>loading</>
  if (error) return <>error</>

  return (
    <section className="flex flex-row h-full">
      <SideNav user={session?.user} />
      {maps ? (
        maps.map((map) => (
          <a key={map.id} href={`/dashboard/maps/${map.id}`}>
            {map.name}
          </a>
        ))
      ) : (
        <></>
      )}
    </section>
  )
}

export default DashboardMaps
