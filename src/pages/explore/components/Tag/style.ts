import { styled } from '@/stitches.config'

export const Container = styled('button', {
  padding: '$1 $4',
  background: 'transparent',

  alignItems: 'center',

  color: '$purple100',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',

  border: '1px solid $purple100',
  borderRadius: '$full',

  transition: '03.s',

  '&:hover': {
    background: '$purple200',
    color: '$gray100',
  },

  variants: {
    selected: {
      true: {
        background: '$purple200',
        color: '$gray100',
        border: 'none',
      },
    },
  },
})
