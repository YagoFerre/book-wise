import { styled } from '@/stitches.config'

import Image from 'next/image'

export const Container = styled('div', {
  maxWidth: '38rem',
  marginTop: '$10',
})

export const SubtitleBox = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',

  p: {
    fontSize: '$sm',
    fontWeight: '$regular',
    color: '$gray100',
    lineHeight: '$base',
  },
})

export const SeeAll = styled('button', {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '$purple100',
  fontWeight: '$bold',
  fontSize: '$sm',
  background: 'transparent',

  padding: '$1 $2',
  borderRadius: '$sm',

  '&:hover': {
    background: 'rgba(131, 129, 217, 0.06)',
  },
})

export const LatestBook = styled('div', {
  display: 'flex',
  width: '38rem',
  background: '$gray600',
  borderRadius: '8px',
  padding: '$5',
  marginTop: '$4',
  textDecoration: 'none',
  gap: '$6',

  transition: '0.7s',

  '&:hover': {
    background: '$gray500',
  },
})

export const BookCover = styled(Image, {
  borderRadius: '$sm',
  cursor: 'pointer',
})

export const Content = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
})

export const Head = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',

  p: {
    color: '$gray300',
    fontSize: '$sm',
    lineHeight: '$base',
    fontWeight: '$regular',
  },
})

export const Rating = styled('div', {
  display: 'flex',
  gap: '$1',
})

export const Main = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BookTitle = styled('h2', {
  color: '$gray100',
  fontSize: '$md',
  lineHeight: '$short',
  fontWeight: '$bold',

  marginTop: '$3',
})

export const BookAuthor = styled('span', {
  color: '$gray400',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',
})
