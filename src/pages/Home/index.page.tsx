import { CaretRight, ChartLineUp } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { ListBook } from './components/ListBook'
import { BookCard } from '../components/BookCard'
import { LatestReading } from './components/LatestReading'

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
            <ListBook />
            <ListBook />
            <ListBook />
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
            <BookCard width={64} height={94} />
            <BookCard width={64} height={94} />
            <BookCard width={64} height={94} />
            <BookCard width={64} height={94} />
          </BookCardContainer>
        </TrendingBooksContainer>
      </Content>
    </Container>
  )
}
