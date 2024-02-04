import { getMaps } from '@/services/maps/maps'
import useSWR from 'swr'

export const useMaps = (id: any) => {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, getMaps)

  return {
    user: data,
    isLoading,
    isError: error
  }
}
