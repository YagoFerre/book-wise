import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const ratingsData = await prisma.rating.findMany({
    include: {
      user: true,
      book: {
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          ratings: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  const averageRatings = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

  const booksData = await prisma.book.findMany({
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
  })

  const books = booksData.map((book) => {
    const averageRating = averageRatings.find((rating) => rating.book_id === book.id)

    return {
      ...book,
      rate: averageRating?._avg.rate,
    }
  })

  const ratings = ratingsData.map((rating) => {
    const bookFormatted = books.find((book) => book.id === rating.book_id)
    return {
      ...rating,
      book: bookFormatted,
    }
  })

  return res.status(201).json({ ratings })
}
