import styled from '@emotion/styled'
import cn from 'classnames'
import Link from 'next/link'
import type { NavItemWithHref } from '../../../types/site.type'
import PRDropItem from './PRDropItem'

type Props = {
  label?: string
  items: NavItemWithHref[]
}

const PRDropGroupStyled = styled.div`
  .GroupLabel {
    user-select: none;
    margin: var(--u-gap) 0;
    font-family: var(--f-r);
    font-size: 0.85rem;
    color: var(--c-text-2);
  }

  &.hasLabel .PRDropItem {
    padding: var(--u-gap) calc(var(--u-gap) * 2);
  }
`

export default function PRDropGroupItem({ label, items }: Props) {
  return (
    <PRDropGroupStyled className={cn([{ hasLabel: Boolean(label) }])}>
      {label && <div className="GroupLabel">{label}</div>}
      <ul className="ResetList">
        {items.map((item) => (
          <li className="GroupItem" key={JSON.stringify(item)}>
            <PRDropItem>
              <Link href={item.href}>{item.text}</Link>
            </PRDropItem>
          </li>
        ))}
      </ul>
    </PRDropGroupStyled>
  )
}
