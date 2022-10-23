// nav -----------------------------------------------------------------------

export type NavItemWithHref = {
  text: string
  href: string
  activeMatch?: RegExp
}

export type NavItemChildren = {
  text?: string
  items: NavItemWithHref[]
}

export interface NavItemWithChildren {
  text: string
  items: (NavItemChildren | NavItemWithHref)[]
}

export type NavItem = NavItemWithHref | NavItemWithChildren

// sidebar -------------------------------------------------------------------

export interface SidebarItem {
  text: string
  link: string
}

export interface SidebarGroup {
  text: string
  items: SidebarItem[]
  collapsible?: boolean
  isCollapsed?: boolean
}

export interface SidebarMulti {
  [path: string]: SidebarGroup[]
}

export type Sidebar = SidebarGroup[] | SidebarMulti

// edit link -----------------------------------------------------------------

export interface EditLink {
  repo: string
  branch?: string
  dir?: string
  text?: string
}

// social link ---------------------------------------------------------------

export type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'slack'
  | 'twitter'
  | 'youtube'

export interface SocialLink {
  icon: SocialLinkIcon
  link: string
}
// friends link ---------------------------------------------------------------

export interface FriendLink {
  name: string
  avatar: string
  desc: string
  link: string
}

// VRThemeConfig ----------------------------------------------------------------

export interface SiteConfig {
  logo: string
  description: string
  author: string
  siteTitle: string | false
  nav: NavItem[]
  socialLinks: SocialLink[]
  friendLinks: FriendLink[]
  projects: [
    {
      category: string
      items: {
        icon: string
        name: string
        desc?: string
        preview?: string
        repo?: string
      }[]
    },
  ]
}
