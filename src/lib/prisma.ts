import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// @AGENT_MODIFIED: 2026-04-20T22:45:00Z | Agent 4 | Reason: Setup Prisma singleton | Tag: #db
