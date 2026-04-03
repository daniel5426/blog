export type UiStyleItem = {
  id: string
  name: string
  description: string
}

const STORAGE_KEY = 'uiStyle'

export class UiStyleCatalog {
  static readonly items: UiStyleItem[] = [
    {
      id: 'geist',
      name: 'Default',
      description: 'Geist variable fonts, crisp and neutral.',
    },
    {
      id: 'darkroom',
      name: 'Darkroom',
      description: 'Safelight glow, film grain, content develops in.',
    },
    {
      id: 'manuscript',
      name: 'Manuscript',
      description: 'Pinned notes on ruled paper, handwritten headings.',
    },
    {
      id: 'glass',
      name: 'Glass',
      description: 'Frosted panels over drifting color orbs.',
    },
    {
      id: 'brutalist',
      name: 'Brutalist',
      description: 'Raw concrete, thick borders, glitch hover.',
    },
    {
      id: 'vapor',
      name: 'Vapor',
      description: 'CRT scan lines, chromatic split, phosphor glow.',
    },
    {
      id: 'ink',
      name: 'Ink',
      description: 'No borders. Serif body, weight hierarchy, pure reading.',
    },
    {
      id: 'whisper',
      name: 'Whisper',
      description: 'Barely-there. Ultra-light type, content fades in on scroll.',
    },
    {
      id: 'letterform',
      name: 'Letterform',
      description: 'One typeface, tight grid, typographic rhythm only.',
    },
  ]

  static isValidId(id: string): boolean {
    return this.items.some((s) => s.id === id)
  }

  static apply(id: string): void {
    if (typeof window === 'undefined') return
    if (!this.isValidId(id)) return
    document.documentElement.setAttribute('data-ui-style', id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  static init(): void {
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem(STORAGE_KEY)
    const id = raw && this.isValidId(raw) ? raw : 'geist'
    document.documentElement.setAttribute('data-ui-style', id)
  }

  static getSelectedId(): string {
    if (typeof window === 'undefined') return 'geist'
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw && this.isValidId(raw) ? raw : 'geist'
  }

  static readonly storageKey = STORAGE_KEY
}
