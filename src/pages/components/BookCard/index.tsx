import Image from 'next/image'
import { Star } from '@phosphor-icons/react'

import bookImage from '../../../assets/book.png'

import { BookAuthor, BookTitle, Container, Content, Rating } from './styles'
import { LinkProps } from 'next/link'

interface Props extends LinkProps {
  width: number
  height: number
}

export function BookCard({ width, height, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Image
        src={bookImage}
        alt="Capa do livro"
        quality={100}
        width={width}
        height={height}
        style={{ borderRadius: '4px' }}
      />

      <Content>
        <div>
          <BookTitle>A revolução dos bichos</BookTitle>
          <BookAuthor>George Orwell</BookAuthor>
        </div>

        <Rating>
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="thin" />
          <Star size={16} color="#8381D9" weight="thin" />
        </Rating>
      </Content>
    </Container>
  )
}
