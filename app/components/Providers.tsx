'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Theme } from '@radix-ui/themes'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Theme className="website-background" appearance="dark">
        {children}
      </Theme>
    </SessionProvider>
  )
}
