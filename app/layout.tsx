import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Footer from "@/app/components/Footer";
import React from "react";
import NavBarServer from "@/app/components/NavBarServer";
import Providers from "@/app/components/Providers";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Coach Chuy Vera - Professional Soccer Coaching",
    description: "Professional soccer coach specializing in player development and team strategy. Explore coaching philosophy, career history, and training programs.",
    keywords: ["soccer coaching", "player development", "football training", "team strategy"],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Providers>
            <NavBarServer/>
            {children}
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}
