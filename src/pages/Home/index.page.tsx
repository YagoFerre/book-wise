import { GetStaticProps } from 'next'

import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CaretRight, ChartLineUp } from '@phosphor-icons/react'

import { Modal } from '../components/Modal'
import { SideBar } from '../components/SideBar'
import { ListBook } from './components/ListBook'
import { LatestReading } from './components/LatestReading'

import { prisma } from '@/prisma/seed'
import { Book, Rating } from '@/src/dtos'

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

interface Props {
  ratings: Rating[]
  popularBooks: Book[]
}

interface BookWithRating {
  book_id: string
  _avg: {
    rate: number
  }
}

export default function Home({ ratings, popularBooks }: Props) {
  return (
    <Container>
      <SideBar />

      <Content>
        <BookListContainer>
          <TitleBox>
            <ChartLineUp size={32} color="#50B2C0" />
            <p>Início</p>
          </TitleBox>

          {/* <LatestReading /> */}

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
              <Modal key={book.id} data={book} width={64} height={94} />
            ))}
          </BookCardContainer>
        </TrendingBooksContainer>
      </Content>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const responseRatings = await prisma.rating
    .findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        book: true,
        user: true,
      },
    })
    .then((response) => JSON.stringify(response))
  const ratingsData = await JSON.parse(responseRatings)

  const ratings = ratingsData.map((rating: Rating) => {
    return {
      ...rating,
      created_at: formatDistance(new Date(rating.created_at), Date.now(), { addSuffix: true, locale: ptBR }),
    }
  })

  const responsePopularBooks: Book[] = await prisma.book
    .findMany({
      orderBy: {
        ratings: {
          _count: 'desc',
        },
      },
      include: {
        ratings: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
      take: 4,
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const booksWithRating: BookWithRating[] = await prisma.rating
    .groupBy({
      by: ['book_id'],
      where: {
        book_id: {
          in: responsePopularBooks.map((book) => book.id),
        },
      },
      _avg: {
        rate: true,
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const popularBooksData = responsePopularBooks.map((book) => {
    const bookWithRating = booksWithRating.find((rating) => rating.book_id === book.id)

    return {
      ...book,
      name: `${book.name.slice(0, 34)}...`,
      rate: bookWithRating?._avg.rate,
    }
  })

  const popularBooks = await JSON.parse(JSON.stringify(popularBooksData))

  return {
    props: {
      ratings,
      popularBooks,
    },
  }
}
