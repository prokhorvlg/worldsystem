'use client'

import Dashboard from '@/components/dashboard/Dashboard'
import { useMaps } from '@/services/maps/useMaps'
import { Button, Table, Title, Text } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'

const DashboardMaps = () => {
  const { data: session } = useSession()
  const { maps, createMap } = useMaps({})

  useEffect(() => {
    if (maps && maps.length === 0) {
      createMap({
        name: 'New map'
      })
    }
  }, [maps])

  if (!maps) return <>no maps</>

  // if (isLoading) return <>loading</>
  // if (error) return <>error</>

  const rows = maps.map((map) => (
    <Table.Tr key={map.id}>
      <Table.Td>{map.name}</Table.Td>
      <Table.Td>
        <Button component={Link} href={`/dashboard/maps/${map.id}`}>
          Edit map locations
        </Button>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Dashboard>
      <Dashboard.Nav user={session?.user} />
      <Dashboard.Body>
        <Title>Maps</Title>
        <Text>These are the maps linked to your project.</Text>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Edit</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        {/* {maps ? (
          maps.map((map) => (
            <Button
              component={Link}
              key={map.id}
              href={`/dashboard/maps/${map.id}`}
            >
              {map.name}
            </Button>
          ))
        ) : (
          <></>
        )} */}
      </Dashboard.Body>
    </Dashboard>
  )
}

export default DashboardMaps
