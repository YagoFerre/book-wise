import { styled } from '@/stitches.config'

import Image from 'next/image'

export const UserImage = styled(Image, {
  border: '1px solid',
  backgroundImage: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
  borderRadius: '$full',

  cursor: 'pointer',
})
