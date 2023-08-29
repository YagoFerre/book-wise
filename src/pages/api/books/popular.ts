import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const popularBooksData = await prisma.book.findMany({
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    include: {
      ratings: {
        orderBy: {
          created_at: 'desc',
        },
        include: {
          book: true,
          user: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
    take: 4,
  })

  const averageRatings = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

  const popularBooks = popularBooksData.map((book) => {
    const averageRating = averageRatings.find((rating) => rating.book_id === book.id)

    return {
      ...book,
      rate: averageRating?._avg.rate,
    }
  })

  return res.status(201).json({ popularBooks })
}
