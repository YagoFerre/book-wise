import Image from 'next/image'

import { Book } from '@prisma/client'
import { BookOpen, BookmarkSimple, Star } from '@phosphor-icons/react'

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

interface Props {
  book: Book
}

export function BookDetail({ book }: Props) {
  console.log(book)
  return (
    <Container>
      <BookContainer>
        <Image
          src={book.cover_url}
          alt="Capa do livro"
          width={171}
          height={242}
          quality={100}
          style={{ borderRadius: '10px' }}
        />

        <BookContent>
          <div>
            <BookTitle>{book.name}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
          </div>

          <RatingContainer>
            <Rating>
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={20} color="#8381D9" weight={index < book.rate ? 'fill' : 'thin'} />
              ))}
            </Rating>
            <span>{book.ratings.length} avaliações</span>
          </RatingContainer>
        </BookContent>
      </BookContainer>

      <AboutContainer>
        <AboutBox>
          <BookmarkSimple size={24} color="#50B2C0" />
          <Box>
            <p>Categoria</p>
            <span>
              {book.categories[0].category.name}, {book.categories[1].category.name}
            </span>
          </Box>
        </AboutBox>
        <AboutBox>
          <BookOpen size={24} color="#50B2C0" />
          <Box>
            <p>Páginas</p>
            <span>{book.total_pages}</span>
          </Box>
        </AboutBox>
      </AboutContainer>
    </Container>
  )
}
