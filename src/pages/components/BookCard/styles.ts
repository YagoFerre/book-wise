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

export const Read = styled('p', {
  display: 'flex',
  backgroundColor: '$green300',

  marginTop: '-1.2rem',
  marginRight: '-1.2rem',

  height: '1.4rem',

  padding: '0.25rem 0.75rem',

  textTransform: 'uppercase',
  fontSize: '$xs',
  color: '$green100',
  fontWeight: '$bold',

  borderRadius: '0rem 0.25rem 0rem 0.25rem',
})
