import {
  CreateLocationRequest,
  CreateLocationResponse
} from '@/app/api/projects/[projectId]/locations/route'
import { Method } from '@/types/apiTypes'
import { PrismaLocation } from '@/types/prismaTypes'

export const getLocationsAPI = async (
  projectId: string
): Promise<PrismaLocation[] | undefined> => {
  try {
    const res = await fetch(`/api/projects/${projectId}/locations`, {
      method: Method.GET
    })

    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.')
    }

    return res.json()
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

export const createLocationAPI = async (
  body: CreateLocationRequest
): Promise<CreateLocationResponse | undefined> => {
  const res = await fetch(`/api/projects/${body.projectId}/locations`, {
    method: Method.POST,
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const error = new Error('An error occurred while posting the data.')
    throw error
  }

  return res.json()
}
