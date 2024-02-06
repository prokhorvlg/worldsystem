import { prisma } from '@/lib/prisma'
import { getHashedPassword } from '@/utils/crypto'
import { Prisma } from '@prisma/client'

// (C) CREATE USER
export async function PUT(request: Request) {
  const body = await request.json()

  try {
    const user = await prisma.user.create({
      data: {
        id: body?.id,
        email: body?.email,
        name: body?.name,
        password: getHashedPassword(body.password || '')
      }
    })

    return new Response(JSON.stringify(user), {
      status: 201
    })
  } catch (e) {
    return new Response((e as Prisma.PrismaClientKnownRequestError).message, {
      status: 400
    })
  }
}
