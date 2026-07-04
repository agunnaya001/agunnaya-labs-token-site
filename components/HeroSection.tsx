'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-cyan-500/20 border border-accent/30"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm font-semibold text-accent">Building the Future of Web3</p>
            </motion.div>

            {/* Main Heading */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-foreground">Power Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                  GameFi Journey
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed"
              variants={itemVariants}
            >
              AGL is the native utility token of Agunnaya Labs&apos; ecosystem. Stake, earn rewards,
              access cutting-edge tools, and join a vibrant community building the future of decentralized
              gaming and finance on Base.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <Link
                href="/stake"
                className="px-8 py-4 bg-gradient-to-r from-accent to-green-400 text-background font-bold rounded-lg hover:shadow-2xl hover:shadow-accent/50 transition-all active:scale-95 text-center"
              >
                Start Staking Now
              </Link>
              <a
                href="https://app.uniswap.org/swap?outputCurrency=0xEA1221B4d80A89BD8C75248Fae7c176BD1854698&chain=base"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-secondary text-foreground font-bold rounded-lg border border-border hover:border-accent hover:bg-secondary/80 transition-all text-center"
              >
                Trade AGL on Uniswap
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border"
              variants={itemVariants}
            >
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-accent">$31.74M</p>
                <p className="text-sm text-muted-foreground">Market Cap</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-green-400">25+</p>
                <p className="text-sm text-muted-foreground">Holders</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-bold text-cyan-400">$0.03175</p>
                <p className="text-sm text-muted-foreground">Current Price</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative h-96 lg:h-full flex items-center justify-center"
            variants={itemVariants}
          >
            {/* Floating Card 1 */}
            <motion.div
              className="absolute w-64 h-64 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 backdrop-blur-lg p-6 shadow-2xl"
              variants={floatVariants}
              animate="animate"
              whileHover={{ scale: 1.05 }}
              style={{ top: '-40px', left: '0' }}
            >
              <p className="text-sm font-semibold text-accent mb-2">Average APY</p>
              <p className="text-4xl font-bold text-accent mb-4">12%</p>
              <p className="text-xs text-muted-foreground">Competitive staking rewards</p>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              className="absolute w-64 h-64 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/5 border border-cyan-500/30 backdrop-blur-lg p-6 shadow-2xl"
              variants={floatVariants}
              animate="animate"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 6, delay: 1 }}
              style={{ bottom: '-40px', right: '0' }}
            >
              <p className="text-sm font-semibold text-cyan-400 mb-2">Total Liquidity</p>
              <p className="text-4xl font-bold text-cyan-400 mb-4">$6.92K</p>
              <p className="text-xs text-muted-foreground">Deep liquidity on Uniswap V4</p>
            </motion.div>

            {/* Center Logo */}
            <motion.div
              className="relative z-10 w-full h-96 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-cyan-400 rounded-full opacity-10 blur-3xl" />
              <Image
                src="/agl-logo.svg"
                alt="AGL Logo"
                width={200}
                height={200}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
