import Image from 'next/image'

import { Button, ButtonContainer, ButtonTitle, Container, LogInBox, Subtitle, Title } from './styles'

import imageLogIn from '../../assets/image.png'
import googleSvg from '../../assets/google.svg'
import gitHubSvg from '../../assets/github.svg'
import rocketSvg from '../../assets/rocket.svg'

export default function Login() {
  return (
    <Container>
      <Image src={imageLogIn} alt="Image BookWise" quality={100} priority />
      <LogInBox>
        <Title>Boas vindas!</Title>
        <Subtitle>Faça seu login ou acesse como visitante.</Subtitle>

        <ButtonContainer>
          <Button>
            <Image src={googleSvg} alt="Google SVG" />
            <ButtonTitle>Entrar com Google</ButtonTitle>
          </Button>

          <Button>
            <Image src={gitHubSvg} alt="GitHub SVG" />
            <ButtonTitle>Entrar com GitHub</ButtonTitle>
          </Button>

          <Button>
            <Image src={rocketSvg} alt="Rocket SVG" />
            <ButtonTitle>Acessar como visitante</ButtonTitle>
          </Button>
        </ButtonContainer>
      </LogInBox>
    </Container>
  )
}
