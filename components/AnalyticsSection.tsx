'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

// Mock data - in production, this would come from an API
const PRICE_DATA = [
  { date: 'Jun 1', price: 0.025, volume: 450 },
  { date: 'Jun 5', price: 0.028, volume: 520 },
  { date: 'Jun 10', price: 0.031, volume: 680 },
  { date: 'Jun 15', price: 0.029, volume: 590 },
  { date: 'Jun 20', price: 0.032, volume: 750 },
  { date: 'Jun 25', price: 0.031, volume: 620 },
  { date: 'Jun 30', price: 0.032, volume: 850 },
]

const HOLDER_DISTRIBUTION = [
  { name: '0-100 AGL', value: 8, color: '#0891b2' },
  { name: '100-1k AGL', value: 6, color: '#06b6d4' },
  { name: '1k-10k AGL', value: 5, color: '#39FF14' },
  { name: '10k+ AGL', value: 6, color: '#f59e0b' },
]

const VOLUME_DATA = [
  { name: 'Mon', volume: 420, trades: 12 },
  { name: 'Tue', volume: 380, trades: 15 },
  { name: 'Wed', volume: 490, trades: 18 },
  { name: 'Thu', volume: 520, trades: 22 },
  { name: 'Fri', volume: 680, trades: 25 },
  { name: 'Sat', volume: 590, trades: 20 },
  { name: 'Sun', volume: 450, trades: 14 },
]

export function AnalyticsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Token Analytics
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real-time market data and insights from GeckoTerminal
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Price Chart */}
        <motion.div variants={itemVariants} className="card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Price Trend (30D)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={PRICE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="date" stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px' }}
                formatter={(value) => `$${value.toFixed(4)}`}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#39FF14"
                dot={{ fill: '#39FF14', r: 4 }}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Volume Chart */}
        <motion.div variants={itemVariants} className="card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Weekly Volume & Trades</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={VOLUME_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="name" stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="volume" fill="#39FF14" radius={[8, 8, 0, 0]} />
              <Bar dataKey="trades" fill="#00d4ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Holder Distribution */}
        <motion.div variants={itemVariants} className="card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Holder Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={HOLDER_DISTRIBUTION}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {HOLDER_DISTRIBUTION.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} holders`} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-2xl font-bold text-accent">$31.74M</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-2xl font-bold text-green-400">$748.65</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
              <p className="text-2xl font-bold text-cyan-400">$6.92K</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-sm text-muted-foreground mb-1">24h Change</p>
              <p className="text-2xl font-bold text-yellow-400">+77.84%</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
