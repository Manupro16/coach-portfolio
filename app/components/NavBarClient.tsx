'use client'

import React from 'react'
import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button, Flex, Link, Text, DropdownMenu } from '@radix-ui/themes'

// Reusable media query hook
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const mediaQueryList = window.matchMedia(query)

    const updateMatches = () => setMatches(mediaQueryList.matches)
    updateMatches()

    mediaQueryList.addEventListener('change', updateMatches)
    return () => mediaQueryList.removeEventListener('change', updateMatches)
  }, [query])

  return mounted ? matches : false
}

// Define shape of nav links
export interface NavLink {
  label: string
  href: string
}

interface NavBarClientProps {
  session: Session | null
  links: NavLink[]
}

export default function NavBarClient({ session: initialSession, links,  }: NavBarClientProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { data: session, status } = useSession()
  const effectiveSession = session ?? initialSession;

  // Use effectiveSession everywhere
  const isLoggedIn = !!effectiveSession?.user;



  // Desktop navigation items
  const DesktopNav: React.FC<{ links: NavLink[] }> = ({ links }) => (
    <Flex align="center" gap="4">
      {links.map((nav, idx) => (
        <Link key={idx} href={nav.href}>
          <Text
            as="span"
            size="3"
            className="text-white hover:text-gray-400 transition-colors duration-500"
          >
            {nav.label}
          </Text>
        </Link>
      ))}
    </Flex>
  )

  // Mobile dropdown menu
  const MobileNav: React.FC<{ links: NavLink[] }> = ({ links }) => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger aria-label="Open menu">
        <Button variant="soft" size="2">
          Menu<DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size="2" variant="soft" className="z-50">
        {links.map((nav, idx) => (
          <React.Fragment key={idx}>
            <DropdownMenu.Item asChild>
              <Link href={nav.href}>
                <Text as="span" className="block py-1">
                  {nav.label}
                </Text>
              </Link>
            </DropdownMenu.Item>
            {(idx + 1) % 3 === 0 && idx !== links.length - 1 && (
              <DropdownMenu.Separator key={`sep-${idx}`} />
            )}
          </React.Fragment>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )

  return (
    <nav className="nav-footer-background">
      <Flex justify="between" align="center" className="px-4 sm:px-6 md:px-10 py-4">
        {/* Brand / Logo */}
        <Link href="/">
          <Text as="span" weight="bold" size="4" className="text-white">
            Chuy Vera
          </Text>
        </Link>

        {/* Navigation Links */}
        {isMobile ? <MobileNav links={links} /> : <DesktopNav links={links} />}

        {/* Auth Section */}
        <Flex align="center" gap="4">
          {status === 'loading' ? (
            <Text>Loading…</Text>
          ) : isLoggedIn ? (
            <>
              <Text size="3">Hi, {effectiveSession.user?.name ?? 'Coach'}</Text>
              <Button variant="ghost" size="2" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button size="2" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
    </nav>
  )
}
