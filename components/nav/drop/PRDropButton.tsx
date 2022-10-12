import styled from '@emotion/styled'
import cn from 'classnames'
import type { ReactElement } from 'react'

type Props = {
  children: ReactElement | string
  onClick?: () => void
  className: any
  ariaHaspopup?: boolean
  ariaLabel?: string
  ariaExpanded?: boolean
}

const PRDropButtonStyled = styled.div`
  position: relative;
  padding: 0;
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  text-align: left;
  transition: background-color calc(var(--u-dur) / 2);
  user-select: none;
  cursor: pointer;
`

export default function PRDropButton({ children, className, ariaHaspopup, ariaLabel, ariaExpanded, onClick }: Props) {
  const onClickProp = onClick ?? (() => {})

  return (
    <PRDropButtonStyled
      aria-haspopup={ariaHaspopup}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      className={cn(className)}
      onClick={onClickProp}
    >
      {children}
    </PRDropButtonStyled>
  )
}
