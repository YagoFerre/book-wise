import { LinkProps } from 'next/link'

import { Star } from '@phosphor-icons/react'
import bookImage from '../../../../assets/book.png'

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

interface Props extends LinkProps {
  bookTitle: string
  author: string
  latestData: string
}

export function BookCardProfile({
  bookTitle,
  author,
  latestData,
  ...rest
}: Props) {
  return (
    <Container>
      <Text>{latestData}</Text>

      <Content>
        <Box>
          <BookCover
            src={bookImage}
            alt="Capa do livro"
            quality={100}
            width={98}
            height={134}
            onClick={() => {}}
          />

          <BookDetails>
            <div>
              <BookTitle>{bookTitle}</BookTitle>
              <BookAuthor>{author}</BookAuthor>
            </div>

            <Rating>
              <Star size={16} color="#8381D9" weight="fill" />
              <Star size={16} color="#8381D9" weight="fill" />
              <Star size={16} color="#8381D9" weight="fill" />
              <Star size={16} color="#8381D9" weight="thin" />
              <Star size={16} color="#8381D9" weight="thin" />
            </Rating>
          </BookDetails>
        </Box>
        <BookDescription>
          Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae
          non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla ut et
          suspendisse enim suspendisse vitae. Leo non eget lacus sollicitudin
          tristique pretium quam. Mollis et luctus amet sed convallis varius
          massa sagittis. Proin sed proin at leo quis ac sem. Nam donec accumsan
          curabitur amet tortor quam sit. Bibendum enim sit dui lorem urna amet
          elit rhoncus ut. Aliquet euismod vitae ut turpis. Aliquam amet integer
          pellentesque.
        </BookDescription>
      </Content>
    </Container>
  )
}
