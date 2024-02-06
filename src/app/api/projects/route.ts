import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function GET(request: Request) {
  const token = await getToken({ req: request as any, secret })
  if (!token) {
    return new Response('No token found in request.', {
      status: 401
    })
  }

  console.log('JSON Web Token', token.id)

  try {
    // const projects = await prisma.map.findMany()

    // const projects = await prisma.project.findMany({
    //   relationLoadStrategy: 'join',
    //   where: {
    //     userId: ''
    //   },
    // })

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

    console.log(user)

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

export async function POST(request: Request) {
  console.log('PROJECTS API HIT', request)
  const token = await getToken({ req: request as any, secret })
  if (!token) {
    return new Response('No token found in request.', {
      status: 401
    })
  }

  console.log('JSON Web Token', token.id)
  const userId = token.id as string

  try {
    const project = await prisma.project.create({
      data: {
        name: 'Elsa Prisma'
      }
    })

    console.log('CREATED PROJECT', project)

    const permission = await prisma.permission.create({
      data: {
        userId: userId,
        projectId: project.id
      }
    })

    console.log('CREATED PERMISSION', permission)

    return new Response(JSON.stringify(project), {
      status: 200
    })
  } catch (e) {
    return new Response('Failed.', {
      status: 405
    })
  }
}
