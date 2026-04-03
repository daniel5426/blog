import * as React from 'react'
import { Button } from '@/components/ui/button'
import { palettes, applyPalette } from '@/lib/palettes'
import { cn } from '@/lib/utils'

type PaletteSelectorProps = {
  dropUp?: boolean
}

export function PaletteSelector({ dropUp = false }: PaletteSelectorProps) {
  const defaultPaletteId = 8
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedPalette, setSelectedPalette] = React.useState<number | null>(
    null,
  )
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const stored = localStorage.getItem('palette')
    const parsedPaletteId = stored ? parseInt(stored, 10) : NaN
    const paletteId = palettes.find((p) => p.id === parsedPaletteId)
      ? parsedPaletteId
      : defaultPaletteId

    setSelectedPalette(paletteId)
    applyPalette(paletteId)
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
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        title="Color palette"
        className="-my-2 -me-2 size-8"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Color palette"
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
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
          />
        </svg>
        <span className="sr-only">Color palette</span>
      </Button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 z-50 max-h-[min(28rem,calc(100vh-5rem))] w-80 overflow-y-auto rounded-md border bg-background shadow-lg',
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          <div className="p-2">
            <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Color palette
            </div>
            {palettes.map((palette) => (
              <button
                key={palette.id}
                type="button"
                onClick={() => {
                  handlePaletteSelect(palette.id)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full rounded-sm px-2 py-1.5 text-left text-sm transition-colors',
                  'hover:bg-muted focus:bg-muted focus:outline-none',
                  selectedPalette === palette.id && 'bg-muted font-medium',
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
