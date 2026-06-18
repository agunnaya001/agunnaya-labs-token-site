import { create } from 'zustand'

interface AnalyticsData {
  totalStaked: number
  totalRewards: number
  activePositions: number
  portfolioValue: number
  stakingHistory: Array<{
    date: string
    amount: number
    rewards: number
  }>
}

interface AnalyticsStore {
  data: AnalyticsData | null
  isLoading: boolean
  setData: (data: AnalyticsData) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  data: null,
  isLoading: false,
  setData: (data) => set({ data }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ data: null, isLoading: false }),
}))
