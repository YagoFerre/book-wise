import type { NextApiRequest, NextApiResponse } from 'next'

import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth]'
import { prisma } from '@/src/lib/prisma'
import { Book } from '@/src/dtos'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))

  const userId = session?.user.id

  const averageRatings = await prisma.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

  const booksData = await prisma.book
    .findMany({
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
    .then((response) => JSON.parse(JSON.stringify(response)))

  const books: Book[] = booksData.map((book: Book) => {
    const averageRating = averageRatings.find((rating) => rating.book_id === book.id)

    return {
      ...book,
      rate: averageRating?._avg.rate,
    }
  })

  const lastReadingData = await prisma.rating.findFirst({
    where: {
      user_id: userId,
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

  res.status(201).json(lastReading)
}
