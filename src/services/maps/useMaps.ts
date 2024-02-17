import { MapNodeRoot } from '@/app/api/projects/[projectId]/maps/[mapId]/mapNodes/route'
import { useProjects } from '@/services/projects/useProjects'
import { Method } from '@/types/apiTypes'
import { PrismaMap, PrismaMapNode } from '@/types/prismaTypes'
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

const getMapsAPI = (projectId: string): Promise<PrismaMap[]> => {
  return fetch(`/api/projects/${projectId}/maps`, {
    method: Method.GET
  }).then((data) => data.json())
}

const createMapAPI = (
  projectId: string,
  body: Partial<PrismaMap>
): Promise<PrismaMap> => {
  return fetch(`/api/projects/${projectId}/maps`, {
    method: Method.POST,
    body: JSON.stringify(body)
  }).then((data) => data.json())
}

const getMapNodesAPI = (
  projectId: string,
  mapId: number
): Promise<MapNodeRoot[]> => {
  return fetch(`/api/projects/${projectId}/maps/${mapId}/mapNodes`, {
    method: Method.GET
  }).then((data) => data.json())
}

const createMapNodeAPI = (
  projectId: string,
  mapId: number,
  body: Partial<PrismaMapNode>
): Promise<MapNodeRoot> => {
  return fetch(`/api/projects/${projectId}/maps/${mapId}/mapNodes`, {
    method: Method.POST,
    body: JSON.stringify(body)
  }).then((data) => data.json())
}

const updateMapNodeAPI = (
  projectId: string,
  mapId: number,
  mapNodeId: string,
  body: Partial<PrismaMapNode>
): Promise<MapNodeRoot[]> => {
  return fetch(
    `/api/projects/${projectId}/maps/${mapId}/mapNodes/${mapNodeId}`,
    {
      method: Method.PUT,
      body: JSON.stringify(body)
    }
  ).then((data) => data.json())
}

const deleteMapNodeAPI = (
  projectId: string,
  mapId: number,
  mapNodeId: string
): Promise<MapNodeRoot[]> => {
  return fetch(
    `/api/projects/${projectId}/maps/${mapId}/mapNodes/${mapNodeId}`,
    {
      method: Method.DELETE
    }
  ).then((data) => data.json())
}

export const useMaps = ({ mapId }: { mapId?: number }) => {
  const queryClient = useQueryClient()

  // For now, first project is always active. This may change later.
  const { projects } = useProjects()
  const projectId = projects ? projects[0].id : undefined

  // Fetch all maps
  const { data: maps, status: mapsStatus } = useQuery({
    queryKey: ['maps'],
    queryFn: () => getMapsAPI(projectId || ''),
    retry: false,
    enabled: !!projectId
  })

  // Create map
  const { mutate: createMap } = useMutation({
    retry: false,
    mutationFn: (body: Partial<PrismaMap>) =>
      createMapAPI(projectId || '', body)
    // TODO: insert new map into query
  })

  // Fetch specific map roots (includes MapNode tree, expensive op)
  const mapNodesQueries = useQueries({
    queries: maps
      ? maps.map((map) => {
          return {
            queryKey: ['mapNodes', map.id],
            queryFn: () => getMapNodesAPI(projectId || '', map.id),
            enabled: !!projectId && map.id === mapId
          }
        })
      : []
  })

  const { mutate: updateMapNode } = useMutation({
    retry: false,
    mutationFn: (args: { id: string; body: Partial<PrismaMapNode> }) => {
      if (!mapId) throw new Error('No map id provided.')
      return updateMapNodeAPI(projectId || '', mapId, args.id, args.body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mapNodes', map?.id]
      })
    }
    // TODO: update current query with new node structure
  })

  const { mutate: createMapNode } = useMutation({
    retry: false,
    mutationFn: (body: Partial<PrismaMapNode>) => {
      if (!mapId) throw new Error('No map id provided.')
      return createMapNodeAPI(projectId || '', mapId, body)
    },
    onSuccess: (newMapNode: PrismaMapNode) => {
      queryClient.invalidateQueries({
        queryKey: ['mapNodes', map?.id]
      })
    }
    // TODO: update current query with new node structure with return value
  })

  const { mutate: deleteMapNode } = useMutation({
    retry: false,
    mutationFn: (id: string) => {
      if (!mapId) throw new Error('No map id provided.')
      return deleteMapNodeAPI(projectId || '', mapId, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mapNodes', map?.id]
      })
    }
    // TODO: update current query with new node structure
  })

  const map = maps?.find((map) => map.id === mapId)
  const mapNodes: MapNodeRoot[] | undefined = queryClient.getQueryData([
    'mapNodes',
    mapId
  ])

  const mapNodesStatus = queryClient.getQueryState(['mapNodes', mapId])?.status
  const isReady = map && mapNodes
  mapsStatus === 'success' || mapNodesStatus === 'success'

  return {
    // DATA
    maps, // All maps linked to user
    map, // Current active map
    mapNodes, // Current active map, location position tree
    // STATUS
    isReady,
    // ACTIONS
    createMap,
    createMapNode,
    updateMapNode,
    deleteMapNode
  }
}
