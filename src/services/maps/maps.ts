import {
  CreateMapBody,
  GetMapsBody
} from '@/app/api/projects/[projectId]/maps/route'
import { Method } from '@/types/apiTypes'
import { PrismaMap } from '@/types/prismaTypes'

export const getMapsAPI = async (
  projectId: string
): Promise<PrismaMap[] | undefined> => {
  try {
    const res = await fetch(`/api/projects/${projectId}/maps`, {
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

export const createMapAPI = async (projectId: string, name: string) => {
  const body: CreateMapBody = {
    projectId,
    name
  }

  const res = await fetch(`/api/projects/${projectId}/maps`, {
    method: Method.POST,
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const error = new Error('An error occurred while posting the data.')
    throw error
  }

  return res.json()
}
