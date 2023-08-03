import { GetServerSideProps } from 'next'

import { CaretRight, ChartLineUp } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { BookCard } from '../components/BookCard'
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
              <BookCard key={book.id} data={book} width={64} height={94} />
            ))}
          </BookCardContainer>
        </TrendingBooksContainer>
      </Content>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const ratings = await prisma.rating
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
              where: {
                rate: {
                  gte: 4,
                },
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

  const popularBooks = await prisma.book
    .findMany({
      where: {
        ratings: {
          some: {
            rate: {
              gte: 4,
            },
          },
        },
      },
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

  return {
    props: {
      ratings,
      popularBooks,
    },
  }
}
