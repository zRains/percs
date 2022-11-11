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
    <Link
      className={cn(className)}
      href={href}
      target={isExternalUrl ? '_blank' : undefined}
      rel={isExternalUrl ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  ) : (
    <span className={cn(className)}>{children}</span>
  )
}
