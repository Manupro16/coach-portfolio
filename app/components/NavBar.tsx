'use client'


import React from 'react';
import {Button, Flex, Link, Text, DropdownMenu} from "@radix-ui/themes"

// Custom hook to detect media query
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const updateMatches = () => setMatches(mediaQueryList.matches);

        updateMatches();
        mediaQueryList.addEventListener('change', updateMatches);
        return () => mediaQueryList.removeEventListener('change', updateMatches);
    }, [query]);

    return matches;

}


const DesktopNav: React.FC<{ navsLinks: { label: string; href: string }[] }> = ({navsLinks}) => (
    <Flex as="div" align="center" gap="4">
        {navsLinks.map((nav, index) => (
            <Link key={index} href={nav.href}>
                <Text as="span" className="text-white hover:text-gray-400 transition-colors duration-500"
                      size='3'>{nav.label}</Text>
            </Link>
        ))}
    </Flex>
)

const MobileNav: React.FC<{ navsLinks: { label: string; href: string }[] }> = ({navsLinks}) => (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button variant="soft" color="indigo" size="2">
                Menu
                <DropdownMenu.TriggerIcon/>
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="2" variant="soft" color="indigo" className="z-50">
            {navsLinks.map((nav, index) => (
                <React.Fragment key={index}>
                    <DropdownMenu.Item>
                        <Link href={nav.href}>
                            <Text as="span" style={{color: 'white'}}>
                                {nav.label}
                            </Text>
                        </Link>
                    </DropdownMenu.Item>
                    {/* Insert a separator after every 3 items, but not after the last item */}
                    {(index + 1) % 3 === 0 && index !== navsLinks.length - 1 && (
                        <DropdownMenu.Separator key={`separator-${index}`}/>
                    )}
                </React.Fragment>
            ))}
        </DropdownMenu.Content>
    </DropdownMenu.Root>




)


const NavBar: React.FC = () => {

    const navsLinks = [
        {label: 'HOME', href: '/home'},
        {label: 'ABOUT', href: '/about'},
        {label: 'CAREER', href: '/career'},
        {label: 'STATISTICS', href: '/statistics'},
        {label: 'ACHIEVEMENTS', href: '/achievements'},
        {label: 'TEAMS', href: '/teams'},
        {label: 'PLAYERS', href: '/players'},
        {label: 'PHILOSOPHY', href: '/philosophy'}
    ]

    // Check if the screen width is 768px or less (adjust as needed)
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <nav className="nav-footer-background">
            <Flex as="div" justify="between" align="center" className="px-4 sm:px-6 md:px-10 py-4">
                <Link href="/">
                    <Text as="span" className="text-white" weight="bold" size='4'>Chuy Vera</Text>
                </Link>
                {isMobile ? (
                    <MobileNav navsLinks={navsLinks}/>
                ) : (
                    <DesktopNav navsLinks={navsLinks}/>
                )}
            </Flex>
        </nav>
    );
};

export default NavBar;