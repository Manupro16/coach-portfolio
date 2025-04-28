// app/components/NavBarServer.tsx
import {getServerSession} from "next-auth";
import NavBarClient, {NavLink} from "./NavBarClient";
import {Session} from "next-auth";
import React, {Suspense} from "react";
import { Role } from "@prisma/client";

export default async function NavBarServer() {
    // Fetch the session server-side
    const session: Session | null = await getServerSession();

    // Build navigation links, inject ADMIN if user role is admin
    const links: NavLink[] = [
        {label: "HOME", href: "/"},
        {label: "ABOUT", href: "/about"},
        {label: "CAREER", href: "/career"},
        {label: "STATISTICS", href: "/statistics"},
        {label: "ACHIEVEMENTS", href: "/achievements"},
        {label: "TEAMS", href: "/teams"},
        {label: "PLAYERS", href: "/players"},
        {label: "PHILOSOPHY", href: "/philosophy"},
        ...(session?.user.role === Role.ADMIN ? [{label: "ADMIN", href: "/admin"}] : []),
    ];


    return (
        <Suspense fallback={<SkeletonNavbar />}>
            <NavBarClient session={session} links={links} />
        </Suspense>
    )

}


// Simple skeleton while the client component hydrates
function SkeletonNavbar() {
  return (
    <nav className="nav-footer-background animate-pulse">
      <div className="px-4 sm:px-6 md:px-10 py-4 flex justify-between items-center">
        <div className="w-32 h-6 bg-gray-600 rounded" />
        <div className="hidden md:flex gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-16 h-6 bg-gray-600 rounded" />
          ))}
        </div>
        <div className="md:hidden w-16 h-6 bg-gray-600 rounded" />
      </div>
    </nav>
  )
}




