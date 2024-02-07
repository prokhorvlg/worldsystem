import { CreateLocationBody } from '@/app/api/projects/[projectId]/locations/route'
import {
  CreateMapBody,
  GetMapsBody
} from '@/app/api/projects/[projectId]/maps/route'
import { Method } from '@/types/apiTypes'
import { PrismaLocation, PrismaMap } from '@/types/prismaTypes'

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

export const createLocationAPI = async (projectId: string, name: string) => {
  const body: CreateLocationBody = {
    projectId,
    name
  }

  const res = await fetch(`/api/projects/${projectId}/locations`, {
    method: Method.POST,
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const error = new Error('An error occurred while posting the data.')
    throw error
  }

  return res.json()
}
