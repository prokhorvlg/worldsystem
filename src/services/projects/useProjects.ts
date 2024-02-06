import { getProjectsAPI, createProjectAPI } from '@/services/projects/projects'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

export const useProjects = () => {
  const queryClient = useQueryClient()

  const {
    data: projects,
    error,
    isLoading
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectsAPI,
    retry: false
  })

  const { mutate: createProject } = useMutation({
    retry: false,
    mutationFn: (newProject: any) => {
      return createProjectAPI(newProject)
    },
    onSuccess: (res: any) => {
      console.log(res)
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
