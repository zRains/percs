import styled from '@emotion/styled'
import { ReactElement, useEffect } from 'react'
import { useRef, useState } from 'react'
import type { NavItemChildren, NavItemWithHref } from '../../../types/site.type'
import PRDropButton from './PRDropButton'
import PRDropPop from './PRDropPop'

type Props = {
  children: ReactElement | string
  items: (NavItemChildren | NavItemWithHref)[]
  className: any
  trigger?: 'click' | 'hover'
  clickToClose?: boolean
}

const PRDropStyled = styled.div`
  position: relative;

  .Trigger {
    font-weight: 700;

    .TriggerIcon {
      vertical-align: -0.125em;
      width: 1rem;
      height: 1rem;
      transform: rotate(0);
      transition: transform ease-in-out calc(var(--u-dur) / 2);
    }

    &[aria-expanded='true'] {
      .TriggerIcon {
        transform: rotate(180deg);
      }

      & + .PRDropPop {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }
    }
  }
`

export default function PRDrop({ items, trigger, className, clickToClose, children }: Props) {
  const [isActivated, setIsActivated] = useState(false)
  const triggerProp = trigger ?? 'click'
  const clickToCloseProp = clickToClose ?? false
  const PRDropRef = useRef<HTMLDivElement>(null)

  function clickOutListener(event: MouseEvent) {
    const el = PRDropRef.current!

    if (event.target !== el && !event.composedPath().includes(el)) setIsActivated(false)
  }

  useEffect(() => {
    window.addEventListener('click', clickOutListener)

    return () => window.removeEventListener('click', clickOutListener)
  }, [])

  return (
    <PRDropStyled
      className={className}
      ref={PRDropRef}
      onMouseEnter={() => triggerProp === 'hover' && setIsActivated(true)}
      onMouseLeave={() => triggerProp === 'hover' && setIsActivated(false)}
    >
      <PRDropButton
        className="Trigger"
        ariaHaspopup
        aria-label={'ASDrop'}
        ariaExpanded={isActivated}
        onClick={() => setIsActivated(!isActivated)}
      >
        <>
          {children}
          <svg
            className="TriggerIcon"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="m6 9l6 6l6-6"
            />
          </svg>
        </>
      </PRDropButton>

      <PRDropPop items={items} onClick={() => clickToCloseProp && setIsActivated(!isActivated)} />
    </PRDropStyled>
  )
}
