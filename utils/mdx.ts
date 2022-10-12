import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { sync } from 'glob'

export function mdx(category: string) {
  const mdxPath = path.join(process.cwd(), `data/${category}`)
  const mdxMap: Map<string, string> = new Map()

  // init mdx category
  sync(`${mdxPath}/*.mdx`).forEach((path) => {
    const [slug, _extension] = path.split('/').pop()!.split('.')

    mdxMap.set(slug, path)
  })

  function getMdxFromSlug(slug: string) {
    const source = fs.readFileSync(mdxMap.get(slug)!, { encoding: 'utf-8' })
    const { content, data } = matter(source)

    return {
      content,
      frontmatter: data,
    }
  }

  function getAllSlug() {
    return Array.from(mdxMap.keys())
  }

  function getAllMdx(includeContent: boolean = false) {
    const result: { slug: string; path: string; content: string; frontmatter: Record<string, any> }[] = []
    mdxMap.forEach((path, slug) => {
      const source = fs.readFileSync(path, { encoding: 'utf-8' })
      const { content, data } = matter(source)
      result.push({
        slug,
        path,
        content: includeContent ? content : '',
        frontmatter: data,
      })
    })

    return result
  }

  return {
    getMdxFromSlug,
    getAllSlug,
    getAllMdx,
  }
}
