import { styled } from '@/stitches.config'

import Link from 'next/link'

export const Container = styled('div', {
  width: '14.5rem',
  height: 'calc(100% - 40px)',
  borderRadius: '12px',
  padding: '$5',
  background: 'linear-gradient(180deg, $gray700 0%, $gray600 100%)',
  position: 'fixed',
})

export const Content = styled('div', {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  flexDirection: 'column',
})

export const Menu = styled('div', {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginTop: '4rem',
  gap: '$5',
})

export const MenuLink = styled(Link, {
  width: '128px',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '$gray400',
  gap: '$3',

  '&:hover': {
    color: '$gray100',
  },

  '&::before': {
    content: '""',
    width: '4px',
    height: '24px',
    borderRadius: '$full',
  },

  variants: {
    active: {
      true: {
        color: '$gray100',
        gap: '$3',
        '&::before': {
          background: '$gradient-vertical',
        },
      },
    },
  },
})

export const Login = styled(Link, {
  width: '8rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',

  gap: '$3',

  color: '$gray200',
  fontSize: '$md',
  fontWeight: '$bold',
  lineHeight: '$base',
})

export const LogOut = styled(Link, {
  width: '8rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',

  gap: '$3',

  color: '$gray200',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',
})
