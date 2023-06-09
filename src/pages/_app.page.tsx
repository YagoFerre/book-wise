/* eslint-disable camelcase */
import type { AppProps } from 'next/app'
import { Nunito_Sans } from 'next/font/google'

import { globalStyles } from '../styles/global'

globalStyles()

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nunito.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
