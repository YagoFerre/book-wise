import { styled } from '@/stitches.config'

export const Container = styled('div', {
  padding: '$4',
})

export const Content = styled('div', {
  display: 'flex',
  maxWidth: '62.25rem',
  marginTop: '3rem',
  marginLeft: 'calc(50% - 608px/2 - 68px)',
  justifyContent: 'space-between',

  gap: '4rem',
})

export const BookListContainer = styled('div', {
  maxWidth: '38rem',
})

export const TitleBox = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '$3',

  p: {
    fontSize: '$2xl',
    fontWeight: '$bold',
    color: '$gray100',
    lineHeight: '$short',
  },
})

export const SubtitleBox = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',

  p: {
    fontSize: '$sm',
    fontWeight: '$regular',
    color: '$gray100',
    lineHeight: '$base',

    marginTop: '$10',
  },
})

export const BookListWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '$3',

  marginTop: '$4',
})

export const TrendingBooksContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '20.25rem',

  marginTop: '4.5rem',
})

export const TrendingTitleBox = styled('div', {
  display: 'flex',
  width: '100%',

  justifyContent: 'space-between',
})

export const PopularBooks = styled('p', {
  fontSize: '$sm',
  fontWeight: '$regular',
  color: '$gray100',
  lineHeight: '$base',
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

export const BookCardContainer = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginTop: '$5',
  gap: '$3',
})
