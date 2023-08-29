import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const categoryId = req.query.category as string

  const booksData = await prisma.book.findMany({
    where: {
      categories: {
        some: {
          categoryId,
        },
      },
    },
    include: {
      ratings: {
        orderBy: {
          created_at: 'desc',
        },
        include: {
          user: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  const averageRatings = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

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

  const books = booksData.map((book) => {
    const averageRating = averageRatings.find((rating) => rating.book_id === book.id)
    const isRead = readBooks.find((userRating) => userRating.book_id === book.id)

    return {
      ...book,
      rate: averageRating?._avg.rate,
      isRead: isRead || false,
    }
  })

  return res.status(201).json({ books })
}
