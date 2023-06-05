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
  display: 'flex',
  maxWidth: '38rem',
  width: '100%',
  flexDirection: 'column',
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

export const BookListContent = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',

  marginTop: '$10',
})

export const BookCardContainer = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',

  marginTop: '$8',
  gap: '$6',
})

export const AnalyticsUser = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: '19.25rem',
  maxHeight: '34.688rem',

  flexDirection: 'column',

  borderLeft: '1px solid',
  borderLeftColor: '$gray700',

  marginTop: '4.563rem',
})

export const UserDetails = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',

  div: {
    width: '32px',
    height: '4px',

    borderRadius: '$full',
    background: '$gradient-horizontal',
  },
})

export const UserName = styled('p', {
  color: '$gray100',
  fontSize: '$xl',
  fontWeight: '$bold',
  lineHeight: '$short',

  marginTop: '$5',
})

export const MemberSince = styled('p', {
  color: '$gray400',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',

  marginBottom: '$8',
})

export const LiteratureInfo = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',

  marginTop: '3.25rem',
  padding: '0 3.5rem',
  gap: '$10',
})

export const LiteratureInfoBox = styled('div', {
  display: 'flex',
  width: '100%',

  gap: '$5',
})

export const Text = styled('div', {
  strong: {
    color: '$gray200',
    fontSize: '$md',
    fontWeight: '$bold',
    lineHeight: '$short',
  },

  p: {
    color: '$gray300',
    fontSize: '$sm',
    fontWeight: '$regular',
    lineHeight: '$base',
  },
})
