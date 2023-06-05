import { styled } from '@/stitches.config'

import { MagnifyingGlass } from '@phosphor-icons/react'

export const Container = styled('div', {
  display: 'flex',
  position: 'relative',

  '&:has(input:focus):last-child': {
    color: '#255D6A',
  },

  '&:not(input:focus)': {
    color: '#303F73',
  },
})

export const TextInput = styled('input', {
  width: '100%',
  padding: '$3 $5',
  backgroundColor: '$gray800',
  border: '1px solid #303F73',
  borderRadius: '$sm',

  color: '$gray200',
  fontSize: '$sm',
  fontWeight: '$regular',

  '&:focus': {
    outline: 0,
    borderColor: '$green200',
  },
})

export const Icon = styled(MagnifyingGlass, {
  position: 'absolute',
  right: 10,
  top: 10,
  bottom: 10,

  // color: '#303F73',
  // '&:not(input:focus)': {
  //   color: '#303F73',
  // },
})
