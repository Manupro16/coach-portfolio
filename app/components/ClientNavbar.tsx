// app/components/ClientNavbar.tsx
"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./NavBar'), { ssr: false });

export default Navbar;
