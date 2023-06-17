import Image from 'next/image'

import imageLogIn from '../../assets/image.png'
import googleSvg from '../../assets/google.svg'
import gitHubSvg from '../../assets/github.svg'
import rocketSvg from '../../assets/rocket.svg'

import {
  Button,
  ButtonContainer,
  ButtonTitle,
  Container,
  LogInBox,
  Subtitle,
  Title,
} from './styles'

export default function Login() {
  return (
    <Container>
      <Image src={imageLogIn} alt="Image BookWise" quality={100} priority />
      <LogInBox>
        <Title>Boas vindas!</Title>
        <Subtitle>Faça seu login ou acesse como visitante.</Subtitle>

        <ButtonContainer>
          <Button>
            <Image src={googleSvg} alt="Google SVG" quality={100} />
            <ButtonTitle>Entrar com Google</ButtonTitle>
          </Button>

          <Button>
            <Image src={gitHubSvg} alt="GitHub SVG" quality={100} />
            <ButtonTitle>Entrar com GitHub</ButtonTitle>
          </Button>

          <Button>
            <Image src={rocketSvg} alt="Rocket SVG" quality={100} />
            <ButtonTitle>Acessar como visitante</ButtonTitle>
          </Button>
        </ButtonContainer>
      </LogInBox>
    </Container>
  )
}
