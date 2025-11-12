import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const palette = {
  cream: '#F8F1E7',
  mustard: '#E2B036',
  orange: '#D16A1A',
  brown: '#4A311D',
  avocado: '#7BA16F',
  dark: '#191715',
}

function RetroLogo() {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label="Running With Strategy Home">
      <svg width="44" height="44" viewBox="0 0 64 64" className="rounded-xl shadow" style={{ background: palette.mustard }}>
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.orange} />
            <stop offset="100%" stopColor={palette.avocado} />
          </linearGradient>
        </defs>
        <rect x="4" y="8" width="56" height="40" rx="6" fill="url(#g1)" stroke={palette.brown} strokeWidth="3" />
        <rect x="12" y="16" width="40" height="16" rx="3" fill={palette.cream} stroke={palette.brown} strokeWidth="2" />
        <circle cx="48" cy="34" r="3" fill={palette.orange} />
        <rect x="14" y="36" width="24" height="4" rx="2" fill={palette.brown} />
        <rect x="26" y="50" width="12" height="6" rx="2" fill={palette.brown} />
      </svg>
      <div className="leading-tight">
        <p className="font-extrabold tracking-tight text-lg" style={{ color: palette.dark }}>Running</p>
        <p className="font-extrabold tracking-tight text-lg -mt-1" style={{ color: palette.orange }}>With Strategy</p>
      </div>
    </Link>
  )
}

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 border-b" style={{ background: palette.cream, borderColor: palette.brown }}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <RetroLogo />
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `text-sm font-bold transition ${isActive ? 'underline' : ''}`} style={{ color: palette.brown }}>
              {item.label}
            </NavLink>
          ))}
          <a href="/#contact" className="rounded-full px-4 py-2 font-extrabold shadow-[3px_4px_0_rgba(0,0,0,0.2)]" style={{ background: palette.orange, color: 'white' }}>Book Call</a>
        </nav>
        <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border" style={{ borderColor: palette.brown }} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t" style={{ borderColor: palette.brown }}>
          <div className="px-6 py-4 grid gap-3" style={{ background: palette.cream }}>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-base font-bold" style={{ color: palette.brown }}>
                {item.label}
              </NavLink>
            ))}
            <a href="/#contact" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 font-extrabold text-center shadow-[3px_4px_0_rgba(0,0,0,0.2)]" style={{ background: palette.orange, color: 'white' }}>Book Call</a>
          </div>
        </div>
      )}
    </div>
  )
}
