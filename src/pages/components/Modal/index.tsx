import { useState } from 'react'

import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

export function Modal({ data, ...rest }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      rate: undefined,
    },
  })

  const rate = watch('rate')

  const session = useSession()
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)

  async function handleOpenLoginModal() {
    if (session.data) {
      setIsOpen(true)
    }
  }

  const { mutateAsync: handleComment } = useMutation(
    async (dataRate: CommentFormData) => {
      await api.post(`/rating/${data.id}`, {
        rate: dataRate.rate,
        description: dataRate.description,
      })

      setIsOpen(false)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['books'] })
        queryClient.invalidateQueries({ queryKey: ['ratings'] })
        queryClient.invalidateQueries({ queryKey: ['popular'] })
        queryClient.invalidateQueries({ queryKey: ['last-reading'] })
      },
    },
  )

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

              {isOpen && session.data && (
                <CommentBox as="form" onSubmit={handleSubmit(handleComment)}>
                  <Header>
                    <UserPhoto src={session.data?.user.avatar_url} alt="Foto do usuário" size={40} />
                    <Username>{session.data?.user.name}</Username>

                    <Rating>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={28}
                          color="#8381D9"
                          weight={index <= rate ? 'fill' : 'thin'}
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
                    <ButtonIcon type="submit">
                      <Check size={24} color="#50B2C0" />
                    </ButtonIcon>
                  </Actions>
                </CommentBox>
              )}

              {data?.ratings.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </Comments>
          </Container>
        </Content>
      </Portal>
    </Root>
  )
}
