import styled from '@emotion/styled'
import { ReactElement } from 'react'
import PRHeader from '../components/PRHeader'

const PRMainHeaderLayoutStyled = styled.div`
  min-height: 100vh;

  .MainContainer {
    box-sizing: content-box;
    margin: 0 auto;
    padding: 2rem calc(var(--u-gap) * 2);
    flex-grow: 1;
    max-width: var(--content-max-width);
  }
`

export default function PRMainHeaderLayout({ children }: { children: ReactElement }) {
  return (
    <PRMainHeaderLayoutStyled>
      <PRHeader />
      <main className="MainContainer">{children}</main>
    </PRMainHeaderLayoutStyled>
  )
}
