// app/components/NavBarServer.tsx
import {getServerSession} from "next-auth";
import type {NavLink} from "./NavBarClient";
import {Session} from "next-auth";
import React from "react";
import NavBarDynamic from "@/app/components/NavBarDynamic";

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
        ...(session?.user.role === "admin" ? [{label: "ADMIN", href: "/admin"}] : []),
    ];

    // Render the client navbar with session and links
    return <NavBarDynamic session={session} links={links}/>;
}




