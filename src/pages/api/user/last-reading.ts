import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userSession = await prisma.session.findFirst()

  const averageRatings = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

  const booksData = await prisma.book.findMany({
    include: {
      ratings: {
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

  const lastReadingData = await prisma.rating.findFirst({
    where: {
      user_id: String(userSession?.user_id),
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
    },
  })

  const bookFormatted = books.find((book) => book.id === lastReadingData?.book_id)

  const lastReading = { ...lastReadingData, book: bookFormatted }

  return res.status(201).json({ lastReading })
}
