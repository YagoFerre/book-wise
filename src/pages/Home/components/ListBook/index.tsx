import { Star } from '@phosphor-icons/react'
import { UserPhoto } from '@/src/pages/components/UserPhoto'

import eu from '../../../../assets/103700322.jpg'
import bookImage from '../../../../assets/book.png'

import {
  BookAuthor,
  BookCover,
  BookDescription,
  BookTitle,
  Container,
  Header,
  Main,
  Name,
  Published,
  Rating,
  UserInfoBox,
} from './styles'

export function ListBook() {
  return (
    <Container>
      <Header>
        <UserInfoBox>
          <UserPhoto src={eu} alt="Imagem do usuário" size={40} />

          <div>
            <Name>Yago</Name>
            <Published>Hoje</Published>
          </div>
        </UserInfoBox>

        <Rating>
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="thin" />
          <Star size={16} color="#8381D9" weight="thin" />
        </Rating>
      </Header>

      <Main>
        <BookCover src={bookImage} alt="Capa do livro" quality={100} width={108} height={152} />

        <div>
          <BookTitle>O Hobbit</BookTitle>
          <BookAuthor>J.R.R. Tolkien</BookAuthor>
          <BookDescription>
            Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras
            fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed
            vulputate massa velit nibh... ver mais
          </BookDescription>
        </div>
      </Main>
    </Container>
  )
}
