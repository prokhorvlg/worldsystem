import { prisma } from '@/lib/prisma'
import { StatusCode } from '@/types/apiTypes'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function GET(request: Request) {
  const token = await getToken({ req: request as any, secret })
  if (!token) {
    return new Response('No token found in request.', {
      status: 401
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: token.id as string
      },
      include: {
        permissions: {
          include: {
            project: true
          }
        }
      }
    })

    if (!user) return

    const projects = user.permissions.map((permission) => permission.project)

    return new Response(JSON.stringify(projects), {
      status: 200
    })
  } catch (e) {
    return new Response('Failed.', {
      status: 405
    })
  }
}

export interface CreateProjectBody {
  name: string
}

export async function POST(request: Request) {
  const body: CreateProjectBody = await request.json()

  const token = await getToken({ req: request as any, secret })
  if (!token) {
    return new Response('No token found in request.', {
      status: StatusCode.Unauthorized
    })
  }

  const userId = token.id as string

  try {
    const project = await prisma.project.create({
      data: {
        name: body.name
      }
    })

    // Create permission to link user with project
    await prisma.permission.create({
      data: {
        userId: userId,
        projectId: project.id
      }
    })

    return new Response(JSON.stringify(project), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}
