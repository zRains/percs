import PRNavContainer from './nav/PRNavContainer'
import Styles from './PRHeader.module.scss'
import styled from '@emotion/styled'

const PRHeaderStyled = styled.header`
  position: relative;
  height: calc(var(--header-height) + var(--u-gap) * 2);

  .HeaderContainer {
    box-sizing: content-box;
    margin: 0 auto;
    vertical-align: middle;
    padding: var(--u-gap) calc(var(--u-gap) * 2);
    max-width: var(--content-max-width);
  }
`

export default function PRHeader() {
  return (
    <PRHeaderStyled>
      <div className="HeaderContainer">
        <PRNavContainer />
      </div>
    </PRHeaderStyled>
  )
}
