import * as React from 'react'
import { Button } from '@/components/ui/button'
import { palettes, applyPalette, initPalette } from '@/lib/palettes'
import { cn } from '@/lib/utils'

export function PaletteSelector() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedPalette, setSelectedPalette] = React.useState<number | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const stored = localStorage.getItem('palette')
    const paletteId = stored ? parseInt(stored, 10) : null
    if (paletteId && palettes.find((p) => p.id === paletteId)) {
      setSelectedPalette(paletteId)
      initPalette()
    }
  }, [])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  React.useEffect(() => {
    function handleThemeChange() {
      if (selectedPalette) {
        applyPalette(selectedPalette)
      }
    }

    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [selectedPalette])

  function handlePaletteSelect(paletteId: number) {
    setSelectedPalette(paletteId)
    applyPalette(paletteId)
    setIsOpen(false)
  }

  const currentPalette = selectedPalette
    ? palettes.find((p) => p.id === selectedPalette)
    : null

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        title="Select color palette"
        className="-my-2 -me-2 size-8"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select color palette"
        aria-expanded={isOpen}
      >
        <svg
          className="size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <span className="sr-only">Select color palette</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border bg-background shadow-lg">
          <div className="max-h-96 overflow-y-auto p-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Color Palettes
            </div>
            {palettes.map((palette) => (
              <button
                key={palette.id}
                onClick={() => handlePaletteSelect(palette.id)}
                className={cn(
                  'w-full rounded-sm px-2 py-1.5 text-left text-sm transition-colors',
                  'hover:bg-muted focus:bg-muted focus:outline-none',
                  selectedPalette === palette.id && 'bg-muted font-medium'
                )}
              >
                <div className="font-medium">{palette.name}</div>
                <div className="text-xs text-muted-foreground">
                  {palette.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

