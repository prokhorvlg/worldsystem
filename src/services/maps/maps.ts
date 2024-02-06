import { GetMapsBody } from '@/app/api/maps/route'
import { Method } from '@/types/apiTypes'

export const getMaps = async (projectId: string) => {
  const body: GetMapsBody = {
    projectId: projectId
  }

  const res = await fetch('/api/maps', {
    method: Method.GET,
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  return res.json()
}
