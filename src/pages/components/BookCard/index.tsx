import { useState } from 'react'

import Image from 'next/image'

import { Star } from '@phosphor-icons/react'
import { Book } from '@/src/dtos'
import { Modal } from '../Modal'

import { BookAuthor, BookTitle, Container, Content, Rating } from './styles'

interface Props {
  width: number
  height: number
  data: Book
}

export function BookCard({ width, height, data }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Container onClick={() => setOpen(!open)}>
      <Image
        src={data.cover_url}
        alt="Capa do livro"
        quality={100}
        width={width}
        height={height}
        style={{ borderRadius: '4px' }}
      />

      <Modal data={data} open={open} onOpenChange={setOpen} width={98} height={134} />

      <Content>
        <div>
          <BookTitle>{`${data.name.slice(0, 23)}...`}</BookTitle>
          <BookAuthor>{data.author}</BookAuthor>
        </div>

        <Rating>
          {[...Array(5)].map((_, index) => (
            <Star key={index} size={16} color="#8381D9" weight={index < data.ratings[0]?.rate ? 'fill' : 'thin'} />
          ))}
        </Rating>
      </Content>
    </Container>
  )
}
