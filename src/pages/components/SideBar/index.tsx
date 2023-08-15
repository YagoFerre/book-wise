import Image from 'next/image'

import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { Binoculars, ChartLineUp, SignIn, User, SignOut } from '@phosphor-icons/react'

import { UserPhoto } from '@/src/pages/components/UserPhoto'

import logo from '../../../assets/logo.png'

import { Container, Content, Menu, MenuLink, Login, LogOut } from './styles'

export function SideBar() {
  const { pathname } = useRouter()
  const { data } = useSession()

  async function handleSignOut() {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <Container>
      <Content>
        <Image src={logo} alt="Logo" quality={100} style={{ marginTop: '15px' }} />

        <Menu>
          <MenuLink href="/Home" active={pathname === '/Home'}>
            <ChartLineUp size={24} />
            Início
          </MenuLink>
          <MenuLink href="/explore/tudo" active={pathname === '/explore/[category]'}>
            <Binoculars size={24} />
            Explorar
          </MenuLink>

          {data && (
            <MenuLink href={`/profile/${data?.user.id}`} active={pathname === '/profile/[id]'}>
              <User size={24} />
              Perfil
            </MenuLink>
          )}
        </Menu>

        {data ? (
          <LogOut>
            <UserPhoto src={data.user.avatar_url} alt="Imagem do usuário" size={32} />
            {data.user.name.split(' ')[0]}
            <SignOut size={20} color="#F75A68" weight="bold" onClick={handleSignOut} />
          </LogOut>
        ) : (
          <Login href="/">
            Fazer login <SignIn size={20} color="#50B2C0" weight="bold" />
          </Login>
        )}
      </Content>
    </Container>
  )
}
