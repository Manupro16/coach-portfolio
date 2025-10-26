// app/components/NavBarServer.tsx
import { getServerSession } from 'next-auth'
import NavBarClient, { NavLink } from './NavBarClient'
import { Role } from '@prisma/client'

export default async function NavBarServer() {
  // Fetch the session server-side (for role-based links only)
  const session = await getServerSession()

  // Build navigation links, inject ADMIN if user role is admin
  const links: NavLink[] = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CAREER', href: '/career' },
    { label: 'STATISTICS', href: '/statistics' },
    { label: 'ACHIEVEMENTS', href: '/achievements' },
    { label: 'TEAMS', href: '/teams' },
    { label: 'PLAYERS', href: '/players' },
    { label: 'PHILOSOPHY', href: '/philosophy' },
    ...(session?.user?.role === Role.ADMIN ? [{ label: 'ADMIN', href: '/admin' }] : []),
  ]

  // Return client component without Suspense and without passing session
  return <NavBarClient links={links} />
}




