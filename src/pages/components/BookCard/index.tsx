import { useState } from 'react'

import Image from 'next/image'

import { Star } from '@phosphor-icons/react'
import { Book } from '@/src/dtos'

import { BookAuthor, BookTitle, Container, Content, Rating } from './styles'
import { Modal } from '../Modal'

interface Props {
  width: number
  height: number
  data: Book
  isRead: boolean
}

export function BookCard({ width, height, data, isRead }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Image
        src={data.cover_url}
        alt="Capa do livro"
        quality={100}
        width={width}
        height={height}
        style={{ borderRadius: '4px', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      />

      <Modal data={data} open={open} onOpenChange={setOpen} />

      <Content>
        <div>
          <BookTitle>{`${data.name.slice(0, 23)}...`}</BookTitle>
          <BookAuthor>{data.author}</BookAuthor>
          <p>{isRead && 'ai'}</p>
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
