import { prisma } from '@/lib/prisma'
import { getHashedPassword } from '@/utils/crypto'

export async function POST(request: Request) {
  const body = await request.json()

  const { email, password } = body.credentials
  if (!email || !password) {
    return new Response('Invalid input.', {
      status: 400
    })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        image: true
      }
    })

    const hashedPassword = await getHashedPassword(password)

    if (user && user.password === hashedPassword) {
      return new Response(JSON.stringify(exclude(user, ['password'])), {
        status: 200
      })
    }

    return new Response('Invalid credentials.', {
      status: 401
    })
  } catch (e: any) {
    throw new Error(e)
  }
}

function exclude(user: any, keys: any) {
  for (let key of keys) {
    delete user[key]
  }
  return user
}
