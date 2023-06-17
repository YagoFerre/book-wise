import { Binoculars } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { Tag } from './components/Tag'
import { Modal } from '../components/Modal'

import {
  BooksContainer,
  Categories,
  Container,
  Content,
  InputBox,
  PageHeading,
} from './styles'

export default function Explore() {
  return (
    <Container>
      <SideBar />

      <Content>
        <PageHeading>
          <div>
            <Binoculars size={32} color="#50B2C0" />
            <h1>Explorar</h1>
          </div>

          <InputBox>
            <Input placeholder="Buscar livro ou autor" />
          </InputBox>
        </PageHeading>

        <Categories>
          <Tag title="Tudo" selected />
          <Tag title="Computação" />
          <Tag title="Educação" />
          <Tag title="Fantasia" />
          <Tag title="Ficção cientifica" />
          <Tag title="Horror" />
          <Tag title="HQs" />
          <Tag title="Suspense" />
        </Categories>
        <BooksContainer>
          <Modal />
        </BooksContainer>
      </Content>
    </Container>
  )
}
