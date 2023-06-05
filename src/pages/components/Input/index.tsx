import { ComponentProps } from 'react'

import { Container, Icon, TextInput } from './styles'

interface Props extends ComponentProps<typeof TextInput> {}

export function Input({ ...rest }: Props) {
  return (
    <Container>
      <TextInput placeholder="Buscar livro avaliado" {...rest} />

      <Icon size={20} />
    </Container>
  )
}
