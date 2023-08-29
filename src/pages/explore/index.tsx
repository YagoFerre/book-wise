import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Binoculars } from '@phosphor-icons/react'

import { BookCard } from '../components/BookCard'
import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { Tag } from './components/Tag'

import { api } from '@/src/lib/axios'
import { Category, Book } from '@/src/dtos'

import { BooksContainer, Categories, Container, Content, InputBox, PageHeading } from './styles'

export default function Explore() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [querySearch, setQuerySearch] = useState('')

  const { data: categories } = useQuery<Category[]>(['categories'], async () => {
    const { data } = await api.get('/books/categories')
    return data?.categories
  })

  const { data: books } = useQuery<Book[]>(['books', selectedTag], async () => {
    const { data } = await api.get('/books', {
      params: {
        category: selectedTag,
      },
    })
    return data?.books
  })

  const filteredBooks = books?.filter((book) => {
    return (
      book.name.toLowerCase().includes(querySearch.toLocaleLowerCase()) ||
      book.author.toLocaleLowerCase().includes(querySearch.toLocaleLowerCase())
    )
  })

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
            <Input placeholder="Buscar livro ou autor" onChange={(e) => setQuerySearch(e.target.value)} />
          </InputBox>
        </PageHeading>

        <Categories>
          <Tag title="Tudo" onClick={() => setSelectedTag(null)} selected={selectedTag === null} />
          {categories?.map((category) => (
            <Tag
              key={category.id}
              title={category.name}
              onClick={() => setSelectedTag(category.id)}
              selected={selectedTag === category.id}
            />
          ))}
        </Categories>

        <BooksContainer>
          {filteredBooks?.map((book) => (
            <BookCard key={book.id} data={book} width={108} height={152} />
          ))}
        </BooksContainer>
      </Content>
    </Container>
  )
}
