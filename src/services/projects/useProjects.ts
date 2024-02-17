import { Method } from '@/types/apiTypes'
import { PrismaProject } from '@/types/prismaTypes'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

const getProjectsAPI = (): Promise<PrismaProject[]> => {
  return fetch(`/api/projects`, {
    method: Method.GET
  }).then((data) => data.json())
}

const createProjectAPI = (
  body: Partial<PrismaProject>
): Promise<PrismaProject> => {
  return fetch(`/api/projects`, {
    method: Method.POST,
    body: JSON.stringify(body)
  }).then((data) => data.json())
}

export const useProjects = () => {
  const queryClient = useQueryClient()

  const {
    data: projects,
    error,
    isLoading
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjectsAPI(),
    retry: false
  })

  const { mutate: createProject } = useMutation({
    retry: false,
    mutationFn: (body: Partial<PrismaProject>) => {
      return createProjectAPI(body)
    },
    onSuccess: (res: any) => {
      // console.log(res)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })

  return {
    projects,
    isLoading,
    error,
    createProject
  }
}
