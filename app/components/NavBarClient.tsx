'use client'

import React from 'react'
import {Session} from 'next-auth'
import {useSession, signIn, signOut} from 'next-auth/react'
import {Button, Flex, Link, Text, DropdownMenu} from '@radix-ui/themes'

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

export default function NavBarClient({session, links}: NavBarClientProps) {
    const {status} = useSession()
    const isMobile = useMediaQuery('(max-width: 768px)')

    // Desktop navigation items
    const DesktopNav: React.FC<{ navsLinks: NavLink[] }> = ({navsLinks}) => (
        <Flex align="center" gap="4">
            {navsLinks.map((nav, idx) => (
                <Link key={idx} href={nav.href}>
                    <Text as="span" size="3" className="text-white hover:text-gray-400 transition-colors duration-500">
                        {nav.label}
                    </Text>
                </Link>
            ))}
        </Flex>
    )

    // Mobile dropdown menu
    const MobileNav: React.FC<{ navsLinks: NavLink[] }> = ({navsLinks}) => (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger aria-label="Open menu">
                <Button variant="soft" size="2">
                    Menu<DropdownMenu.TriggerIcon/>
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="2" variant="soft" className="z-50">
                {navsLinks.map((nav, idx) => (
                    <React.Fragment key={idx}>
                        <DropdownMenu.Item asChild>
                            <Link href={nav.href}>
                                <Text as="span" className="block py-1">
                                    {nav.label}
                                </Text>
                            </Link>
                        </DropdownMenu.Item>
                        {(idx + 1) % 3 === 0 && idx !== navsLinks.length - 1 && (
                            <DropdownMenu.Separator key={`sep-${idx}`}/>
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

                {/* Auth Section */}
                <Flex align="center" gap="4">
                    {status === 'loading' ? (
                        <Text>Loading…</Text>
                    ) : session ? (
                        <>
                            <Text size="3">Hi, {session.user?.name ?? 'Coach'}</Text>
                            <Button variant="ghost" size="2" onClick={() => signOut()}>
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button color="blue" size="2" onClick={() => signIn()}>
                            Sign In
                        </Button>
                    )}
                </Flex>

                {/* Navigation Links */}
                {isMobile ? <MobileNav navsLinks={links}/> : <DesktopNav navsLinks={links}/>}
            </Flex>
        </nav>
    )
}
