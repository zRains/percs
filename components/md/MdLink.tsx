import Link from 'next/link'

export default function MdLink({ children, href = '' }: JSX.IntrinsicElements['a']) {
  return (
    <Link href={href} prefetch={false} className="MdLink" target={'_blank'}>
      {children}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1rem"
        height="1rem"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        {/^[a-z]+:/i.test(href) ? (
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5m-7 1L20 4m-5 0h5v5"
          />
        ) : (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M4 21v-4a3 3 0 0 1 3-3h5" />
            <path d="m9 17l3-3l-3-3m5-8v4a1 1 0 0 0 1 1h4" />
            <path d="M5 11V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H7.5" />
          </g>
        )}
      </svg>
    </Link>
  )
}
