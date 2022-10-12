import styled from '@emotion/styled'

const PRFooterStyled = styled.footer`
  margin-top: 3rem;
  margin-bottom: 2rem;
  color: var(--c-text-2);
`

export default function PRFooter() {
  return <PRFooterStyled>&copy; {new Date().getFullYear()} zRain. All rights reserved.</PRFooterStyled>
}
