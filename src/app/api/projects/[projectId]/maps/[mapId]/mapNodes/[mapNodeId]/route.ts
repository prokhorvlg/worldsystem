import { prisma } from '@/lib/prisma'
import { StatusCode } from '@/types/apiTypes'
import { PrismaMapNode } from '@/types/prismaTypes'

export type UpdateMapNodeRequest = Partial<PrismaMapNode>
export type UpdateMapNodeResponse = PrismaMapNode

export async function PUT(request: Request, context: any) {
  const projectId = context.params.projectId
  const mapNodeId = context.params.mapNodeId
  const body: UpdateMapNodeRequest = await request.json()

  try {
    const mapNode = await prisma.mapNode.update({
      where: {
        id: mapNodeId
      },
      data: body
    })

    return new Response(JSON.stringify(mapNode), {
      status: StatusCode.OK
    })
  } catch (e) {
    console.warn(e)
    return new Response((e as any).message || 'Database error.', {
      status: StatusCode.ServerError
    })
  }
}
