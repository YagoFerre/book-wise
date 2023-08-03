import { useState } from 'react'

import { Rating as RatingDTO } from '@/src/dtos'
import { Star } from '@phosphor-icons/react'
import { Modal } from '@/src/pages/components/Modal'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  BookAuthor,
  BookCover,
  BookDescription,
  BookDetails,
  BookTitle,
  Box,
  Container,
  Content,
  Rating,
  Text,
} from './styles'

interface Props {
  data: RatingDTO
}

export function BookCardProfile({ data }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Text>{formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ptBR })}</Text>

      <Content>
        <Box>
          <BookCover
            src={data.book.cover_url}
            alt="Capa do livro"
            quality={100}
            width={98}
            height={134}
            onClick={() => setOpen(!open)}
          />

          <Modal data={data.book} open={open} onOpenChange={setOpen} />

          <BookDetails>
            <div>
              <BookTitle>{data.book.name}</BookTitle>
              <BookAuthor>{data.book.author}</BookAuthor>
            </div>

            <Rating>
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={16} color="#8381D9" weight={index < data.rate ? 'fill' : 'thin'} />
              ))}
            </Rating>
          </BookDetails>
        </Box>
        <BookDescription>{data.description}</BookDescription>
      </Content>
    </Container>
  )
}
