import { CreateProjectBody } from '@/app/api/projects/route'
import { Method } from '@/types/apiTypes'

export const getProjectsAPI = async () => {
  const res = await fetch('/api/projects')

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return res.json()
}

export const createProjectAPI = async (name: string) => {
  const body: CreateProjectBody = {
    name: name
  }

  const res = await fetch('/api/projects', {
    method: Method.POST,
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const error = new Error('An error occurred while posting the data.')
    throw error
  }

  return res.json()
}
