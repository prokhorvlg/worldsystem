export const getProjectsAPI = async () => {
  const res = await fetch('/api/projects')

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return res.json()
}

export const createProjectAPI = async (newProject: any) => {
  const res = await fetch('/api/projects', {
    method: 'POST',
    body: JSON.stringify({})
  })

  if (!res.ok) {
    const error = new Error('An error occurred while posting the data.')
    throw error
  }

  return res.json()
}
