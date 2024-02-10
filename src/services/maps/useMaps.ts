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

export const useMaps = ({ mapId }: { mapId?: number }) => {
  const queryClient = useQueryClient()

  // For now, first project is always active. This may change later.
  const { projects } = useProjects()
  const projectId = projects ? projects[0].id : undefined

  // Fetch all maps
  const { data: maps } = useQuery({
    queryKey: ['maps'],
    queryFn: () => getMapsAPI(projectId),
    retry: false,
    enabled: !!projectId
  })

  // Create map
  const { mutate: createMap } = useMutation({
    retry: false,
    mutationFn: (body: Partial<PrismaMap>) => createMapAPI(projectId, body)
    // TODO: insert new map into query
  })

  // Fetch specific map roots (includes MapNode tree, expensive op)
  const mapNodesQueries = useQueries({
    queries: maps
      ? maps.map((map) => {
          return {
            queryKey: ['maps', map.id],
            queryFn: () => getMapNodesAPI(projectId, map.id),
            enabled: !!projectId && map.id === mapId
          }
        })
      : []
  })

  const { mutate: updateMapNode } = useMutation({
    retry: false,
    mutationFn: (args: { id: string; body: Partial<PrismaMapNode> }) => {
      if (!mapId) throw new Error('No map id provided.')
      return updateMapNodeAPI(projectId, mapId, args.id, args.body)
    }
    // TODO: update current query with new node structure
  })

  const map = maps?.find((map) => map.id === mapId)
  const mapNodes: MapNodeRoot[] =
    queryClient.getQueryData(['maps', mapId]) ?? []

  return {
    // DATA
    maps, // All maps linked to user
    map, // Current active map
    mapNodes, // Current active map, location position tree
    // ACTIONS
    createMap,
    updateMapNode
  }
}
