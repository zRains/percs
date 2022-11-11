import styled from '@emotion/styled'
import Link from 'next/link'
import { SITE_CONFIG } from '../../config'

const PRNavTitleStyled = styled.div`
  .NavTitleLogo {
    display: block;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    height: var(--header-height);
    width: var(--header-height);
    border-radius: 5px;
  }
`

export default function PRNavTitle() {
  return (
    <PRNavTitleStyled>
      <Link className="NavTitleLogo" href={'/'} style={{ backgroundImage: `url('${SITE_CONFIG.logo}')` }} />
    </PRNavTitleStyled>
  )
}
