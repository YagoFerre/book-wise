import { useState } from 'react'
import { Container, SeeMore } from './styles'

interface Props {
  text?: string
}

export function Description({ text }: Props) {
  const [seeMore, setSeeMore] = useState(true)

  return (
    <Container>
      {seeMore ? `${text}... ` : `${text?.slice(0, 150)}... `}

      {text && text?.length > 150 && (
        <SeeMore onClick={() => setSeeMore((value) => !value)}>{seeMore ? 'ver menos' : 'ver mais'}</SeeMore>
      )}
    </Container>
  )
}
