import { styled } from '@/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: '38rem',
  background: '$gray700',
  borderRadius: '8px',
  padding: '$5',
  margin: '0 auto',
  textDecoration: 'none',
  gap: '$5',

  transition: '0.7s',
  cursor: 'pointer',

  '&:hover': {
    background: '$gray600',
  },
})

export const Content = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BookTitle = styled('p', {
  color: '$gray100',
  fontSize: '$md',
  lineHeight: '$short',
  fontWeight: '$bold',

  textAlign: 'start',
})

export const BookAuthor = styled('p', {
  color: '$gray400',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',

  textAlign: 'start',
})

export const Rating = styled('div', {
  display: 'flex',
  gap: '$1',
})
