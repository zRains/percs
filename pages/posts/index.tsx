import styled from '@emotion/styled'
import dayjs from 'dayjs'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import PRPageBanner from '../../components/PRPageBanner'
import PRMainHeaderLayout from '../../layouts/PRMainHeaderLayout'
import { mdx } from '../../utils/mdx'
import { NextPageWithLayout } from '../_app'

type Props = {
  posts: {
    slug: string
    path: string
    frontmatter: Record<string, any>
  }[]
}

const PostsIndexStyled = styled.ul`
  .PostItem {
    .PostItemLink {
      display: inline-block;
      color: inherit;
      text-decoration: none;

      .PostTitle {
        font-size: 1.1rem;
        font-weight: 700;
        line-height: 30px;
        cursor: pointer;
      }

      &:hover .PostTitle {
        text-decoration: underline;
      }
    }

    .PostInfo {
      color: var(--c-text-2);
      font-size: 0.95rem;
    }

    &:not(:last-child) {
      margin-bottom: calc(var(--u-gap) * 3);
    }
  }
`

const PostSearchContainerStyled = styled.div`
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

const PostLoadMoreStyled = styled.div`
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

const PostsIndexPage: NextPageWithLayout<Props> = ({ posts }) => {
  const [myPosts, setMyPosts] = useState(posts)
  const [page, setPage] = useState(1)
  const pageSize = 6

  return (
    <>
      <Head>
        <title>zRain | Posts</title>
      </Head>
      <PRPageBanner title="Posts" desc="Heard a lot of truth, but still can't remember 😕." />
      <PostSearchContainerStyled>
        <div className="SearchBanner">
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <circle cx="15" cy="15" r="4" />
              <path d="M18.5 18.5L21 21M4 6h16M4 12h4m-4 6h4" />
            </g>
          </svg>
          <span>Search title: </span>
        </div>
        <input
          type="text"
          onChange={(e) => {
            setPage(1)
            setMyPosts(
              posts.filter((post) => post.frontmatter.title.toLowerCase().includes(e.target.value.toLowerCase())),
            )
          }}
        />
      </PostSearchContainerStyled>
      <PostsIndexStyled className="ResetList">
        {myPosts.slice(0, pageSize * page).map((post) => {
          return (
            <li className="PostItem" key={post.slug}>
              <Link className="PostItemLink" href={`/posts/${post.slug}`}>
                <h3 className="PostTitle ClearMP">{post.frontmatter.title}</h3>
              </Link>
              <p className="PostInfo ClearMP">
                {dayjs(post.frontmatter.date as number).format('MMMM D, YYYY')}
                &emsp;
                {(post.frontmatter.scope as string[]).join('/')}
              </p>
            </li>
          )
        })}
      </PostsIndexStyled>
      <PostLoadMoreStyled>
        <span onClick={() => setPage((prePage) => prePage + 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M19.933 13.041a8 8 0 1 1-9.925-8.788C13.907 3.251 17.943 5.26 19.433 9" />
              <path d="M20 4v5h-5" />
            </g>
          </svg>
          Load more posts
        </span>
      </PostLoadMoreStyled>
    </>
  )
}

PostsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <PRMainHeaderLayout>{page}</PRMainHeaderLayout>
}

export default PostsIndexPage

export function getStaticProps() {
  const { getAllMdx } = mdx('posts')
  const posts = getAllMdx()
    .filter((post) => post.frontmatter.visible)
    .sort((p1, p2) => p2.frontmatter.date - p1.frontmatter.date)

  return {
    props: {
      posts,
    },
  }
}
