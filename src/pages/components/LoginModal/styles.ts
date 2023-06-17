import { styled } from '@/stitches.config'

import * as Dialog from '@radix-ui/react-dialog'

export const Root = styled(Dialog.Root, {})

export const Trigger = styled(Dialog.Trigger, {
  background: 'transparent',
})

export const FeedbackButton = styled('button', {
  color: '$purple100',
  fontWeight: '$bold',
  fontSize: '$md',
  lineHeight: '$base',
  background: 'transparent',

  padding: '$1 $2',
  borderRadius: '$sm',

  '&:hover': {
    background: 'rgba(131, 129, 217, 0.06)',
  },
})

export const Portal = styled(Dialog.Portal, {})

export const Overlay = styled(Dialog.Overlay, {
  background: 'rgba(0, 0, 0, 0.6)',
  position: 'fixed',
  inset: 0,
})

export const Content = styled(Dialog.Content, {
  width: '32.25rem',
  background: '$gray700',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  borderRadius: '12px',
})

export const Close = styled(Dialog.Close, {
  background: 'transparent',
  display: 'flex',
  width: '100%',

  padding: '$4 $4 0 0',
  justifyContent: 'end',
})

export const Container = styled('div', {
  display: 'flex',
  width: '100%',
  maxWidth: '35.25rem',

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 3.5rem 4.5rem',
})

export const ModalTitle = styled('p', {
  color: '$gray200',
  fontSize: '$md',
  fontWeight: '$bold',
  lineHeight: '$short',
  marginBottom: '$10',
  marginTop: '$5',
  textAlign: 'center',
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '$4',
})

export const Button = styled('button', {
  width: '100%',
  background: '$gray600',
  padding: '$5',

  display: 'flex',
  alignItems: 'center',

  color: '$gray200',
  fontSize: '$lg',
  fontWeight: '$medium',
  lineHeight: '$base',

  gap: '$5',

  '&:hover': {
    background: '$gray500',
  },
})
