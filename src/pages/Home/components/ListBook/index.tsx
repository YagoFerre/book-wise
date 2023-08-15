import { useState } from 'react'
import { useRouter } from 'next/router'

import { Star } from '@phosphor-icons/react'

import { UserPhoto } from '@/src/pages/components/UserPhoto'
import { Modal } from '@/src/pages/components/Modal'

import { Description } from '../Description'
import { Rating } from '@/src/dtos'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  BookAuthor,
  BookCover,
  BookTitle,
  Container,
  Header,
  Main,
  Name,
  Published,
  Ratings,
  UserInfoBox,
} from './styles'

interface Props {
  data: Rating
}

export function ListBook({ data }: Props) {
  const [open, setOpen] = useState(false)

  const { push } = useRouter()

  return (
    <Container>
      <Header>
        <UserInfoBox>
          <UserPhoto
            src={data.user.avatar_url!}
            onClick={async () => await push(`/profile/${data.user_id}`)}
            alt="Imagem do usuário"
            size={40}
          />

          <div>
            <Name>{data.user.name}</Name>
            <Published>{formatDistanceToNow(new Date(data.created_at), { addSuffix: true, locale: ptBR })}</Published>
          </div>
        </UserInfoBox>

        <Ratings>
          {[...Array(5)].map((_, index) => (
            <Star key={index} size={16} color="#8381D9" weight={index < data.rate ? 'fill' : 'thin'} />
          ))}
        </Ratings>
      </Header>

      <Main>
        <BookCover
          src={data.book.cover_url}
          alt="Capa do livro"
          quality={100}
          width={108}
          height={152}
          onClick={() => setOpen(!open)}
        />
        <Modal data={data.book} open={open} onOpenChange={setOpen} />

        <div>
          <BookTitle>{data.book.name}</BookTitle>
          <BookAuthor>{data.book.author}</BookAuthor>
          <Description text={data.description} />
        </div>
      </Main>
    </Container>
  )
}
