import styled from '@emotion/styled'
import dayjs from 'dayjs'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import MdContent from '../../components/md/MdContent'
import PRPageBanner from '../../components/PRPageBanner'
import PRMainHeaderLayout from '../../layouts/PRMainHeaderLayout'
import { mdx } from '../../utils/mdx'
import rehypeMeta from '../../utils/rehypeMeta'
import { NextPageWithLayout } from '../_app'
import cn from 'classnames'

type Props = {
  notes: {
    slug: string
    path: string
    content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>
    frontmatter: Record<string, any>
  }[]
}

const NotesIndexStyled = styled.ul`
  margin: 0;
  padding: 0;

  .NoteItem {
    list-style: none;

    .NoteTitle {
      text-decoration: none;
      color: inherit;
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 30px;
    }

    .NoteInfo {
      margin-bottom: 20px;
      color: var(--c-text-2);
      font-size: 0.95rem;
    }

    &:not(:last-child) {
      margin-bottom: calc(var(--u-gap) * 3);
      padding-bottom: calc(var(--u-gap) * 2);
      border-bottom: 1px solid var(--c-divider-light);
    }

    &.active {
      .NoteTitle {
        color: var(--c-green);
      }
    }
  }
`

const NoteSearchContainerStyled = styled.div`
  display: flex;
  margin-bottom: calc(var(--u-gap) * 3);

  .SearchBanner {
    height: 24px;
    line-height: 24px;
    color: var(--c-text-2);

    svg {
      height: 1.1rem;
      width: 1.1rem;
      margin-right: calc(var(--u-gap) * 0.5);
      vertical-align: -0.15rem;
    }
  }

  input {
    margin-left: var(--u-gap);
    height: 24px;
    line-height: 24px;
    width: 120px;
    outline: none;
    border: none;
    font-family: var(--f-slab);
    border-bottom: 1.5px solid var(--c-text-2);
    background-color: transparent;
  }
`

const NoteLoadMoreStyled = styled.div`
  display: flex;
  margin-top: 2rem;

  span {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    color: var(--c-text-2);
    cursor: pointer;

    svg {
      margin-right: calc(var(--u-gap) * 0.5);
      vertical-align: -0.15rem;
      width: 1rem;
      height: 1rem;
    }

    &::after {
      position: absolute;
      content: '';
      left: 0;
      bottom: 1px;
      height: 1.5px;
      width: 100%;
      background-color: var(--c-text-2);
      opacity: 0;
      visibility: hidden;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }
`

const NotesIndexPage: NextPageWithLayout<Props> = ({ notes }) => {
  const router = useRouter()
  const [hash, setHash] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [myNotes, setMyNotes] = useState(notes)
  const [page, setPage] = useState(1)
  const pageSize = 4

  useEffect(() => {
    const routerHashArr = router.asPath.split('#')

    if (routerHashArr.length > 1) {
      const currentHash = routerHashArr.pop()!
      const targetNoteIndex = notes.map((note) => note.slug).indexOf(currentHash)

      if (targetNoteIndex !== -1) {
        setPage(Math.ceil((targetNoteIndex + 1) / pageSize))
        setHash(currentHash)
      }
    }
  }, [notes, router.asPath])

  return (
    <>
      <Head>
        <title>zRain | Notes</title>
      </Head>
      <PRPageBanner title="Notes" desc="Short notes, maybe I don't want to write so much 📝." />
      <NoteSearchContainerStyled>
        <div className="SearchBanner">
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M12 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v4.5" />
              <circle cx="16.5" cy="17.5" r="2.5" />
              <path d="M18.5 19.5L21 22" />
            </g>
          </svg>
          <span>Search title: </span>
        </div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => {
            const currentSearchVal = e.target.value

            setSearchVal(currentSearchVal)
            setPage(1)
            setMyNotes(() => {
              return notes.filter((note) =>
                note.frontmatter.title.toLowerCase().includes(currentSearchVal.toLowerCase()),
              )
            })
          }}
        />
      </NoteSearchContainerStyled>
      <NotesIndexStyled>
        {myNotes.slice(0, pageSize * page).map((note) => {
          return (
            <li className={cn(['NoteItem', { active: hash === note.slug }])} key={note.slug}>
              <Link className="NoteTitle ClearMP" href={`#${note.slug}`} id={note.slug}>
                {note.frontmatter.title}
              </Link>
              <p className="NoteInfo ClearMP">{dayjs(note.frontmatter.date as number).format('MMMM D, YYYY')}</p>
              <MdContent source={note.content} />
            </li>
          )
        })}
      </NotesIndexStyled>
      <NoteLoadMoreStyled>
        <span onClick={() => setPage((prePage) => prePage + 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M19.933 13.041a8 8 0 1 1-9.925-8.788C13.907 3.251 17.943 5.26 19.433 9" />
              <path d="M20 4v5h-5" />
            </g>
          </svg>
          Load more notes
        </span>
      </NoteLoadMoreStyled>
    </>
  )
}

NotesIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <PRMainHeaderLayout>{page}</PRMainHeaderLayout>
}

export default NotesIndexPage

export async function getStaticProps() {
  const { getAllMdx } = mdx('notes')
  const notes = getAllMdx(true).sort((p1, p2) => p2.frontmatter.date - p1.frontmatter.date)

  const serializedNotes = await Promise.all(
    notes.map(async (note) => ({
      ...note,
      content: await serialize(note.content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeMeta, rehypeHighlight],
        },
      }),
    })),
  )

  return {
    props: {
      notes: serializedNotes,
    },
  }
}
