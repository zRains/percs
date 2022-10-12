import styled from '@emotion/styled'
import { SITE_CONFIG } from '../../config'
import PRDrop from './drop/PRDrop'
import PRNavMenuLink from './PRNavMenuLink'

const PRNavMenuStyled = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;

  & > .PRNavMenuItem:not(:last-child) {
    margin-right: calc(var(--u-gap) * 2);
  }
`

export default function PRNavMenu() {
  return (
    <PRNavMenuStyled>
      {SITE_CONFIG.nav.map((nav) => {
        return 'href' in nav ? (
          <PRNavMenuLink className="PRNavMenuItem" item={nav} key={nav.text} />
        ) : (
          <PRDrop className="PRNavMenuItem" items={nav.items} clickToClose trigger={'click'} key={nav.text}>
            {nav.text}
          </PRDrop>
        )
      })}
    </PRNavMenuStyled>
  )
}
