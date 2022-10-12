import styled from '@emotion/styled'
import { useState } from 'react'
import storage from '../../utils/storage'
import cn from 'classnames'

const PRNavAppearanceStyled = styled.button`
  --primary-color: var(--c-bg);
  --secondary-color: var(--c-text-1);
  --dark-mode-null: 20px;
  margin-left: calc(var(--u-gap) * 2);
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;

  .sun {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--dark-mode-null) + calc(var(--dark-mode-null) / 5));
    height: calc(var(--dark-mode-null) + calc(var(--dark-mode-null) / 5));
    transition: 400ms;
    border-radius: 50%;
  }

  .square,
  .square-1 {
    box-sizing: content-box;
    position: absolute;
    width: var(--dark-mode-null);
    height: var(--dark-mode-null);
    background-color: var(--secondary-color);
    border-radius: 3px;
    transition: transform, 600ms cubic-bezier(0.65, 1.71, 0.6, 1);
  }

  .square-1 {
    box-sizing: content-box;
    transform: rotate(-45deg);
  }

  .circle {
    box-sizing: content-box;
    width: calc(var(--dark-mode-null) * 4 / 5);
    height: calc(var(--dark-mode-null) * 4 / 5);
    background-color: var(--primary-color);
    border-radius: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .circle-1 {
    box-sizing: content-box;
    position: absolute;
    width: calc(var(--dark-mode-null) / 2);
    height: calc(var(--dark-mode-null) / 2);
    background-color: var(--c-text-1);
    border-radius: 50%;
    transition: transform, 400ms ease-out;
  }

  .circle-2 {
    box-sizing: content-box;
    position: absolute;
    width: calc(var(--dark-mode-null) * 7 / 10);
    height: calc(var(--dark-mode-null) * 7 / 10);
    border: calc(var(--dark-mode-null) / 10) solid var(--secondary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &.is-switched {
    .square {
      transform: rotate(135deg);
    }
    .square-1 {
      transform: rotate(90deg);
    }
    .circle-1 {
      transform: translateX(calc(var(--dark-mode-null) * 3 / -10)) scale(calc(7 / 5));
    }
  }
`

function setDark(isToDark: boolean) {
  document.documentElement.setAttribute('data-theme', isToDark ? 'dark' : 'light')
}

export default function PRNavAppearance() {
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const APPEARANCE_KEY = 'PR_APPEARANCE_KEY'
  let userPreference = storage.get(APPEARANCE_KEY) || 'auto'

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setIsDark(e.matches)
      setDark(e.matches)
    }
  }

  const [isDark, setIsDark] = useState(() => {
    let isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark'

    setDark(isDark)

    return isDark
  })

  function toggle() {
    setIsDark((prevIsDark) => {
      storage.set(APPEARANCE_KEY, !prevIsDark ? (query.matches ? 'auto' : 'dark') : query.matches ? 'light' : 'auto')
      setDark(!prevIsDark)

      return !prevIsDark
    })
  }

  return (
    <PRNavAppearanceStyled className={cn(['ClearMP', { 'is-switched': isDark }])} onClick={toggle}>
      <div className="sun">
        <div className="square"></div>
        <div className="square-1"></div>
        <div className="circle">
          <div className="circle-1"></div>
        </div>
        <div className="circle-2"></div>
      </div>
    </PRNavAppearanceStyled>
  )
}
