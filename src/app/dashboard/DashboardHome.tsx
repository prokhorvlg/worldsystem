'use client'
import Dashboard from '@/components/dashboard/Dashboard'
import { useProjects } from '@/services/projects/useProjects'
import { Title, Text, Button } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'

const DashboardHome = () => {
  const { data: session } = useSession()

  const { projects, error, isLoading, createProject } = useProjects()

  // TODO Oauth: if userdoes not exist in database (due to o auth) create them

  useEffect(() => {
    // Create a demo project for the user if it does not exist already
    console.log('loaded!', projects)
    if (projects && projects.length === 0) {
      createProject({ name: 'my new project' })
    }
  }, [projects])

  // Create a record in permissions indicating this user is owner

  if (isLoading) return <>loading</>
  if (error) return <>error</>
  if (!projects) return <>no projects!!</>

  return (
    <Dashboard>
      <Dashboard.Nav user={session?.user} />
      <Dashboard.Body>
        <Title>Home</Title>
        <Text>Welcome to WorldSystem, {session?.user?.name}!</Text>
        <Text>
          Navigate to{' '}
          <Button component={Link} href="/dashboard/maps">
            maps
          </Button>{' '}
          to get started with creating a map.
        </Text>

        <ul>
          {projects.map((project) => (
            <li>Your project is called {project.name}.</li>
          ))}
        </ul>
      </Dashboard.Body>
    </Dashboard>
  )
}

export default DashboardHome
