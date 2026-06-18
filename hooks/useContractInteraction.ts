'use client'

import { useCallback, useState } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { getTokenContract, aglTokenAddress } from '@/lib/contracts'

export function useContractInteraction() {
  const { address: userAddress } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getBalance = useCallback(async () => {
    if (!userAddress || !walletClient) return null

    try {
      setError(null)
      const publicClient = walletClient.mode === 'publicClient' ? walletClient : null
      
      if (!publicClient) {
        // Fallback: use a simple read-only call
        const data = await walletClient.call({
          account: userAddress,
          to: aglTokenAddress,
          data: '0x70a08231' + userAddress.slice(2).padStart(64, '0'),
        })
        return data
      }

      return null
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch balance'
      setError(message)
      return null
    }
  }, [userAddress, walletClient])

  const approveToken = useCallback(
    async (spender: string, amount: string) => {
      if (!userAddress || !walletClient) throw new Error('Wallet not connected')

      try {
        setIsLoading(true)
        setError(null)

        const contract = getTokenContract(walletClient)
        const parsedAmount = parseUnits(amount, 18)

        const txHash = await walletClient.writeContract({
          address: aglTokenAddress,
          abi: contract.abi,
          functionName: 'approve',
          args: [spender as `0x${string}`, parsedAmount],
        } as any)

        return txHash
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Approval failed'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [userAddress, walletClient]
  )

  const transferToken = useCallback(
    async (recipient: string, amount: string) => {
      if (!userAddress || !walletClient) throw new Error('Wallet not connected')

      try {
        setIsLoading(true)
        setError(null)

        const contract = getTokenContract(walletClient)
        const parsedAmount = parseUnits(amount, 18)

        const txHash = await walletClient.writeContract({
          address: aglTokenAddress,
          abi: contract.abi,
          functionName: 'transfer',
          args: [recipient as `0x${string}`, parsedAmount],
        } as any)

        return txHash
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Transfer failed'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [userAddress, walletClient]
  )

  return {
    getBalance,
    approveToken,
    transferToken,
    isLoading,
    error,
    userAddress,
  }
}
