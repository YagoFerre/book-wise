import { useState } from 'react'
import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { getYear } from 'date-fns'
import { BookOpen, BookmarkSimple, Books, User, UserList } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { BookCardProfile } from './components/BookCardProfile'
import { UserPhoto } from '../components/UserPhoto'

import { api } from '@/src/lib/axios'
import { prisma } from '@/src/lib/prisma'
import { Rating, User as UserDTO } from '@/src/dtos'

import {
  AnalyticsUser,
  BookCardContainer,
  BookListContainer,
  BookListContent,
  Container,
  Content,
  LiteratureInfo,
  LiteratureInfoBox,
  MemberSince,
  TitleBox,
  UserDetails,
  UserName,
  Text,
} from './styles'

interface Props {
  readPages: {
    _sum: {
      total_pages: number
    }
  }
  ratedBooks: number
  readAuthors: {
    author: number
  }
  mostReadCategory: {
    name: string
  }
}

export default function Profile({ readPages, ratedBooks, readAuthors, mostReadCategory }: Props) {
  const [querySearch, setQuerySearch] = useState('')

  const { query } = useRouter()

  const { data: myRatings } = useQuery<Rating[]>(['ratings', query.id], async () => {
    const { data } = await api.get(`/user/${query.id}`)
    return data?.myRatings
  })

  const { data: profile } = useQuery<UserDTO>(['profile', query.id], async () => {
    const { data } = await api.get(`/user/${query.id}`)
    return data?.profile
  })

  const filteredRatings = myRatings?.filter((rating) => {
    return (
      rating.book.name.toLowerCase().includes(querySearch.toLocaleLowerCase()) ||
      rating.book.author.toLocaleLowerCase().includes(querySearch.toLocaleLowerCase())
    )
  })

  return (
    <Container>
      <SideBar />

      <Content>
        <BookListContainer>
          <TitleBox>
            <User size={32} color="#50B2C0" />
            <p>Perfil</p>
          </TitleBox>

          <BookListContent>
            <Input placeholder="Buscar livro avaliado" onChange={(e) => setQuerySearch(e.target.value)} />

            <BookCardContainer>
              {filteredRatings?.map((rate) => (
                <BookCardProfile key={rate.id} data={rate} />
              ))}
            </BookCardContainer>
          </BookListContent>
        </BookListContainer>

        <AnalyticsUser>
          <UserDetails>
            <UserPhoto src={profile?.avatar_url!} alt="Foto do usuário" size={72} />

            <UserName>{profile?.name}</UserName>
            <MemberSince>membro desde {getYear(new Date(String(profile?.created_at)))}</MemberSince>

            <div />
          </UserDetails>

          <LiteratureInfo>
            <LiteratureInfoBox>
              <BookOpen size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>{readPages?._sum?.total_pages || 0}</strong>
                  <p>Páginas lidas</p>
                </Text>
              </div>
            </LiteratureInfoBox>

            <LiteratureInfoBox>
              <Books size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>{ratedBooks}</strong>
                  <p>Livros avaliados</p>
                </Text>
              </div>
            </LiteratureInfoBox>

            <LiteratureInfoBox>
              <UserList size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>{readAuthors?.author}</strong>
                  <p>Autores lidos</p>
                </Text>
              </div>
            </LiteratureInfoBox>

            <LiteratureInfoBox>
              <BookmarkSimple size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>{mostReadCategory?.name ?? 'Nenhuma'}</strong>
                  <p>Categoria mais lida</p>
                </Text>
              </div>
            </LiteratureInfoBox>
          </LiteratureInfo>
        </AnalyticsUser>
      </Content>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = String(params?.id)

  const readPages = await prisma.book.aggregate({
    where: {
      ratings: {
        some: {
          user_id: userId,
        },
      },
    },
    _sum: {
      total_pages: true,
    },
  })

  const ratedBooks = await prisma.rating.count({
    where: {
      user_id: userId,
    },
  })

  const readAuthors = await prisma.book.count({
    where: {
      ratings: {
        some: {
          user_id: userId,
        },
      },
    },
    select: {
      author: true,
    },
  })

  const mostReadCategoryId = await prisma.categoriesOnBooks.groupBy({
    by: ['categoryId'],
    where: {
      book: {
        ratings: {
          some: {
            user_id: userId,
          },
        },
      },
    },
    orderBy: {
      _count: {
        categoryId: 'desc',
      },
    },
    take: 1,
  })

  const mostReadCategory = await prisma.category.findFirst({
    where: {
      id: mostReadCategoryId[0]?.categoryId,
    },
  })

  return {
    props: {
      readPages,
      ratedBooks,
      readAuthors,
      mostReadCategory,
    },
  }
}
