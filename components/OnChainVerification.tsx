import { fetchOnChainToken, fetchChainHealth } from '@/lib/onchain-api'
import { BalanceChecker } from './BalanceChecker'

function truncateAddress(address: string | null): string {
  if (!address) return 'N/A'
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export async function OnChainVerification() {
  const [agl, chonk9k, health] = await Promise.all([
    fetchOnChainToken('AGL'),
    fetchOnChainToken('CHONK9K'),
    fetchChainHealth(),
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Live On-Chain Verification
          </h2>
          <p className="text-muted-foreground">
            Read directly from Base mainnet via{' '}
            <span className="font-mono text-accent">api.agunnayalabs.xyz</span> — no
            third-party price aggregator in the loop.
          </p>
        </div>
        {health && (
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-muted-foreground">
              Base block <span className="font-mono text-foreground">#{health.latestBlock}</span>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[agl, chonk9k].map((token) =>
          token ? (
            <div key={token.symbol} className="card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">{token.symbol}</h3>
                <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
                  Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Supply</p>
                  <p className="font-mono text-lg font-semibold text-foreground">
                    {Number(token.totalSupplyFormatted).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Decimals</p>
                  <p className="font-mono text-lg font-semibold text-foreground">
                    {token.decimals}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Owner</p>
                <p className="font-mono text-sm text-accent break-all">
                  {truncateAddress(token.owner)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Contract</p>
                <p className="font-mono text-sm text-muted-foreground break-all">
                  {token.address}
                </p>
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <p className="text-muted-foreground text-sm">
                On-chain data temporarily unavailable.
              </p>
            </div>
          )
        )}
      </div>

      <BalanceChecker />
    </div>
  )
}
