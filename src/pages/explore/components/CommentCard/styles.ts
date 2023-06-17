import { styled } from '@/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: '35.25rem',
  padding: '$6',

  flexDirection: 'column',
  gap: '$5',

  backgroundColor: '$gray700',
  borderRadius: '8px',
})

export const CommentHeader = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-start',

  gap: '$4',
})

export const UserInfoBox = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
})

export const UserName = styled('p', {
  color: '$gray100',
  fontSize: '$md',
  fontWeight: '$bold',
  lineHeight: '$short',
})

export const Latest = styled('p', {
  color: '$gray400',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',
})

export const Rating = styled('div', {
  display: 'flex',
  gap: '$1',
})

export const CommentDescription = styled('div', {
  color: '$gray300',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',

  textAlign: 'left',
})
