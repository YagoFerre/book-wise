import { BookOpen, BookmarkSimple, Books, User, UserList } from '@phosphor-icons/react'

import { SideBar } from '../components/SideBar'
import { Input } from '../components/Input'
import { BookCardProfile } from './components/BookCardProfile'
import { UserPhoto } from '../components/UserPhoto'

import eu from '../../assets/103700322.jpg'

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

export default function Profile() {
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
              <BookCardProfile
                href="/"
                bookTitle="Entendendo Algoritmos"
                author="Aditya Bhargava"
                latestData="Há 4 meses"
              />
              <BookCardProfile href="/" bookTitle="O Hobbit" author="J.R.R. Tolkien" latestData="Há 2 dias" />
              <BookCardProfile
                href="/"
                bookTitle="O guia do mochileiro das galáxias"
                author="Douglas"
                latestData="Há 6 dias"
              />
            </BookCardContainer>
          </BookListContent>
        </BookListContainer>

        <AnalyticsUser>
          <UserDetails>
            <UserPhoto src={eu} alt="Foto do usuário" size={72} />

            <UserName>Yago Ferreira</UserName>
            <MemberSince>membro desde 2019</MemberSince>

            <div />
          </UserDetails>

          <LiteratureInfo>
            <LiteratureInfoBox>
              <BookOpen size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>3853</strong>
                  <p>Páginas lidas</p>
                </Text>
              </div>
            </LiteratureInfoBox>

            <LiteratureInfoBox>
              <Books size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>10</strong>
                  <p>Livros avaliados</p>
                </Text>
              </div>
            </LiteratureInfoBox>

            <LiteratureInfoBox>
              <UserList size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>8</strong>
                  <p>Autores lidos</p>
                </Text>
              </div>
            </LiteratureInfoBox>

            <LiteratureInfoBox>
              <BookmarkSimple size={32} color="#50B2C0" />

              <div>
                <Text>
                  <strong>Computação</strong>
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
