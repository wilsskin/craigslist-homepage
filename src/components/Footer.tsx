const FOOTER_LINKS = [
  'help', 'safety', 'privacy', 'terms', 'about', 'app', 'sitemap',
]

export function Footer() {
  return (
    <footer style={{ padding: '24px 0 16px', textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {FOOTER_LINKS.map(label => (
          <a
            key={label}
            href="#"
            onClick={e => e.preventDefault()}
            style={{
              margin: '2px',
              padding: '4px 8px',
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 100ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              const a = e.currentTarget
              a.style.color = 'var(--color-text-primary)'
              a.style.textDecoration = 'underline'
            }}
            onMouseLeave={e => {
              const a = e.currentTarget
              a.style.color = 'var(--color-text-secondary)'
              a.style.textDecoration = 'none'
            }}
          >
            {label}
          </a>
        ))}
      </div>
      <p
        style={{
          margin: '4px 0 0',
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
        }}
      >
        © 2026 craigslist
      </p>
    </footer>
  )
}
