import { styled } from '@/stitches.config'

import Image from 'next/image'

export const Container = styled('div', {
  display: 'flex',
  width: '38rem',
  flexDirection: 'column',
  background: '$gray700',
  borderRadius: '8px',
  padding: '$5',
  margin: '0 auto',
  textDecoration: 'none',

  transition: '0.7s',

  '&:hover': {
    background: '$gray600',
  },
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  marginBottom: '$8',
})

export const UserInfoBox = styled('div', {
  display: 'flex',
  gap: '$4',
})

export const Name = styled('p', {
  color: '$gray100',
  fontSize: '$md',
  lineHeight: '$base',
  fontWeight: '$regular',
})

export const Published = styled('p', {
  color: '$gray400',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',
})

export const Rating = styled('div', {
  display: 'flex',
  gap: '$1',
})

export const Main = styled('main', {
  display: 'flex',
  gap: '$5',
})

export const BookCover = styled(Image, {
  borderRadius: '$sm',
  cursor: 'pointer',
})

export const BookTitle = styled('p', {
  color: '$gray100',
  fontSize: '$md',
  lineHeight: '$short',
  fontWeight: '$bold',
})

export const BookAuthor = styled('p', {
  color: '$gray400',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',
})

export const BookDescription = styled('p', {
  color: '$gray300',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',

  marginTop: '$5',
})
