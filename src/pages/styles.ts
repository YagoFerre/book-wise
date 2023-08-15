import { styled } from '@/stitches.config'

export const Container = styled('div', {
  display: 'flex',
  maxWidth: '70rem',
  margin: '$5',

  alignItems: 'center',
  justifyContent: 'space-between',
})

export const LogInBox = styled('div', {
  width: '23.25rem',
})

export const Title = styled('p', {
  color: '$gray100',
  fontSize: '$2xl',
  fontWeight: '$bold',
  lineHeight: '$short',
})

export const Subtitle = styled('p', {
  fontSize: '$md',
  fontWeight: '$regular',
  lineHeight: '$base',

  marginBottom: '$10',
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const Button = styled('button', {
  width: '100%',
  background: '$gray600',
  padding: '$5',

  display: 'flex',
  alignItems: 'center',

  '&:hover': {
    background: '$gray500',
  },
})

export const ButtonTitle = styled('p', {
  color: '$gray200',
  fontSize: '$lg',
  fontWeight: '$medium',
  lineHeight: '$base',

  marginLeft: '$5',
})
