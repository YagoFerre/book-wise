import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'

import { CaretRight, ChartLineUp } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { BookCard } from '../components/BookCard'
import { ListBook } from './components/ListBook'
import { LatestReading } from './components/LatestReading'

import { prisma } from '@/src/lib/prisma'
import { Account, AverageRating, Book, Rating } from '@/src/dtos'

import {
  BookCardContainer,
  BookListContainer,
  BookListWrapper,
  Container,
  Content,
  PopularBooks,
  SeeAll,
  SubtitleBox,
  TitleBox,
  TrendingBooksContainer,
  TrendingTitleBox,
} from './styles'
import { getServerSession } from 'next-auth/next'
import { buildNextAuthOptions } from '../api/auth/[...nextauth]'
import { api } from '@/src/lib/axios'

interface Props {
  ratings: Rating[]
  popularBooks: Book[]
  lastReading: Rating
}

export default function Home({ ratings, popularBooks, lastReading }: Props) {
  const { data } = useSession()
  console.log(data)
  return (
    <Container>
      <SideBar />

      <Content>
        <BookListContainer>
          <TitleBox>
            <ChartLineUp size={32} color="#50B2C0" />
            <p>Início</p>
          </TitleBox>

          {data && <LatestReading data={lastReading} />}

          <SubtitleBox>
            <p>Avaliações mais recentes</p>
          </SubtitleBox>

          <BookListWrapper>
            {ratings?.map((rating) => (
              <ListBook key={rating.id} data={rating} />
            ))}
          </BookListWrapper>
        </BookListContainer>

        <TrendingBooksContainer>
          <TrendingTitleBox>
            <PopularBooks>Livros populares</PopularBooks>
            <SeeAll>
              Ver todos <CaretRight size={16} color="#8381D9" />
            </SeeAll>
          </TrendingTitleBox>

          <BookCardContainer>
            {popularBooks?.map((book) => (
              <BookCard key={book.id} data={book} width={64} height={94} />
            ))}
          </BookCardContainer>
        </TrendingBooksContainer>
      </Content>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const session = await getServerSession(context.req, context.res, buildNextAuthOptions(context.req, context.res))
  // console.log(session)
  const { data } = await api.get('/user/last-reading')
  const lastReading = data
  console.log(lastReading)

  // const lastReading = await prisma.account
  //   .findMany({
  //     where: {
  //       user_id: session?.user.id,
  //     },
  //     include: {
  //       user: {
  //         include: {
  //           ratings: {
  //             include: {
  //               book: {
  //                 include: {
  //                   categories: {
  //                     include: {
  //                       category: true,
  //                     },
  //                   },
  //                   ratings: {
  //                     include: {
  //                       user: true,
  //                     },
  //                   },
  //                 },
  //               },
  //               user: true,
  //             },
  //             orderBy: {
  //               created_at: 'desc',
  //             },
  //           },
  //         },
  //       },
  //     },
  //     take: 1,
  //   })
  //   .then((response) => JSON.parse(JSON.stringify(response)))

  // console.log(lastReading)

  const ratingsData = await prisma.rating
    .findMany({
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
    .then((response) => JSON.parse(JSON.stringify(response)))

  const popularBooksData = await prisma.book
    .findMany({
      orderBy: {
        ratings: {
          _count: 'desc',
        },
      },
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
      take: 4,
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const averageRatings = await prisma.rating
    .groupBy({
      by: ['book_id'],
      _avg: {
        rate: true,
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const popularBooks = popularBooksData.map((book: Book) => {
    const averageRating = averageRatings.find((rating: AverageRating) => rating.book_id === book.id)

    return {
      ...book,
      rate: averageRating?._avg.rate,
    }
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

  const books = booksData.map((book: Book) => {
    const averageRating = averageRatings.find((rating: AverageRating) => rating.book_id === book.id)

    return {
      ...book,
      rate: averageRating?._avg.rate,
    }
  })

  const ratings = ratingsData.map((rating: Rating) => {
    const bookFormatted = books.find((book: Book) => book.id === rating.book_id)
    return {
      ...rating,
      book: bookFormatted,
    }
  })

  return {
    props: {
      ratings,
      popularBooks,
      lastReading,
    },
  }
}
