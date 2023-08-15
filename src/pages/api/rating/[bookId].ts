import type { NextApiRequest, NextApiResponse } from 'next'

import { getServerSession } from 'next-auth/next'
import { buildNextAuthOptions } from '../auth/[...nextauth]'
import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { rate, description } = req.body

  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))

  const userId = session?.user.id
  const bookId = String(req.query.bookId)

  const ratingExists = await prisma.rating.findFirst({
    where: {
      user_id: userId,
      book_id: bookId,
    },
  })

  if (ratingExists) {
    return res.status(405).end()
  }

  const rating = await prisma.rating.create({
    data: {
      user_id: userId!,
      book_id: bookId,
      rate,
      description,
    },
  })

  res.status(201).json(rating)
}
