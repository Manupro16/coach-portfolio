import React from 'react';
import {Flex, Link, Text} from "@radix-ui/themes"

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

    return (
        <nav className="nav-footer-background">
                <Flex as="div" justify="between" align="center" className="px-4 sm:px-6 md:px-10 py-4">
                    <Link href="/">
                        <Text as="span" className="text-white" weight="bold" size='4'>Chuy Vera</Text>
                    </Link>
                    <Flex as="div" align="center" gap="4">
                        {navsLinks.map((nav, index) => (
                            <Link key={index} href={nav.href}  >
                                <Text as="span" className="text-white hover:text-gray-400 transition-colors duration-500" size='3'>{nav.label}</Text>
                            </Link>
                        ))}
                    </Flex>
                </Flex>
        </nav>
    );
};

export default NavBar;