import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Check, Star, X } from '@phosphor-icons/react'

import { UserPhoto } from '@/src/pages/components/UserPhoto'
import { BookDetail } from '../../explore/components/BookDetail'
import { CommentCard } from '../../explore/components/CommentCard'
import { LoginModal } from '../LoginModal'

import { api } from '@/src/lib/axios'
import { Book } from '@/src/dtos'

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
  Username,
} from './styles'

interface Props extends Dialog.DialogProps {
  data: Book
  width?: number
  height?: number
}

const commentSchema = z.object({
  description: z.string().trim(),
  rate: z
    .number()
    .min(0, { message: 'Avaliação é obrigatória' })
    .max(5)
    .transform((value) => value + 1),
})

export type CommentFormData = z.infer<typeof commentSchema>

export function Modal({ data, width, height, ...rest }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      rate: undefined,
    },
  })

  const rate = watch('rate')

  const [isOpen, setIsOpen] = useState(false)
  // const [user, setUser] = useState(true)

  function handleOpenLoginModal() {
    setIsOpen(true)
  }

  async function handleComment(data: CommentFormData) {
    try {
      await api.post('/rating', {
        rate: data.rate,
        description: data.description,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Root {...rest}>
      <Portal>
        <Overlay />
        <Content>
          <Container>
            <Close>
              <X size={24} color="#8D95AF" />
            </Close>

            <BookDetail book={data} />

            <Comments>
              <CommentsHeader>
                <Title>Avaliações</Title>
                {!isOpen && <LoginModal onComment={handleOpenLoginModal} />}
              </CommentsHeader>

              {isOpen && (
                <CommentBox onSubmit={handleSubmit(handleComment)}>
                  <Header>
                    <UserPhoto src={eu} alt="Foto do usuário" size={40} />
                    <Username>Yago Ferreira</Username>

                    <Rating>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={28}
                          color="#8381D9"
                          weight={index <= rate! ? 'fill' : 'thin'}
                          onClick={() => setValue('rate', index)}
                          cursor="pointer"
                        />
                      ))}
                    </Rating>
                  </Header>

                  <TextInput placeholder="Escreva sua avaliação" maxLength={450} {...register('description')} />

                  <Actions>
                    <ButtonIcon onClick={() => setIsOpen(false)}>
                      <X size={24} color="#8381D9" />
                    </ButtonIcon>
                    <ButtonIcon onSubmit={handleSubmit(handleComment)}>
                      <Check size={24} color="#50B2C0" />
                    </ButtonIcon>
                  </Actions>
                </CommentBox>
              )}

              {data.ratings?.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </Comments>
          </Container>
        </Content>
      </Portal>
    </Root>
  )
}
