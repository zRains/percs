import type { NavItemWithHref } from '../../types/site.type'
import PRNavLink from './PRNavLink'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { useEffect, useState } from 'react'

type Props = {
  item: NavItemWithHref
  className: any
}

const PRNavMenuLinkStyled = styled(PRNavLink)`
  color: inherit;
  text-decoration: none;

  span {
    font-weight: 700;
    display: inline-block;
    height: 20px;
    line-height: 20px;
  }

  &:hover span,
  &.active span {
    text-decoration: underline;
  }
`

export default function PRNavMenuLink({ item, className }: Props) {
  const router = useRouter()
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(router.asPath)
  }, [router.asPath])

  return (
    <PRNavMenuLinkStyled className={cn([className, { active: path === item.href }])} href={item.href}>
      <span>{item.text}</span>
    </PRNavMenuLinkStyled>
  )
}
