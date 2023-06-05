import { CaretRight, Star } from '@phosphor-icons/react'

import {
  BookAuthor,
  BookCover,
  BookDescription,
  BookTitle,
  Container,
  Content,
  Head,
  LatestBook,
  Main,
  Rating,
  SeeAll,
  SubtitleBox,
} from './styles'

import bookImage from '../../../../assets/book.png'

export function LatestReading() {
  return (
    <Container>
      <SubtitleBox>
        <p>Sua última leitura</p>

        <SeeAll>
          Ver todas <CaretRight size={16} color="#8381D9" />
        </SeeAll>
      </SubtitleBox>

      <LatestBook>
        <BookCover src={bookImage} alt="Capa do livro" quality={100} width={108} height={152} />

        <Content>
          <Head>
            <p>Há 2 dias</p>

            <Rating>
              <Star size={16} color="#8381D9" weight="fill" />
              <Star size={16} color="#8381D9" weight="fill" />
              <Star size={16} color="#8381D9" weight="fill" />
              <Star size={16} color="#8381D9" weight="thin" />
              <Star size={16} color="#8381D9" weight="thin" />
            </Rating>
          </Head>

          <Main>
            <div>
              <BookTitle>Entendendo Algoritmos</BookTitle>
              <BookAuthor>Aditya Bhargava</BookAuthor>
            </div>

            <BookDescription>
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a
              at imperdiet lectu...
            </BookDescription>
          </Main>
        </Content>
      </LatestBook>
    </Container>
  )
}
