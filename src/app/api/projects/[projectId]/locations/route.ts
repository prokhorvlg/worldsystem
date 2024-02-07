import { prisma } from '@/lib/prisma'
import { StatusCode } from '@/types/apiTypes'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export interface GetLocationsBody {
  projectId: string
}

export async function GET(request: Request, context: any) {
  const projectId = context.params.projectId

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        locations: {
          include: {
            positionsOnMap: {}
          }
        }
      }
    })
    if (!project) return

    console.log('project.locations:', project.locations)

    return new Response(JSON.stringify(project.locations), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}

export interface CreateLocationBody {
  projectId: string
  name: string
}

export async function POST(request: Request) {
  const body: CreateLocationBody = await request.json()

  try {
    const location = await prisma.location.create({
      data: {
        name: body.name,
        projectId: body.projectId
      }
    })

    return new Response(JSON.stringify(location), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}
