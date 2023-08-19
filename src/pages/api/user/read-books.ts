import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userSession = await prisma.session.findFirst({
    select: {
      user_id: true,
      user: {
        include: {
          ratings: {
            select: {
              book_id: true,
            },
          },
        },
      },
    },
  })

  const readBooks = await prisma.rating.findMany({
    where: {
      user_id: userSession?.user_id,
    },
  })

  return res.status(201).json(readBooks)
}
