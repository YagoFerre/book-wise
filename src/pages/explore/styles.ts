import { styled } from '@/stitches.config'

export const Container = styled('div', {
  padding: '$4',
})

export const Content = styled('div', {
  display: 'flex',
  maxWidth: '62.25rem',
  marginTop: '3rem',
  marginLeft: 'calc(50% - 608px/2 - 68px)',
  flexDirection: 'column',

  gap: '4rem',
})

export const PageHeading = styled('div', {
  display: 'flex',
  width: '100%',

  justifyContent: 'space-between',
  alignItems: 'center',

  div: {
    display: 'flex',
    width: '100%',
    gap: '$3',
    alignItems: 'center',
  },

  h1: {
    color: '$gray100',
    fontSize: '$2xl',
    fontWeight: '$bold',
    lineHeight: '$short',
  },
})

export const InputBox = styled('div', {
  maxWidth: '27.063rem',
})

export const Categories = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '$3',
  alignItems: 'center',
})

export const BooksContainer = styled('div', {
  display: 'grid',
  width: '100%',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '$5',
})
