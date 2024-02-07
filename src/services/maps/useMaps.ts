import { createMapAPI, getMapsAPI } from '@/services/maps/maps'
import { useProjects } from '@/services/projects/useProjects'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useMaps = () => {
  const queryClient = useQueryClient()
  const { projects } = useProjects()
  const projectId = projects ? projects[0].id : undefined
  // For now, first project is always active. This may change later.

  // console.log('projectId console log in hook??', projectId)

  const {
    data: maps,
    error,
    isLoading
  } = useQuery({
    queryKey: ['maps'],
    queryFn: async () => await getMapsAPI(projectId),
    retry: false,
    enabled: !!projectId
  })

  const { mutate: createMap } = useMutation({
    retry: false,
    mutationFn: () => {
      return createMapAPI(projectId, "Kim's New Map")
    },
    onSuccess: (res: any) => {
      console.log(res)
      queryClient.invalidateQueries({ queryKey: ['maps'] })
    }
  })

  // const {
  //   data: locationPositions
  // } = useQuery({
  //   queryKey: ['locationPositions'],
  //   queryFn: async () => await getLocationPositionsAPI(mapId),
  //   retry: false,
  //   enabled: !!mapId
  // })

  return {
    maps,
    isLoading,
    error,
    createMap
  }
}
