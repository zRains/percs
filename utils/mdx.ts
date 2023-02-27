import path from 'node:path'
import fs from 'node:fs'
import matter from 'gray-matter'

type BasicFileInfo = {
  path: string
  name: string
  ext: string
}

function traverseFile(dirPath: string, ext: string[], deep = Infinity, fileMap = new Map<string, BasicFileInfo>()) {
  if (deep <= 0) return fileMap

  const pathArr = fs.readdirSync(dirPath)

  pathArr.forEach((itemName) => {
    const currentItemPath = path.resolve(dirPath, itemName)
    const currentItemStat = fs.statSync(currentItemPath)

    if (currentItemStat.isDirectory()) {
      traverseFile(currentItemPath, ext, deep - 1, fileMap)
    } else {
      const itemExt = path.extname(itemName)

      ext.includes(itemExt) &&
        fileMap.set(itemName, {
          path: currentItemPath,
          name: itemName,
          ext: itemExt,
        })
    }
  })

  return fileMap
}

export function mdx(category: string) {
  const mdxMap = traverseFile(path.resolve(process.cwd(), `./data/${category}`), ['.md', '.mdx'])

  function getMdxFromSlug(slug: string) {
    const source = fs.readFileSync(mdxMap.get(slug)!.path)
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
    return Array.from(mdxMap.values()).map((file) => {
      const source = fs.readFileSync(file.path)
      const { content, data } = matter(source)

      return {
        slug: file.name,
        path: file.path,
        content: includeContent ? content : '',
        frontmatter: data,
      }
    })
  }

  return {
    getMdxFromSlug,
    getAllSlug,
    getAllMdx,
  }
}
