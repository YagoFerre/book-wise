import { GetServerSideProps } from 'next'

import { getYear } from 'date-fns'

import { BookOpen, BookmarkSimple, Books, User, UserList } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { BookCardProfile } from './components/BookCardProfile'
import { UserPhoto } from '../components/UserPhoto'

import { prisma } from '@/src/lib/prisma'
import { AverageRating, Book, Rating, User as UserDTO } from '@/src/dtos'

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
  profile: UserDTO
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
  myRatings: Rating[]
}

export default function Profile({ profile, readPages, ratedBooks, readAuthors, mostReadCategory, myRatings }: Props) {
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
            <Input placeholder="Buscar livro avaliado" />

            <BookCardContainer>
              {myRatings?.map((rate) => (
                <BookCardProfile key={rate.id} data={rate} />
              ))}
            </BookCardContainer>
          </BookListContent>
        </BookListContainer>

        <AnalyticsUser>
          <UserDetails>
            <UserPhoto src={profile?.avatar_url!} alt="Foto do usuário" size={72} />

            <UserName>{profile?.name}</UserName>
            <MemberSince>membro desde {getYear(new Date(profile?.created_at)) || 2000}</MemberSince>

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
                  <strong>{mostReadCategory?.name || 'Nenhuma'}</strong>
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

  const profile: UserDTO = await prisma.user
    .findFirst({
      where: {
        id: userId,
      },
      include: {
        ratings: {
          orderBy: {
            created_at: 'desc',
          },
          include: {
            book: {
              include: {
                categories: { include: { category: true } },
                ratings: {
                  include: {
                    user: true,
                    book: {
                      include: { ratings: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const booksData = await prisma.book
    .findMany({
      where: {
        ratings: {
          some: {
            user_id: userId,
          },
        },
      },
      include: {
        ratings: {
          orderBy: {
            created_at: 'desc',
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

  const averageRatings: AverageRating[] = await prisma.rating
    .groupBy({
      by: ['book_id'],
      _avg: {
        rate: true,
      },
    })
    .then((response) => JSON.parse(JSON.stringify(response)))

  const books: Book[] = booksData.map((book: Book) => {
    const averageRating = averageRatings.find((rating) => rating.book_id === book.id)

    return {
      ...book,
      rate: averageRating?._avg.rate,
    }
  })

  const myRatings = profile.ratings.map((profile: Rating) => {
    const bookFormatted = books.find((book) => book.id === profile.book_id)
    return {
      ...profile,
      book: bookFormatted,
    }
  })

  console.log(myRatings)

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

  // console.log(readPages)

  const ratedBooks = await prisma.rating.count({
    where: {
      user_id: userId,
    },
  })

  // console.log(ratedBooks)

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

  // console.log(readAuthors)

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

  // console.log(mostReadCategoryId)

  const mostReadCategory = await prisma.category.findFirst({
    where: {
      id: mostReadCategoryId[0]?.categoryId,
    },
  })

  // console.log(mostReadCategory)

  return {
    props: {
      profile,
      readPages,
      ratedBooks,
      readAuthors,
      mostReadCategory,
      myRatings,
    },
  }
}
