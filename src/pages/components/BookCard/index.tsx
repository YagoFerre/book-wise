import Image from 'next/image'

import { Star } from '@phosphor-icons/react'
import { Book } from '@/src/dtos'

import { BookAuthor, BookTitle, Container, Content, Rating } from './styles'

interface Props {
  width: number
  height: number
  data: Book
}

export function BookCard({ width, height, data }: Props) {
  return (
    <Container>
      <Image
        src={data.cover_url}
        alt="Capa do livro"
        quality={100}
        width={width}
        height={height}
        style={{ borderRadius: '4px' }}
      />

      <Content>
        <div>
          <BookTitle>{data.name}</BookTitle>
          <BookAuthor>{data.author}</BookAuthor>
        </div>

        <Rating>
          {[...Array(5)].map((_, index) => (
            <Star key={index} size={16} color="#8381D9" weight={index < data.rate ? 'fill' : 'thin'} />
          ))}
        </Rating>
      </Content>
    </Container>
  )
}
