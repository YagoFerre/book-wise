import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { rate, description } = req.body

  const bookId = String(req.query.bookId)
  const userSession = await prisma.session.findFirst()

  const ratingExists = await prisma.rating.findFirst({
    where: {
      user_id: userSession?.user_id,
      book_id: bookId,
    },
  })

  if (ratingExists) {
    return res.status(405).end()
  }

  await prisma.rating.create({
    data: {
      user_id: String(userSession?.user_id),
      book_id: bookId,
      rate,
      description,
    },
  })

  return res.status(201).end()
}
