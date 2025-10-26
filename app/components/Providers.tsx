'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Theme } from '@radix-ui/themes'
import type { Session } from 'next-auth'

interface ProvidersProps {
  children: React.ReactNode
  session?: Session | null
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <Theme className="website-background" appearance="dark">
        {children}
      </Theme>
    </SessionProvider>
  )
}
