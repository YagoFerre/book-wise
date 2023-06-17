import Link from 'next/link'

import { Star } from '@phosphor-icons/react'
import { UserPhoto } from '@/src/pages/components/UserPhoto'

import eu from '../../../../assets/103700322.jpg'

import {
  CommentDescription,
  CommentHeader,
  Container,
  Latest,
  Rating,
  UserInfoBox,
  UserName,
} from './styles'

export function CommentCard() {
  return (
    <Container>
      <CommentHeader>
        <Link href="">
          <UserPhoto src={eu} size={40} alt="Foto do usuário" />
        </Link>

        <UserInfoBox>
          <UserName>Yago Ferreira</UserName>
          <Latest>Há 2 dias</Latest>
        </UserInfoBox>

        <Rating>
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="fill" />
          <Star size={16} color="#8381D9" weight="thin" />
          <Star size={16} color="#8381D9" weight="thin" />
        </Rating>
      </CommentHeader>
      <CommentDescription>
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
        Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
        eget nec vitae sit vulputate eget
      </CommentDescription>
    </Container>
  )
}
