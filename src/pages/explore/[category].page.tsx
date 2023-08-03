import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { Binoculars } from '@phosphor-icons/react'

import { BookCard } from '../components/BookCard'
import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { Tag } from './components/Tag'

import { prisma } from '@/prisma/seed'
import { Category, Book } from '@/src/dtos'

import { BooksContainer, Categories, Container, Content, InputBox, PageHeading } from './styles'

interface Props {
  categories: Category[]
  books: Book[]
  booksByCategory: Book[]
}

export default function Explore({ categories, books, booksByCategory }: Props) {
  const [selectedTag, setSelectedTag] = useState('tudo')
  const [querySearch, setQuerySearch] = useState('')

  const { push, query } = useRouter()

  function handleSelectTag(name: string) {
    setSelectedTag(name)
    push(`${name.toLowerCase()}`)
  }

  function handleSelectAll() {
    setSelectedTag('tudo')
    push('tudo')
  }

  const filteredBooks =
    selectedTag === 'tudo'
      ? books?.filter((book) => {
          return (
            book.name.toLowerCase().includes(querySearch.toLowerCase()) ||
            book.author.toLowerCase().includes(querySearch.toLowerCase())
          )
        })
      : booksByCategory?.filter((book) => {
          return (
            book.name.toLowerCase().includes(querySearch.toLowerCase()) ||
            book.author.toLowerCase().includes(querySearch.toLowerCase())
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
          <Tag title="Tudo" onClick={handleSelectAll} selected={query.category === 'tudo'} />
          {categories?.map((category) => (
            <Tag
              key={category.id}
              title={category.name}
              onClick={() => handleSelectTag(category.name)}
              selected={selectedTag === category.name}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const categories = await prisma.category.findMany()
  const selectedTag = String(params?.category) || ''

  const books = await prisma.book
    .findMany({
      include: {
        ratings: {
          where: {
            rate: {
              gte: 4,
            },
          },
          include: {
            book: true,
            user: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const booksByCategory = await prisma.book
    .findMany({
      where: {
        categories: {
          some: {
            category: {
              name: {
                contains: selectedTag,
              },
            },
          },
        },
      },
      include: {
        ratings: {
          where: {
            rate: {
              gte: 4,
            },
          },
          include: {
            book: true,
            user: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  return {
    props: {
      categories,
      books,
      booksByCategory,
    },
  }
}
