import { prisma } from '@/lib/prisma'
import { StatusCode } from '@/types/apiTypes'
import { PrismaMapNode } from '@/types/prismaTypes'
import { listToTree } from '@/utils/tree'

// Enhanced map node with children array
export type MapNodeRoot = PrismaMapNode & {
  children: MapNodeRoot[]
}

export type GetMapNodesResponse = MapNodeRoot[]

export async function GET(request: Request, context: any) {
  const projectId = context.params.projectId
  const mapId = parseInt(context.params.mapId)

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      },
      include: {
        maps: {
          where: {
            id: mapId
          },
          include: {
            mapNodes: {
              include: {
                location: true
              }
            }
          }
        }
      }
    })
    if (!project) return

    const map = project.maps[0]
    const mapNodeRoots = listToTree(map.mapNodes) as MapNodeRoot[]
    console.log(mapNodeRoots)

    return new Response(JSON.stringify(mapNodeRoots), {
      status: StatusCode.OK
    })
  } catch (e) {
    console.warn(e)
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}
