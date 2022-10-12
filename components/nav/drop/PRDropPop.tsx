import type { NavItemChildren, NavItemWithHref } from '../../../types/site.type'
import PRDropGroup from './PRDropGroup'
import PRDropItem from './PRDropItem'
import cn from 'classnames'
import styled from '@emotion/styled'

type Props = {
  items: (NavItemChildren | NavItemWithHref)[]
  className?: any
  onClick?: () => void
}

const PRDropPopStyled = styled.ul`
  position: absolute;
  display: block;
  min-width: 150px;
  padding: var(--u-gap);
  top: calc(100% + var(--u-gap) / 1.5);
  right: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(calc(var(--u-gap) * -0.5));
  background-color: var(--c-bg);
  border: 2px solid var(--c-text-1);
  line-height: 100%;
  border-radius: 5px;
  z-index: 1;

  transition: opacity calc(var(--u-dur) / 2), visibility calc(var(--u-dur) / 2), transform calc(var(--u-dur) / 2),
    background-color var(--u-dur);
`

export default function PRDropPop({ items, className, onClick }: Props) {
  const onClickProp = onClick ?? (() => {})

  return (
    <PRDropPopStyled className={cn('PRDropPop', 'ResetList')} onClick={onClickProp}>
      {items.map((item) => (
        <li key={JSON.stringify(item)}>
          {'items' in item ? (
            <PRDropGroup items={item.items} label={item.text} />
          ) : (
            <PRDropItem>{item.text}</PRDropItem>
          )}
        </li>
      ))}
    </PRDropPopStyled>
  )
}
