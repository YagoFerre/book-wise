import Image from 'next/image'
import { signIn } from 'next-auth/react'
import * as Dialog from '@radix-ui/react-dialog'

import { X } from '@phosphor-icons/react'

import googleSvg from '../../../assets/google.svg'
import gitHubSvg from '../../../assets/github.svg'

import {
  ButtonContainer,
  Button,
  Close,
  Container,
  Content,
  FeedbackButton,
  ModalTitle,
  Overlay,
  Portal,
  Root,
  Trigger,
} from './styles'

interface Props extends Dialog.DialogProps {
  onComment: () => void
}

export function LoginModal({ onComment, ...rest }: Props) {
  async function handleSignIn(provider: string) {
    await signIn(provider)
  }

  return (
    <Root {...rest}>
      <Trigger>
        <FeedbackButton onClick={onComment}>Avaliar</FeedbackButton>
      </Trigger>
      <Portal>
        <Overlay />
        <Content>
          <Close>
            <X size={24} color="#8D95AF" />
          </Close>
          <Container>
            <ModalTitle>Faça login para deixar sua avaliação</ModalTitle>

            <ButtonContainer>
              <Button onClick={() => handleSignIn('google')}>
                <Image src={googleSvg} alt="Google SVG" width={32} height={32} quality={100} />
                Entrar com Google
              </Button>
              <Button onClick={() => handleSignIn('github')}>
                <Image src={gitHubSvg} alt="GitHub SVG" width={32} height={32} quality={100} />
                Entrar com GitHub
              </Button>
            </ButtonContainer>
          </Container>
        </Content>
      </Portal>
    </Root>
  )
}
