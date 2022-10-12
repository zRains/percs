import { MDXProvider } from '@mdx-js/react'
import cn from 'classnames'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemote } from 'next-mdx-remote'
import Styles from '../../styles/markdown.module.scss'
import MdCode from './MdCode'
import MdImage from './MdImage'
import MdLink from './MdLink'

type Props = {
  mdxComponents?: React.ComponentProps<typeof MDXProvider>['components']
  source: MDXRemoteSerializeResult
}

export default function MdContent({ mdxComponents, source }: Props) {
  return (
    <div className={cn('PostMarkdownContent', Styles.PostMarkdownContent)}>
      <MDXProvider
        components={
          {
            pre: MdCode,
            img: MdImage,
            a: MdLink,
          } as any
        }
      >
        <MDXRemote {...source} components={mdxComponents} />
      </MDXProvider>
    </div>
  )
}
