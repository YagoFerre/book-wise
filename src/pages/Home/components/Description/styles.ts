import { styled } from '@/stitches.config'

export const Container = styled('p', {
  color: '$gray300',
  fontSize: '$sm',
  lineHeight: '$base',
  fontWeight: '$regular',

  marginTop: '$5',
})

export const SeeMore = styled('span', {
  color: '$purple100',
  fontWeight: '$bold',
  fontSize: '$sm',

  cursor: 'pointer',
})
