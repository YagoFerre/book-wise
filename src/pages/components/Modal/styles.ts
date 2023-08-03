import { styled } from '@/stitches.config'

import * as Dialog from '@radix-ui/react-dialog'

export const Root = styled(Dialog.Root, {})

export const Portal = styled(Dialog.Portal, {})

export const Overlay = styled(Dialog.Overlay, {
  background: 'rgba(0, 0, 0, 0.6)',
  position: 'fixed',
  inset: 0,
})

export const Content = styled(Dialog.Content, {
  width: '41.25rem',
  background: '$gray800',
  position: 'fixed',
  right: '0px',
  top: '0px',
  bottom: '0px',
  overflowY: 'scroll',

  '&::-webkit-scrollbar': {
    width: '6px',
  },

  '&::-webkit-scrollbar-track-piece': {
    background: '$gray700',
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: '$full',
    background: '$gray600',
  },

  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.5)',
})

export const Close = styled(Dialog.Close, {
  background: 'transparent',
  display: 'flex',
  width: '100%',

  marginBottom: '$6',
  justifyContent: 'end',
})

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: '35.25rem',

  margin: '$6 auto',

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Comments = styled('div', {
  display: 'flex',
  width: '100%',
  marginTop: '$10',
  flexDirection: 'column',

  gap: '$3',
})

export const CommentsHeader = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})

export const Title = styled('p', {
  color: '$gray200',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',
})

export const CommentBox = styled('form', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',

  padding: '$6',
  borderRadius: '8px',

  background: '$gray700',
})

export const Header = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '$4',

  alignItems: 'center',
})

export const Username = styled('p', {
  flex: 1,
  color: '$gray100',
  fontSize: '$md',
  fontWeight: '$bold',
  lineHeight: '$short',
})

export const Rating = styled('div', {
  display: 'flex',
  gap: '$1',
})

export const TextInput = styled('textarea', {
  height: '10.25rem',
  margin: '$6 0 $3 0',
  padding: '14px $5',
  background: '$gray800',

  border: '1px solid $gray500',
  borderRadius: '$sm',

  resize: 'none',

  color: '$gray200',
  fontFamily: '$default',
  fontSize: '$sm',
  fontWeight: '$regular',
  lineHeight: '$base',

  '&:focus': {
    outline: 0,
    borderColor: '$green200',
  },
})

export const Actions = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  gap: '$2',
})

export const ButtonIcon = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$2',
  borderRadius: '$sm',

  background: '$gray600',

  '&:hover': {
    background: '$gray500',
  },
})
