import { prisma } from '@/lib/prisma'
import { StatusCode } from '@/types/apiTypes'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export interface GetMapsBody {
  projectId: string
}

export async function GET(request: Request, context: any) {
  const projectId = context.params.projectId

  const token = await getToken({ req: request as any, secret })
  if (!token) {
    return new Response('No token found in request.', {
      status: StatusCode.Unauthorized
    })
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        maps: true
      }
    })
    if (!project) return

    return new Response(JSON.stringify(project.maps), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}

export interface CreateMapBody {
  projectId: string
  name: string
}

export async function POST(request: Request) {
  const body: CreateMapBody = await request.json()

  try {
    const map = await prisma.map.create({
      data: {
        name: body.name,
        projectId: body.projectId
      }
    })

    return new Response(JSON.stringify(map), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}
