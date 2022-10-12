import styled from '@emotion/styled'
import type { ReactElement } from 'react'
import PRDropButton from './PRDropButton'

type Props = {
  children: ReactElement | string
}

const PRDropItemStyled = styled(PRDropButton)`
  width: 100%;

  border-radius: 5px;
  font-family: var(--f-r);
  font-size: 0.95rem;
  white-space: nowrap;

  a {
    display: inline-block;
    padding: var(--u-gap);
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    background-color: var(--c-bg-mute);
  }
`

export default function PRDropItem({ children }: Props) {
  return <PRDropItemStyled className="PRDropItem">{children}</PRDropItemStyled>
}
