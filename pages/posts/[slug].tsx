import styled from '@emotion/styled'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import remarkEmbedder from '@remark-embedder/core'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import type { ReactElement } from 'react'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import PRMainHeaderLayout from '../../layouts/PRMainHeaderLayout'
import { mdx } from '../../utils/mdx'
import rehypeMeta from '../../utils/rehypeMeta'
import { NextPageWithLayout } from '../_app'

// Custom components
import ArcToCanvas from '../../demo/ArcToCanvas'
import BlobViewImg from '../../demo/BlobViewImg'
import CanvasBlur from '../../demo/CanvasBlur'
import DevicePixelRatio from '../../demo/DevicePixelRatio'
import FileReaderMethod from '../../demo/FileReaderMethod'
import VideoGif from '../../components/md/VideoGif'

// Transformers
import MdContent from '../../components/md/MdContent'
import codepenTransformer from '../../utils/transformers/codepen'
import codeSandboxTransformer from '../../utils/transformers/codeSandbox'

type Props = {
  post: {
    source: MDXRemoteSerializeResult
    frontmatter: {
      [key: string]: any
    }
  }
}

const PostContainerStyled = styled.article`
  max-width: var(--content-max-width);
`

const PostPage: NextPageWithLayout<Props> = ({ post: { source, frontmatter } }) => {
  return (
    <PostContainerStyled>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <MdContent
        mdxComponents={{ BlobViewImg, FileReaderMethod, CanvasBlur, DevicePixelRatio, ArcToCanvas, VideoGif }}
        source={source}
      />
    </PostContainerStyled>
  )
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <PRMainHeaderLayout>{page}</PRMainHeaderLayout>
}

export default PostPage

export function getStaticPaths() {
  const { getAllSlug } = mdx('posts')
  const paths = getAllSlug().map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string; [key: string]: string } }) {
  const { getMdxFromSlug } = mdx('posts')
  const { slug } = params
  const { content, frontmatter } = getMdxFromSlug(slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, [remarkEmbedder, { transformers: [codeSandboxTransformer, codepenTransformer] }]],
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
