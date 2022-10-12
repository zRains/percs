import styled from '@emotion/styled'
import Image from 'next/image'
import type { ReactElement } from 'react'
import PRMainHeaderLayout from '../layouts/PRMainHeaderLayout'
import type { NextPageWithLayout } from './_app'

const AboutMeStyled = styled.div`
  padding: 2rem 0;
`

const StrongStyled = styled.span`
  font-weight: 700;
`

const Page: NextPageWithLayout = () => {
  return (
    <AboutMeStyled>
      <p>
        Hey, I am <StrongStyled>zRain</StrongStyled>, a fanatical frontend developer. Studying at CUIT.
      </p>
      <Image
        src={'/about.svg'}
        style={{ filter: 'invert(var(--md-image-invert))' }}
        height={525}
        width={700}
        alt={'about'}
      />
    </AboutMeStyled>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <PRMainHeaderLayout>{page}</PRMainHeaderLayout>
}

export default Page
