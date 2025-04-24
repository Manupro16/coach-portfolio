'use client'


import dynamic from 'next/dynamic';
import React from 'react';
import type { NavLink } from './NavBarClient';
import { Session } from 'next-auth';

const NavBarClient = dynamic(() => import('./NavBarClient'), {
  ssr: false,
  loading: () => <SkeletonNavbar />,
});

interface NavBarDynamicProps {
  session: Session | null;
  links: NavLink[];
}

export default function NavBarDynamic({ session, links }: NavBarDynamicProps) {
  return <NavBarClient session={session} links={links} />;
}

function SkeletonNavbar() {
    return (
        <nav className="nav-footer-background animate-pulse">
            <div className="px-4 sm:px-6 md:px-10 py-4 flex justify-between items-center">
                <div className="w-32 h-6 bg-gray-600 rounded"/>
                <div className="hidden md:flex gap-6">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="w-16 h-6 bg-gray-600 rounded"/>
                    ))}
                </div>
                <div className="md:hidden w-16 h-6 bg-gray-600 rounded"/>
            </div>
        </nav>
    );
}
