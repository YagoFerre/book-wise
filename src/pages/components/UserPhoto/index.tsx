import { ImageProps, StaticImageData } from 'next/image'

import { UserImage } from './styles'

interface Props extends ImageProps {
  src: StaticImageData
  size: number
  alt: string
}

export function UserPhoto({ src, size, alt, ...rest }: Props) {
  return <UserImage src={src} alt={alt} quality={100} width={size} height={size} {...rest} />
}
