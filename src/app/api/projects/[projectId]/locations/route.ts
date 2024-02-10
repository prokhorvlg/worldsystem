import { prisma } from '@/lib/prisma'
import { StatusCode } from '@/types/apiTypes'
import { PrismaLocation, PrismaMapNode } from '@/types/prismaTypes'

export async function GET(request: Request, context: any) {
  const projectId = context.params.projectId

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        locations: true
      }
    })
    if (!project) return

    return new Response(JSON.stringify(project.locations), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}

export interface CreateLocationRequest {
  projectId: string
  name: string

  isMapLocation?: boolean // is this being created on the map?
  mapId: number // which map is it created on?
  parentMapNodeId?: string // what is the parent? doesn't need one though
}

export interface CreateLocationResponse {
  location: PrismaLocation
  mapNode: PrismaMapNode | undefined
}

export async function POST(request: Request) {
  const body: CreateLocationRequest = await request.json()

  try {
    const location = await prisma.location.create({
      data: {
        name: body.name,
        projectId: body.projectId
      }
    })

    let mapNode
    if (body.isMapLocation) {
      mapNode = await prisma.mapNode.create({
        data: {
          mapId: body.mapId,
          locationId: location.id,
          parentId: body.parentMapNodeId ?? undefined
        }
      })
    }

    const response: CreateLocationResponse = {
      location,
      mapNode
    }

    return new Response(JSON.stringify(response), {
      status: StatusCode.OK
    })
  } catch (e) {
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}
