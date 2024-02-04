import { prisma } from '@/lib/prisma'
import { getHashedPassword } from '@/utils/crypto'
import { Prisma } from '@prisma/client'

// (C) CREATE USER
export async function PUT(request: Request, response: any) {
  const body = await request.json()

  try {
    const user = await prisma.user.create({
      data: {
        email: body?.email,
        name: body?.name,
        password: getHashedPassword(body.password || '')
      }
    })
    return response.status(201).json({ user })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return response.status(400).json({ message: e.message })
    }
  }
}
