import { Star } from '@phosphor-icons/react'
import { UserPhoto } from '@/src/pages/components/UserPhoto'

import { Description } from '../Description'
import { Rating } from '@/src/dtos'

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
  return (
    <Container>
      <Header>
        <UserInfoBox>
          <UserPhoto src={data.user.avatar_url!} alt="Imagem do usuário" size={40} />

          <div>
            <Name>{data.user.name}</Name>
            <Published>{data.created_at}</Published>
          </div>
        </UserInfoBox>

        <Ratings>
          {[...Array(5)].map((_, index) => (
            <Star key={index} size={16} color="#8381D9" weight={index < data.rate ? 'fill' : 'thin'} />
          ))}
        </Ratings>
      </Header>

      <Main>
        <BookCover src={data.book.cover_url} alt="Capa do livro" quality={100} width={108} height={152} />

        <div>
          <BookTitle>{data.book.name}</BookTitle>
          <BookAuthor>{data.book.author}</BookAuthor>
          <Description text={data.description} />
        </div>
      </Main>
    </Container>
  )
}
