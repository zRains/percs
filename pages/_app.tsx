import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

// Global Styles
import '../styles/global.scss'
import '../styles/code.scss'
import '../styles/nprogress.scss'
import dynamic from 'next/dynamic'
import PRFooter from '../components/PRFooter'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const PRTopProgressBar = dynamic(
  () => {
    return import('../components/PRTopProgressBar')
  },
  { ssr: false },
)

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <PRTopProgressBar />
      <Component {...pageProps} />
      <PRFooter />
    </>,
  )
}
