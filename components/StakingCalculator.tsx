'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface StakingTier {
  name: string
  min: number
  max: number
  apy: number
  color: string
}

const STAKING_TIERS: StakingTier[] = [
  { name: 'Starter', min: 0, max: 1000, apy: 8, color: 'from-blue-500 to-cyan-400' },
  { name: 'Silver', min: 1000, max: 10000, apy: 12, color: 'from-green-500 to-emerald-400' },
  { name: 'Gold', min: 10000, max: 100000, apy: 15, color: 'from-yellow-500 to-orange-400' },
  { name: 'Platinum', min: 100000, max: Infinity, apy: 20, color: 'from-purple-500 to-pink-400' },
]

export function StakingCalculator() {
  const [amount, setAmount] = useState(5000)
  const [duration, setDuration] = useState(12) // months
  const [selectedTier, setSelectedTier] = useState<StakingTier | null>(null)

  const currentTier =
    selectedTier || STAKING_TIERS.find((tier) => amount >= tier.min && amount < tier.max) || STAKING_TIERS[0]

  const monthlyReward = (amount * currentTier.apy) / 100 / 12
  const totalReward = monthlyReward * duration
  const finalAmount = amount + totalReward

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value) || 0)
  }

  const handleQuickSelect = (value: number) => {
    setAmount(value)
    setSelectedTier(STAKING_TIERS.find((tier) => value >= tier.min && value < tier.max) || STAKING_TIERS[0])
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card border-accent/30 bg-gradient-to-br from-background to-secondary/50">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Staking Calculator</h2>
          <p className="text-muted-foreground">Estimate your AGL staking rewards</p>
        </div>

        {/* Tier Display */}
        <div className="mb-8 p-4 rounded-lg bg-background border border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Current Tier</span>
            <motion.div
              key={currentTier.name}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r ${currentTier.color} text-white font-bold text-sm`}
            >
              {currentTier.name} - {currentTier.apy}% APY
            </motion.div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">Amount to Stake (AGL)</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            placeholder="Enter amount"
          />
        </div>

        {/* Quick Select Buttons */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[1000, 10000, 50000, 100000].map((value) => (
            <button
              key={value}
              onClick={() => handleQuickSelect(value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                Math.abs(amount - value) < 100
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {value.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Duration Slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-3">
            Staking Duration: {duration} months
          </label>
          <input
            type="range"
            min="1"
            max="60"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>1 month</span>
            <span>60 months (5 years)</span>
          </div>
        </div>

        {/* Results Display */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-lg bg-background border border-border"
          >
            <p className="text-xs text-muted-foreground mb-2">Monthly Reward</p>
            <p className="text-2xl font-bold text-accent">{monthlyReward.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">AGL/month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-lg bg-background border border-border"
          >
            <p className="text-xs text-muted-foreground mb-2">Total Rewards</p>
            <p className="text-2xl font-bold text-green-400">{totalReward.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">over {duration} months</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-lg bg-background border border-border"
          >
            <p className="text-xs text-muted-foreground mb-2">Final Amount</p>
            <p className="text-2xl font-bold text-accent">{finalAmount.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">total AGL</p>
          </motion.div>
        </div>

        {/* Tier Info */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">All Staking Tiers</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STAKING_TIERS.map((tier) => (
              <button
                key={tier.name}
                onClick={() => {
                  const tierMin = tier.min + 1
                  setAmount(tierMin)
                  setSelectedTier(tier)
                }}
                className={`p-3 rounded-lg text-sm font-medium transition-all border ${
                  currentTier.name === tier.name
                    ? `bg-gradient-to-r ${tier.color} text-white border-transparent`
                    : 'bg-secondary text-foreground border-border hover:border-accent'
                }`}
              >
                <div>{tier.name}</div>
                <div className="text-xs opacity-75 mt-1">{tier.apy}% APY</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
