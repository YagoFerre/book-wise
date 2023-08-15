import Image from 'next/image'

import imageLogIn from '../assets/image.png'
import googleSvg from '../assets/google.svg'
import gitHubSvg from '../assets/github.svg'
import rocketSvg from '../assets/rocket.svg'

import { Button, ButtonContainer, ButtonTitle, Container, LogInBox, Subtitle, Title } from './styles'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
  const { push } = useRouter()

  async function handleSignIn(provider: string) {
    await signIn(provider, { callbackUrl: '/Home' })
  }

  return (
    <Container>
      <Image src={imageLogIn} alt="Image BookWise" quality={100} priority />
      <LogInBox>
        <Title>Boas vindas!</Title>
        <Subtitle>Faça seu login ou acesse como visitante.</Subtitle>

        <ButtonContainer>
          <Button onClick={() => handleSignIn('google')}>
            <Image src={googleSvg} alt="Google SVG" quality={100} />
            <ButtonTitle>Entrar com Google</ButtonTitle>
          </Button>

          <Button onClick={() => handleSignIn('github')}>
            <Image src={gitHubSvg} alt="GitHub SVG" quality={100} />
            <ButtonTitle>Entrar com GitHub</ButtonTitle>
          </Button>

          <Button onClick={async () => await push('/Home')}>
            <Image src={rocketSvg} alt="Rocket SVG" quality={100} />
            <ButtonTitle>Acessar como visitante</ButtonTitle>
          </Button>
        </ButtonContainer>
      </LogInBox>
    </Container>
  )
}
