import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

import { CaretRight, ChartLineUp } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { BookCard } from '../components/BookCard'
import { ListBook } from './components/ListBook'
import { LatestReading } from './components/LatestReading'

import { api } from '@/src/lib/axios'
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

export default function Home() {
  const { data } = useSession()

  const { data: popularBooks } = useQuery<Book[]>(['popular'], async () => {
    const { data } = await api.get('/books/popular')
    return data?.popularBooks
  })

  const { data: ratings } = useQuery<Rating[]>(['ratings'], async () => {
    const { data } = await api.get('/books/ratings')
    return data?.ratings
  })

  const { data: lastReading } = useQuery<Rating>(
    ['last-reading'],
    async () => {
      const { data } = await api.get('/user/last-reading')
      return data?.lastReading
    },
    {
      enabled: !!data?.user.id,
    },
  )

  return (
    <Container>
      <SideBar />

      <Content>
        <BookListContainer>
          <TitleBox>
            <ChartLineUp size={32} color="#50B2C0" />
            <p>Início</p>
          </TitleBox>

          {lastReading?.user_id && <LatestReading data={lastReading} />}

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
