import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Daniel Benassayag',
  description: 'Tech blog and thoughts',
  href: 'https://dbenassayag.xyz',
  author: 'daniel-benassayag',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'authors',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://x.com/DBenassaya',
    label: 'Twitter',
  },
  {
    href: 'mailto:danielbenassaya2626@gmail.com',
    label: 'Email',
  },
  {
    href: 'https://dbenassayag.xyz',
    label: 'Website',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
