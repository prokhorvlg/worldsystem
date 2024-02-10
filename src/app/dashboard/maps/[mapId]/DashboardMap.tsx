'use client'

import { SideNav } from '@/components/dashboard/SideNav'
import { SortableTree } from '@/components/dashboard/map/SortableTree'
import { useMaps } from '@/services/maps/useMaps'
import { useSession } from 'next-auth/react'

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
  const { map, mapNodes, updateMapNode } = useMaps({ mapId })

  if (!map) return <>map does not exist!</>

  return (
    <section className="flex flex-row h-full">
      <SideNav user={session?.user} />
      <div>{map.name}</div>
      <Wrapper>
        <SortableTree
          collapsible
          indicator
          removable
          defaultItems={mapNodes ?? []}
          onDragEnd={(id: string, newParentId: string | null) =>
            // console.log(
            //   'DRAG ENDED. THIS ID:',
            //   id,
            //   'NEW PARENT IS',
            //   newParentId
            // )
            updateMapNode({
              id: id,
              body: {
                parentId: newParentId
              }
            })
          }
        />
      </Wrapper>
      {/* <ul>
        {locations?.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      <button onClick={() => createLocation()}>Add Location</button> */}
    </section>
  )
}

export default DashboardMap
