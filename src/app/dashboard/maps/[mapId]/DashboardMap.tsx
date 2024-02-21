'use client'

import { MapNodeRoot } from '@/app/api/projects/[projectId]/maps/[mapId]/mapNodes/route'
import Dashboard from '@/components/dashboard/Dashboard'
import { SortableTree } from '@/components/dashboard/map/SortableTree'
import { useMaps } from '@/services/maps/useMaps'
import { ActionIcon, Button, Text } from '@mantine/core'
import { IconLocationPlus } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import classes from './DashboardMap.module.css'
import MapViewer from '@/components/_common/MapViewer/MapViewer'
import { Marker, Popup } from 'react-leaflet'

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
  const {
    map,
    mapNodes,
    createMapNode,
    updateMapNode,
    deleteMapNode,
    isReady
  } = useMaps({ mapId })

  // useEffect(() => {
  //   console.log('map', map)
  //   console.log('mapNodes', mapNodes)
  // }, [mapNodes])

  const renderItemComponent = (item: MapNodeRoot) => {
    return (
      <div className={classes.locationItem}>
        <Text m={0}>{item.name}</Text>
        <ActionIcon
          variant="default"
          onClick={() =>
            createMapNode({
              parentId: item.id,
              name: item.name + ' child'
            })
          }
        >
          <IconLocationPlus
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      </div>
    )
  }

  if (!isReady) return <>loading...</>
  if (!map) return <>map does not exist!</>

  return (
    <Dashboard>
      <Dashboard.Nav user={session?.user} />
      <Dashboard.Aside>
        <div>{map.name}</div>
        <Wrapper>
          <SortableTree
            collapsible
            indicator
            removable
            items={mapNodes ?? []}
            itemComponent={renderItemComponent}
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
        <Button
          onClick={() => {
            createMapNode({
              name: 'New map node'
            })
          }}
        >
          Add new location node
        </Button>
        {/* <ul>
        {locations?.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      <button onClick={() => createLocation()}>Add Location</button> */}
      </Dashboard.Aside>
      <Dashboard.Body>
        <MapViewer>
          {mapNodes?.map((node, i) => {
            return (
              <Marker position={[45.505 + i, -0.09]}>
                <Popup>{node.name}</Popup>
              </Marker>
              // <div>Hi!!</div>
            )
          })}
        </MapViewer>
      </Dashboard.Body>
    </Dashboard>
  )
}

export default DashboardMap
