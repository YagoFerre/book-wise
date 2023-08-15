import type { NextApiRequest, NextApiResponse } from 'next'

import { getServerSession } from 'next-auth/next'
import { buildNextAuthOptions } from '../auth/[...nextauth]'
import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))
  console.log(session)

  const userId = session?.user.id

  const readBooks = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
  })

  res.status(201).json(readBooks)
}
