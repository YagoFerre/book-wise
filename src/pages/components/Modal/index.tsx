import { useState } from 'react'

import { Check, Star, X } from '@phosphor-icons/react'

import { BookCard } from '@/src/pages/components/BookCard'
import { UserPhoto } from '@/src/pages/components/UserPhoto'
import { BookDetail } from '../../explore/components/BookDetail'
import { CommentCard } from '../../explore/components/CommentCard'
import { LoginModal } from '../LoginModal'

import eu from '../../../assets/103700322.jpg'

import {
  Actions,
  ButtonIcon,
  Close,
  CommentBox,
  Comments,
  CommentsHeader,
  Container,
  Content,
  Header,
  Overlay,
  Portal,
  Rating,
  Root,
  TextInput,
  Title,
  Trigger,
  Username,
} from './styles'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const commentSchema = z.object({
  comment: z.string().trim(),
})

type commentFormData = z.infer<typeof commentSchema>

export function Modal() {
  const { register, handleSubmit } = useForm<commentFormData>({
    resolver: zodResolver(commentSchema),
  })

  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(true)

  function handleComment() {
    if (user) {
      setIsOpen(true)
    }
    console.log('enviou')
  }

  return (
    <Root>
      <Trigger>
        <BookCard width={108} height={152} />
      </Trigger>
      <Portal>
        <Overlay />
        <Content>
          <Container>
            <Close>
              <X size={24} color="#8D95AF" />
            </Close>

            <BookDetail />

            <Comments>
              <CommentsHeader>
                <Title>Avaliações</Title>
                {!isOpen && <LoginModal onComment={handleComment} />}
              </CommentsHeader>

              {isOpen && (
                <CommentBox>
                  <Header>
                    <UserPhoto src={eu} alt="Foto do usuário" size={40} />
                    <Username>Yago Ferreira</Username>

                    <Rating>
                      <Star size={28} color="#8381D9" weight="fill" />
                      <Star size={28} color="#8381D9" weight="fill" />
                      <Star size={28} color="#8381D9" weight="fill" />
                      <Star size={28} color="#8381D9" weight="thin" />
                      <Star size={28} color="#8381D9" weight="thin" />
                    </Rating>
                  </Header>

                  <TextInput
                    placeholder="Escreva sua avaliação"
                    maxLength={450}
                    {...register('comment')}
                  />

                  <Actions>
                    <ButtonIcon onClick={() => setIsOpen(false)}>
                      <X size={24} color="#8381D9" />
                    </ButtonIcon>
                    <ButtonIcon onClick={handleSubmit(handleComment)}>
                      <Check size={24} color="#50B2C0" />
                    </ButtonIcon>
                  </Actions>
                </CommentBox>
              )}

              <CommentCard />
              <CommentCard />
              <CommentCard />
            </Comments>
          </Container>
        </Content>
      </Portal>
    </Root>
  )
}
