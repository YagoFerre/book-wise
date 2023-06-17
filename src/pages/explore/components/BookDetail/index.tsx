import Image from 'next/image'

import { BookOpen, BookmarkSimple, Star } from '@phosphor-icons/react'

import bookImage from '../../../../assets/book.png'

import {
  AboutBox,
  AboutContainer,
  BookAuthor,
  BookContainer,
  BookContent,
  BookTitle,
  Box,
  Container,
  Rating,
  RatingContainer,
} from './styles'

export function BookDetail() {
  return (
    <Container>
      <BookContainer>
        <Image
          src={bookImage}
          alt="Capa do livro"
          width={171}
          height={242}
          quality={100}
          style={{ borderRadius: '10px' }}
        />

        <BookContent>
          <div>
            <BookTitle>
              14 Hábitos de Desenvolvedores Altamente Produtivos
            </BookTitle>
            <BookAuthor>Zeno Rocha</BookAuthor>
          </div>

          <RatingContainer>
            <Rating>
              <Star size={20} color="#8381D9" weight="fill" />
              <Star size={20} color="#8381D9" weight="fill" />
              <Star size={20} color="#8381D9" weight="fill" />
              <Star size={20} color="#8381D9" weight="thin" />
              <Star size={20} color="#8381D9" weight="thin" />
            </Rating>
            <span>3 avaliações</span>
          </RatingContainer>
        </BookContent>
      </BookContainer>

      <AboutContainer>
        <AboutBox>
          <BookmarkSimple size={24} color="#50B2C0" />
          <Box>
            <p>Categoria</p>
            <span>Computação, educação</span>
          </Box>
        </AboutBox>
        <AboutBox>
          <BookOpen size={24} color="#50B2C0" />
          <Box>
            <p>Páginas</p>
            <span>160</span>
          </Box>
        </AboutBox>
      </AboutContainer>
    </Container>
  )
}
