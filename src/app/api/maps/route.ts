import { prisma } from '@/lib/prisma'
import { StatusCode } from '@/types/apiTypes'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export interface GetMapsBody {
  projectId: string
}

// (R) GET MAPS
export async function GET(request: Request) {
  const body: GetMapsBody = await request.json()
  const { projectId } = body

  const token = await getToken({ req: request as any, secret })
  if (!token) {
    return new Response('No token found in request.', {
      status: StatusCode.Unauthorized
    })
  }

  try {
    // const maps = await prisma.map.findMany()
    // console.log(maps)

    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        maps: {
          include: {
            positionsOnMap: {
              include: {
                location: true
              }
            }
          }
        }
      }
    })
    if (!project) return

    // const maps = project.maps.map((map) => map.project)

    return new Response(JSON.stringify(project.maps), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response('Something failed while fetching.', {
      status: StatusCode.ServerError
    })
  }
}
