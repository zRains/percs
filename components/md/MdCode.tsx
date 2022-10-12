import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import cn from 'classnames'
import copy from 'copy-to-clipboard'

type CodeChildrenProps = {
  props: {
    className: string
    [key: string]: string
  }
}

const CodeInfoBarStyled = styled.div`
  position: relative;
  border-radius: 3px 3px 0 0;
  font-size: 0.8rem;
  font-family: var(--f-mono);
  color: var(--hljs-split-6);
  line-height: calc(var(--u-gap) * 4);
  border-bottom: 1px solid var(--c-divider-light);

  & > span {
    display: inline-block;
    padding: 0 calc(var(--u-gap) * 1.5);

    &.CodeLanguage {
      box-sizing: content-box;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      min-width: 32px;
      opacity: 1;
      visibility: visible;
      text-align: right;
      border-radius: 0 5px 0 0;
      background-color: var(--hljs-bg);
      transition: opacity var(--u-dur), visibility var(--u-dur), background-color var(--u-dur);
      cursor: default;
    }

    &.CopyCode {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      border-radius: 0 5px 0 0;
      background-color: var(--hljs-bg);
      transition: background-color var(--u-dur);
      cursor: pointer;

      &:hover {
        color: var(--c-text-1);
      }

      &.isSuccessCopy {
        color: var(--c-green);
      }
    }
  }

  &:hover .CodeLanguage {
    opacity: 0;
    visibility: hidden;
  }
`

function CopyCode() {
  const copyCodeRef = useRef<HTMLSpanElement>(null)
  const [isSuccessCopy, setIsSuccessCopy] = useState(false)

  return (
    <span
      className={cn(['CopyCode', { isSuccessCopy }])}
      ref={copyCodeRef}
      onClick={() => {
        const succeed = copy(copyCodeRef.current!.parentElement!.nextElementSibling!.textContent || '')
        if (succeed)
          setIsSuccessCopy(() => {
            setTimeout(() => setIsSuccessCopy(false), 3000)
            return true
          })
      }}
    >
      {isSuccessCopy ? 'Copied' : 'Copy'}
    </span>
  )
}

export default function MdCode({ children }: JSX.IntrinsicElements['pre'] & { children: CodeChildrenProps }) {
  if (children) {
    const languageRe = (children.props.className as string).match(/language-([^\s]+)/)
    const file = children.props.file || 'code snippet'
    const language = languageRe ? languageRe[1] : 'Unknown'

    return (
      <pre className="PRCodeBlock">
        <CodeInfoBarStyled>
          <span className="CodeFile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                verticalAlign: '-0.265em',
                marginRight: 'calc(var(--u-gap) * 0.5)',
              }}
              width="1rem"
              height="1rem"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <path d="m10 13l-1 2l1 2m4-4l1 2l-1 2" />
              </g>
            </svg>
            {file}
          </span>
          <CopyCode />
          <span className="CodeLanguage">{language}</span>
        </CodeInfoBarStyled>
        {children}
      </pre>
    )
  }

  return <pre>{children}</pre>
}
