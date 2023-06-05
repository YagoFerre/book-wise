import { ComponentProps } from 'react'
import { Container } from './style'

interface Props extends ComponentProps<typeof Container> {
  title: string
  selected?: boolean
}

export function Tag({ title, selected, ...rest }: Props) {
  return (
    <Container selected={selected} {...rest}>
      <p>{title}</p>
    </Container>
  )
}
