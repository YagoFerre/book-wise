import type { NextApiRequest, NextApiResponse } from 'next'

import { AverageRating, Book, Rating, User } from '@/src/dtos'
import { prisma } from '@/src/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userId = String(req.query.userId)

  const profile: User = await prisma.user
    .findFirst({
      where: {
        id: userId,
      },
      include: {
        ratings: {
          orderBy: {
            created_at: 'desc',
          },
          include: {
            book: {
              include: {
                categories: { include: { category: true } },
                ratings: {
                  include: {
                    user: true,
                    book: {
                      include: { ratings: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const booksData = await prisma.book
    .findMany({
      where: {
        ratings: {
          some: {
            user_id: userId,
          },
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
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const averageRatings: AverageRating[] = await prisma.rating
    .groupBy({
      by: ['book_id'],
      _avg: {
        rate: true,
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

  const myRatings = profile.ratings.map((profile: Rating) => {
    const bookFormatted = books.find((book) => book.id === profile.book_id)
    return {
      ...profile,
      book: bookFormatted,
    }
  })

  return res.status(201).json({ myRatings, profile })
}
