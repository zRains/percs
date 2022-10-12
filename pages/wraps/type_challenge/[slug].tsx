import styled from '@emotion/styled'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import type { ReactElement } from 'react'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import PRMainHeaderLayout from '../../../layouts/PRMainHeaderLayout'
import { mdx } from '../../../utils/mdx'
import rehypeMeta from '../../../utils/rehypeMeta'
import { NextPageWithLayout } from '../../_app'

// Transformers
import MdContent from '../../../components/md/MdContent'
import { useRouter } from 'next/router'

type Props = {
  post: {
    source: MDXRemoteSerializeResult
    frontmatter: {
      [key: string]: any
    }
  }
}

const WarpPageContainerStyled = styled.article`
  max-width: var(--content-max-width);

  .WrapTopHeader {
    margin-bottom: 20px;

    .WrapGoBack {
      position: relative;
      display: inline-block;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;

      svg {
        margin-right: calc(var(--u-gap) * 0.5);
        vertical-align: -0.18em;
        width: 1.2rem;
        height: 1.2rem;
      }

      &::after {
        position: absolute;
        content: '';
        left: 0;
        bottom: 0;
        height: 2px;
        width: 100%;
        background-color: transparent;
      }

      &:hover::after {
        background-color: var(--c-text-1);
      }
    }
  }
`

const WarpPage: NextPageWithLayout<Props> = ({ post: { source, frontmatter } }) => {
  const router = useRouter()

  return (
    <WarpPageContainerStyled>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <div className="WrapTopHeader">
        <div className="WrapGoBack" onClick={router.back}>
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="m9 11l-4 4l4 4m-4-4h11a4 4 0 0 0 0-8h-1"
            />
          </svg>
          Go Back
        </div>
      </div>

      <MdContent source={source} />
    </WarpPageContainerStyled>
  )
}

WarpPage.getLayout = function getLayout(page: ReactElement) {
  return <PRMainHeaderLayout>{page}</PRMainHeaderLayout>
}

export default WarpPage

export function getStaticPaths() {
  const { getAllSlug } = mdx('wraps/type_challenge')
  const paths = getAllSlug().map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string; [key: string]: string } }) {
  const { getMdxFromSlug } = mdx('wraps/type_challenge')
  const { slug } = params
  const { content, frontmatter } = getMdxFromSlug(slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeMeta, rehypeHighlight, rehypeSlug],
    },
  })

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  }
}
