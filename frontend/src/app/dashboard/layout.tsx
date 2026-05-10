import Link from 'next/link'

const navLinks = [
  { href: '/dashboard', label: 'Home' },
  { href: '/dashboard/checkin', label: 'Check In' },
  { href: '/dashboard/progress', label: 'Progress' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col">
      <nav className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-lg tracking-tight">
          Finops
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-stone-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  )
}
