import type { SiteConfig } from './types/site.type'

export const SITE_CONFIG: SiteConfig = {
  logo: '/avatar.png',
  description: '一个以前端为兴趣的学生党的博客。路漫漫其修远兮，吾将上下而摸鱼。',
  author: 'zRain',
  siteTitle: "Hi 👋, I'm zRain",
  nav: [
    { text: 'Posts', href: '/posts' },
    { text: 'Notes', href: '/notes' },
    { text: 'Projects', href: '/projects' },
    {
      text: 'Wrap',
      items: [
        {
          items: [
            {
              text: 'Type challenge',
              href: '/wraps/type_challenge',
            },
            {
              text: 'Sword to offer',
              href: '/wraps/sword_to_offer',
            },
            {
              text: 'Code snippets',
              href: '/wraps/code_snippet',
            },
          ],
        },
      ],
    },
  ],
  socialLinks: [],
  friendLinks: [],
  projects: [
    {
      category: 'Tools',
      items: [
        {
          icon: '/project/gradientor.svg',
          name: 'Gradientor',
          desc: 'Viewing and selecting gradients',
          repo: 'https://github.com/zRains/Gradientor',
          preview: 'https://gradientors.netlify.app/',
        },
        {
          icon: '/project/count1024.svg',
          name: 'Count1024',
          desc: 'Calculate the probability of all 1024 combinations',
          repo: 'https://github.com/zRains/count1024',
          preview: 'https://count1024.vercel.app/',
        },
      ],
    },
  ],
}
