import { useState } from 'react'
import { useSession } from 'next-auth/react'

import Image from 'next/image'

import { Star } from '@phosphor-icons/react'
import { Book } from '@/src/dtos'
import { Modal } from '../Modal'

import { BookAuthor, BookTitle, Container, Content, Rating, Read } from './styles'

interface Props {
  width: number
  height: number
  data: Book
}

export function BookCard({ width, height, data }: Props) {
  const [open, setOpen] = useState(false)

  const session = useSession()

  return (
    <>
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
          </div>

          <Rating>
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={16} color="#8381D9" weight={index < data.rate ? 'fill' : 'thin'} />
            ))}
          </Rating>
        </Content>

        {session.data && data.isRead && <Read>lido</Read>}
      </Container>
    </>
  )
}
