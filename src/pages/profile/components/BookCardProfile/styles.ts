import { styled } from '@/stitches.config'

import Image from 'next/image'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Text = styled('p', {
  color: '$gray300',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',

  marginBottom: '$2',
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '38rem',

  background: '$gray700',
  textDecoration: 'none',
  borderRadius: '8px',

  padding: '$5',
  margin: '0 auto',
  gap: '$6',

  transition: '0.7s',

  '&:hover': {
    background: '$gray600',
  },
})

export const BookDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'space-between',
})

export const Box = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '$6',
})

export const BookCover = styled(Image, {
  borderRadius: '$sm',
  cursor: 'pointer',
})

export const BookTitle = styled('p', {
  color: '$gray100',
  fontSize: '$lg',
  lineHeight: '$short',
  fontWeight: '$bold',
})

export const BookAuthor = styled('p', {
  color: '$gray400',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',
})

export const Rating = styled('div', {
  display: 'flex',
  gap: '$1',
})

export const BookDescription = styled('p', {
  color: '$gray300',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',

  alignSelf: 'stretch',
})
