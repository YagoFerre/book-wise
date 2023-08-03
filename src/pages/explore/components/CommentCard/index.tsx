import Link from 'next/link'

import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Star } from '@phosphor-icons/react'
import { UserPhoto } from '@/src/pages/components/UserPhoto'
import { Rating } from '@/src/dtos'

import { CommentDescription, CommentHeader, Container, Latest, Ratings, UserInfoBox, UserName } from './styles'

interface Props {
  comment: Rating
}

export function CommentCard({ comment }: Props) {
  return (
    <Container>
      <CommentHeader>
        <Link href="">
          <UserPhoto src={comment.user.avatar_url!} size={40} alt="Foto do usuário" />
        </Link>

        <UserInfoBox>
          <UserName>{comment.user.name}</UserName>
          <Latest>{formatDistance(new Date(comment.created_at), Date.now(), { addSuffix: true, locale: ptBR })}</Latest>
        </UserInfoBox>

        <Ratings>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              color="#8381D9"
              weight={index < comment.rate ? 'fill' : 'thin'}
              cursor="pointer"
            />
          ))}
        </Ratings>
      </CommentHeader>
      <CommentDescription>{comment.description}</CommentDescription>
    </Container>
  )
}
