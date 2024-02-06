'use client'
import { SideNav } from '@/components/dashboard/SideNav'
import { useProjects } from '@/services/projects/useProjects'
import { useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const DashboardHome = () => {
  const { data: session } = useSession()

  const { projects, error, isLoading, createProject } = useProjects()

  // TODO Oauth: if userdoes not exist in database (due to o auth) create them

  useEffect(() => {
    // Create a demo project for the user if it does not exist already

    console.log('projects', projects)

    // if (projects.length === 0) {
    //   createProject({ name: 'my new project' })
    // }
  }, [])

  // Create a record in permissions indicating this user is owner

  if (isLoading) return <>loading</>
  if (error) return <>error</>

  return (
    <section className="flex flex-row h-full">
      <SideNav user={session?.user} />
      {projects.map((project: any) => (
        <>{project?.name}</>
      ))}
      {/* <SideSection /> */}
    </section>
  )
}

export default DashboardHome
