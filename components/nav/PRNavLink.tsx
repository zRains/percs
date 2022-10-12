import cn from 'classnames'
import type { ReactElement } from 'react'
import Link from 'next/link'

type Props = {
  children: ReactElement | string
  href?: string
  className: any
}

export default function PRNavLink({ href, className, children }: Props) {
  const isExternalUrl = href ? /^[a-z]+:/i.test(href) : false

  return href ? (
    <Link href={href}>
      <a
        className={cn(className)}
        target={isExternalUrl ? '_blank' : undefined}
        rel={isExternalUrl ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    </Link>
  ) : (
    <span className={cn(className)}>{children}</span>
  )
}
