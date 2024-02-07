import type { Prisma, PrismaClient } from '@prisma/client'

// All database-related object types are generated directly from the prisma schema.
// No more duplicating interfaces!

type ModelNames = Prisma.ModelName

type PrismaModels = {
  [M in ModelNames]: Exclude<
    Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>,
    null
  >
}

export type PrismaUser = PrismaModels['User']
export type PrismaProject = PrismaModels['Project']
export type PrismaPermission = PrismaModels['Permission']

export type PrismaMap = PrismaModels['Map']
export type PrismaLocation = PrismaModels['Location']
export type PrismaPositionOnMap = PrismaModels['PositionOnMap']
