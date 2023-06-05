import { Binoculars } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'

import { BooksContainer, Categories, Container, Content, InputBox, PageHeading } from './styles'
import { Tag } from './components/Tag'
import { BookCard } from '../components/BookCard'

import * as Dialog from '@radix-ui/react-dialog'

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
          <Dialog.Root>
            <Dialog.Trigger>
              <BookCard width={108} height={152} href={`/explore/1`} />
            </Dialog.Trigger>
          </Dialog.Root>
          {/* <BookCard width={108} height={152} />
          <BookCard width={108} height={152} />

          <BookCard width={108} height={152} />
          <BookCard width={108} height={152} />
          <BookCard width={108} height={152} />

          <BookCard width={108} height={152} />
          <BookCard width={108} height={152} />
          <BookCard width={108} height={152} />

          <BookCard width={108} height={152} />
          <BookCard width={108} height={152} />
          <BookCard width={108} height={152} /> */}
        </BooksContainer>
      </Content>
    </Container>
  )
}
