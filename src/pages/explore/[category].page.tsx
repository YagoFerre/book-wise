import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { Binoculars } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { Tag } from './components/Tag'
import { Modal } from '../components/Modal'

import { prisma } from '@/prisma/seed'
import { BookDTO } from '@/src/dtos/book'

import { BooksContainer, Categories, Container, Content, InputBox, PageHeading } from './styles'
import { Book, Category } from '@prisma/client'

interface Props {
  categories: Category[]
  books: Book[]
  booksByCategory: Book[]
}

interface BookWithRating {
  book_id: string
  _avg: {
    rate: number
  }
}

export default function Explore({ categories, books, booksByCategory }: Props) {
  const [selectedTag, setSelectedTag] = useState('Tudo')

  const { push, query, replace } = useRouter()

  function handleSelectTag(name: string) {
    setSelectedTag(name)
    push(`${name.toLowerCase()}`)
  }

  function handleSelectAll() {
    setSelectedTag('Tudo')
    replace('/explore/tudo')
  }

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
          {selectedTag === 'Tudo'
            ? books?.map((book) => <Modal key={book.id} data={book} width={108} height={152} />)
            : booksByCategory?.map((book) => <Modal key={book.id} data={book} width={108} height={152} />)}
        </BooksContainer>
      </Content>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
  })

  const category = categories.map((category) => {
    return category.name.toLowerCase()
  })

  const paths = category.map((category) => {
    return {
      params: {
        category,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categories = await prisma.category.findMany({}).then((response) => JSON.parse(JSON.stringify(response)))
  const selectedTag = String(params?.category) || ''

  const booksResponse: BookDTO[] = await prisma.book
    .findMany({
      include: {
        ratings: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const booksByCategoryResponse: BookDTO[] = await prisma.book
    .findMany({
      include: {
        ratings: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
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
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const booksWithRatings: BookWithRating[] = await prisma.rating
    .groupBy({
      by: ['book_id'],
      _avg: {
        rate: true,
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  function addRateToBook(books: BookDTO[], booksWithRatings: BookWithRating[]) {
    return books.map((book) => {
      const ratingBook = booksWithRatings.find((rating) => rating.book_id === book.id)

      return {
        ...book,
        rate: ratingBook?._avg.rate,
      }
    })
  }

  const booksByCategoryFormatted = addRateToBook(booksByCategoryResponse, booksWithRatings)
  const booksFormatted = addRateToBook(booksResponse, booksWithRatings)

  const books = JSON.parse(JSON.stringify(booksFormatted))
  const booksByCategory = JSON.parse(JSON.stringify(booksByCategoryFormatted))

  return {
    props: {
      categories,
      books,
      booksByCategory,
    },
  }
}
