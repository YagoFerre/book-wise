import Image from 'next/image'

import {
  Binoculars,
  ChartLineUp,
  SignIn,
  User,
  SignOut,
} from '@phosphor-icons/react'

import { UserPhoto } from '@/src/pages/components/UserPhoto'

import logo from '../../../assets/logo.png'
import eu from '../../../assets/103700322.jpg'

import { Container, Content, Menu, MenuLink, Login, LogOut } from './styles'

export function SideBar() {
  return (
    <Container>
      <Content>
        <Image
          src={logo}
          alt="Logo"
          quality={100}
          style={{ marginTop: '15px' }}
        />

        <Menu>
          <MenuLink href="/Home" active={true}>
            <ChartLineUp size={24} />
            Início
          </MenuLink>
          <MenuLink href="/explore" active={false}>
            <Binoculars size={24} />
            Explorar
          </MenuLink>
          <MenuLink href="/profile" active={false}>
            <User size={24} />
            Perfil
          </MenuLink>
        </Menu>

        <Login href="/">
          Fazer login <SignIn size={20} color="#50B2C0" weight="bold" />
        </Login>

        {/* <LogOut href="/">
          <UserPhoto src={eu} alt="Imagem do usuário" size={32} />
          Yago
          <SignOut size={20} color="#F75A68" weight="bold" />
        </LogOut> */}
      </Content>
    </Container>
  )
}
