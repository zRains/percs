import { visit } from 'unist-util-visit'

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

function rehypeMeta() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      let match

      if (node.tagName === 'code' && node.data && node.data.meta) {
        re.lastIndex = 0
        while ((match = re.exec(node.data.meta))) {
          node.properties[match[1]] = match[2] || match[3] || match[4] || 1
        }
      }
    })
  }
}

export default rehypeMeta
