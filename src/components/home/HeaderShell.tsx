import { useState, useRef, useEffect } from 'react'
import { Star, User, Menu, X } from 'lucide-react'
import craigslistLogo from '@/assets/craigslist-logo.png'
import { CombinedSearchBar } from '@/components/CombinedSearchBar'

interface HeaderShellProps {
  headerSearchQuery: string
  onSearchQueryChange: (query: string) => void
  locationLabel: string
  onLocationClick: () => void
  locationJustApplied?: boolean
  onLocationHighlightDismiss?: () => void
}

export function HeaderShell({
  headerSearchQuery,
  onSearchQueryChange,
  locationLabel,
  onLocationClick,
  locationJustApplied = false,
  onLocationHighlightDismiss,
}: HeaderShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const menuItems = [
    { label: 'post an ad', icon: null, onClick: () => console.log('[header] Post an ad clicked') },
    { label: 'favorites', icon: <Star size={16} />, onClick: () => console.log('[header] Favorites clicked') },
    { label: 'account', icon: <User size={16} />, onClick: () => console.log('[header] Account clicked') },
  ]

  return (
    <header
      data-testid="header-shell"
      className="w-full"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      <div className="w-full flex items-center gap-4" style={{ paddingTop: '16px', paddingBottom: '16px', boxSizing: 'border-box' }}>
        {/* Logo */}
        <div className="shrink-0" data-testid="header-logo-area" style={{ maxWidth: '117px' }}>
          <img
            src={craigslistLogo}
            alt="craigslist"
            className="block max-w-full h-auto"
            style={{ height: 'auto', width: 'auto' }}
          />
        </div>

        {/* Search bar: centered at desktop, fluid at mobile */}
        <div className="flex-1 flex justify-center min-w-0">
          <CombinedSearchBar
            searchQuery={headerSearchQuery}
            onSearchChange={onSearchQueryChange}
            locationLabel={locationLabel}
            onLocationClick={onLocationClick}
            locationJustApplied={locationJustApplied}
            onLocationHighlightDismiss={onLocationHighlightDismiss}
          />
        </div>

        {/* Desktop actions: post an ad + icon buttons */}
        <div
          className="header-actions-full shrink-0 items-center"
          data-testid="header-actions-area"
          style={{ gap: '16px' }}
        >
          <button
            type="button"
            data-testid="header-post-ad-button"
            className="relative flex items-center justify-center cursor-pointer border-none bg-transparent p-0 font-semibold"
            style={{
              lineHeight: 1,
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '14px',
              color: 'var(--color-text-primary)',
            }}
            onMouseEnter={(e) => {
              const bg = e.currentTarget.querySelector('.hover-bg') as HTMLElement
              if (bg) bg.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const bg = e.currentTarget.querySelector('.hover-bg') as HTMLElement
              if (bg) bg.style.opacity = '0'
            }}
            onClick={() => console.log('[header] Post an ad clicked')}
          >
            <span
              className="hover-bg absolute rounded-[36px]"
              style={{
                top: '-11px',
                right: '-8px',
                bottom: '-11px',
                left: '-16px',
                backgroundColor: 'var(--color-bg-subtle)',
                opacity: 0,
                transition: 'opacity var(--duration-fast) var(--ease-primary)',
                pointerEvents: 'none',
              }}
            />
            <span className="relative z-10" style={{ transform: 'translateX(-4px)' }}>post an ad</span>
          </button>
          <button
            type="button"
            className="relative flex items-center justify-center cursor-pointer border-none p-0"
            title="Favorites"
            style={{ color: 'var(--color-icon-primary)', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              const circle = e.currentTarget.querySelector('.hover-circle') as HTMLElement
              if (circle) circle.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const circle = e.currentTarget.querySelector('.hover-circle') as HTMLElement
              if (circle) circle.style.opacity = '0'
            }}
            onClick={() => console.log('[header] Favorites clicked')}
          >
            <span
              className="hover-circle absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                opacity: 0,
                transition: 'opacity var(--duration-fast) var(--ease-primary)',
                pointerEvents: 'none',
              }}
            />
            <Star size={20} className="relative z-10" />
          </button>
          <button
            type="button"
            className="relative flex items-center justify-center cursor-pointer border-none p-0"
            title="Account"
            style={{ color: 'var(--color-icon-primary)', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              const circle = e.currentTarget.querySelector('.hover-circle') as HTMLElement
              if (circle) circle.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const circle = e.currentTarget.querySelector('.hover-circle') as HTMLElement
              if (circle) circle.style.opacity = '0'
            }}
            onClick={() => console.log('[header] Account clicked')}
          >
            <span
              className="hover-circle absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                opacity: 0,
                transition: 'opacity var(--duration-fast) var(--ease-primary)',
                pointerEvents: 'none',
              }}
            />
            <User size={20} className="relative z-10" />
          </button>
        </div>

        {/* Hamburger menu — mobile only (≤480px) */}
        <div
          ref={menuRef}
          className="header-actions-hamburger shrink-0 items-center"
        >
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="relative flex items-center justify-center cursor-pointer border-none bg-transparent p-0"
            style={{ color: 'var(--color-text-primary)' }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            onMouseEnter={(e) => {
              const circle = e.currentTarget.querySelector('.hover-circle') as HTMLElement
              if (circle) circle.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const circle = e.currentTarget.querySelector('.hover-circle') as HTMLElement
              if (circle) circle.style.opacity = '0'
            }}
          >
            <span
              className="hover-circle absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                opacity: 0,
                transition: 'opacity var(--duration-fast) var(--ease-primary)',
                pointerEvents: 'none',
              }}
            />
            {isMenuOpen
              ? <X size={20} className="relative z-10" />
              : <Menu size={20} className="relative z-10" />
            }
          </button>

          {isMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                backgroundColor: '#FFFFFF',
                border: '1px solid #EEEEEE',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                minWidth: '160px',
                zIndex: 20,
                overflow: 'hidden',
              }}
            >
              {menuItems.map(({ label, icon, onClick }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center w-full cursor-pointer border-none bg-transparent text-left"
                  style={{
                    gap: '8px',
                    padding: '12px 16px',
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: '14px',
                    color: 'var(--color-text-primary)',
                    transition: 'background-color var(--duration-fast) var(--ease-primary)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EEEEEE' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  onClick={() => { onClick(); setIsMenuOpen(false) }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
