import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/prisma/seed'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  // const { rate, description, book, user } = req.body

  // const rating = await prisma.rating.create({
  //   data: {
  //     rate,
  //     description,
  //     book,
  //     user,
  //   },
  // })

  res.status(200).json(req.body)
}
