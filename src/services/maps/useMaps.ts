import { getMaps } from '@/services/maps/maps'
import { useQuery } from '@tanstack/react-query'

export const useMaps = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['maps'],
    queryFn: getMaps,
    retry: false
  })

  return {
    maps: data,
    isLoading,
    error
  }
}
