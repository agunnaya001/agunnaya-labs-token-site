'use client'

import { ReactNode } from 'react'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected } from '@wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const config = createConfig({
  chains: [base],
  connectors: [injected()],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>{children}</WagmiProvider>
    </QueryClientProvider>
  )
}
