import { useState } from 'react'
import { useRouter } from 'next/router'

import { CaretRight, Star } from '@phosphor-icons/react'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Rating as RatingDTO } from '@/src/dtos'
import { Description } from '../Description'

import { Modal } from '@/src/pages/components/Modal'

import {
  BookAuthor,
  BookCover,
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

interface Props {
  data: RatingDTO
}

export function LatestReading({ data }: Props) {
  const [open, setOpen] = useState(false)

  const { push } = useRouter()

  return (
    <Container>
      <SubtitleBox>
        <p>Sua última leitura</p>

        <SeeAll onClick={async () => await push(`/profile/${data?.id}`)}>
          Ver todas <CaretRight size={16} color="#8381D9" />
        </SeeAll>
      </SubtitleBox>

      <LatestBook>
        <BookCover
          src={data.book.cover_url}
          onClick={() => setOpen(!open)}
          alt="Capa do livro"
          quality={100}
          width={108}
          height={152}
        />

        <Modal data={data.book} open={open} onOpenChange={setOpen} />

        <Content>
          <Head>
            <p>{formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ptBR })}</p>

            <Rating>
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={16} color="#8381D9" weight={index < data.rate ? 'fill' : 'thin'} />
              ))}
            </Rating>
          </Head>

          <Main>
            <div>
              <BookTitle>{data.book.name}</BookTitle>
              <BookAuthor>{data.book.author}</BookAuthor>
            </div>

            <Description text={data.description} />
          </Main>
        </Content>
      </LatestBook>
    </Container>
  )
}
