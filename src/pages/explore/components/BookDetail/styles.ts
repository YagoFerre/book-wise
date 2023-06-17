import { styled } from '@/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  padding: '$6',

  background: '$gray700',
  borderRadius: '$md',
})

export const BookContainer = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '$8',

  marginBottom: '$10',
})

export const BookContent = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BookTitle = styled('p', {
  color: '$gray100',
  fontSize: '$lg',
  fontWeight: '$bold',
  lineHeight: '$short',
})

export const BookAuthor = styled('p', {
  color: '$gray300',
  fontSize: '$md',
  fontWeight: '$regular',
  lineHeight: '$base',
})

export const RatingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',

  span: {
    color: '$gray400',
    fontSize: '$sm',
    fontWeight: '$regular',
    lineHeight: '$base',
  },
})

export const Rating = styled('div', {
  display: 'flex',
  gap: '$1',
})

export const AboutContainer = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '3.5rem',
  paddingTop: '$6',

  borderTop: '1px solid $gray600',
})

export const AboutBox = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
})

export const Box = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginLeft: '$4',

  p: {
    color: '$gray300',
    fontSize: '$sm',
    fontWeight: '$regular',
    lineHeight: '$base',
  },

  span: {
    color: '$gray200',
    fontSize: '$md',
    fontWeight: '$bold',
    lineHeight: '$short',
  },
})
