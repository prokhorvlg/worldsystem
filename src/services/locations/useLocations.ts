import {
  createLocationAPI,
  getLocationsAPI
} from '@/services/locations/locations'
import { createMapAPI, getMapsAPI } from '@/services/maps/maps'
import { useProjects } from '@/services/projects/useProjects'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useLocations = () => {
  const queryClient = useQueryClient()
  const { projects } = useProjects()
  const projectId = projects ? projects[0].id : undefined
  // For now, first project is always active. This may change later.

  const {
    data: locations,
    error,
    isLoading
  } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => await getLocationsAPI(projectId),
    retry: false,
    enabled: !!projectId
  })

  const { mutate: createLocation } = useMutation({
    retry: false,
    mutationFn: () => {
      return createLocationAPI(projectId, "Kim's Location")
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['locations'] })
    }
  })

  return {
    locations,
    isLoading,
    error,
    createLocation
  }
}
