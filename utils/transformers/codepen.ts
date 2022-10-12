import type { Transformer } from '@remark-embedder/core'

const codepenTransformer: Transformer = {
  name: 'Codepen',
  shouldTransform(url: string) {
    const { host, pathname } = new URL(url)

    return ['codepen.io', 'www.codepen.io'].includes(host) && pathname.includes('/pen/')
  },

  getHTML(url: string) {
    const iframeUrl = url.replace('/pen/', '/embed/')

    return `<iframe src="${iframeUrl}?default-tab=result" style="height: 500px;width: 100%;" scrolling="no" frameborder="no" loading="lazy"></iframe>`
  },
}

export default codepenTransformer
