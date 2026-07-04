import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import { CommunityShowcase } from '@/components/CommunityShowcase'

export const metadata = {
  title: 'Community - AGL Token | Agunnaya Labs',
  description:
    'Join the AGL community. Meet our team, participate in governance, and help shape the future of Web3.',
  openGraph: {
    title: 'Community - AGL Token',
    description: 'Join the vibrant AGL community',
    images: [
      {
        url: 'https://www.agunnayalabs.xyz/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

const COMMUNITY_CHANNELS = [
  {
    name: 'GitHub',
    description: 'Contribute code and collaborate on development',
    icon: '⚙️',
    link: 'https://github.com/agunnaya001',
    color: 'from-gray-600 to-gray-700',
  },
  {
    name: 'X (Twitter)',
    description: 'Latest news, updates, and community announcements',
    icon: '𝕏',
    link: 'https://x.com/agunnayalabs',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Telegram',
    description: 'Real-time chat and community discussions',
    icon: '✈️',
    link: 'https://t.me/agunnayalabs',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Discord',
    description: 'Voice chat, threads, and community events',
    icon: '💬',
    link: '#',
    color: 'from-indigo-500 to-purple-600',
  },
]

const GOVERNANCE_INFO = [
  {
    title: 'Proposal Voting',
    description: 'AGL holders can vote on governance proposals to shape the future of the ecosystem.',
    icon: '🗳️',
  },
  {
    title: 'Treasury Management',
    description: 'Community funds are managed transparently through multi-sig contracts.',
    icon: '💰',
  },
  {
    title: 'Bounty Programs',
    description: 'Earn AGL by contributing to the ecosystem through development, marketing, and more.',
    icon: '🎯',
  },
  {
    title: 'Grants Program',
    description: 'Funding available for projects that advance the AGL ecosystem.',
    icon: '🚀',
  },
]

export default function CommunityPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero */}
        <Section className="pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-background to-secondary/50">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-black mb-6 text-foreground">
              Powered by Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                {' '}
              Community
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              AGL is community-owned and community-driven. Every decision is made by the holders, for the
              holders. Join us in shaping the future of Web3.
            </p>
          </div>
        </Section>

        {/* Community Showcase */}
        <Section className="py-16 lg:py-24">
          <CommunityShowcase />
        </Section>

        {/* Communication Channels */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">Connect With Us</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Find us on all major platforms. Join our community and stay updated on the latest developments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNITY_CHANNELS.map((channel) => (
              <a
                key={channel.name}
                href={channel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-border hover:border-accent transition-all"
              >
                <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform`}>{channel.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{channel.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
                <span className="text-sm font-semibold text-accent">Visit →</span>
              </a>
            ))}
          </div>
        </Section>

        {/* Governance */}
        <Section className="py-16 lg:py-24">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">
              Governance & Participation
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Everyone has a voice in the AGL ecosystem. Participate in governance, earn bounties, and help us
              build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GOVERNANCE_INFO.map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-gradient-to-br from-background to-secondary/50 border border-border hover:border-accent/50 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Recent Activity */}
        <Section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">Recent Community Activity</h2>
          </div>

          <div className="card border-border">
            <div className="space-y-6">
              {[
                {
                  date: 'July 4, 2026',
                  title: 'ChonkPump Launchpad Goes Live',
                  description: 'New fair-launch mechanism for community tokens.',
                },
                {
                  date: 'July 1, 2026',
                  title: 'Community Governance Vote #12 Passed',
                  description: '87% voted in favor of treasury allocation for marketing.',
                },
                {
                  date: 'June 28, 2026',
                  title: 'ArenaVerse Tournament Season 3 Begins',
                  description: '$50K in rewards available for competitive players.',
                },
                {
                  date: 'June 25, 2026',
                  title: 'Vibe Studio AI Update Released',
                  description: 'New code completion features and improved auditing.',
                },
              ].map((activity) => (
                <div key={activity.title} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                  <p className="text-sm text-accent font-semibold mb-2">{activity.date}</p>
                  <h4 className="text-lg font-bold text-foreground mb-2">{activity.title}</h4>
                  <p className="text-muted-foreground">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Get Involved CTA */}
        <Section className="py-16 lg:py-24 bg-gradient-to-r from-accent/10 to-cyan-500/10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Get Involved?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you&apos;re a developer, designer, marketer, or community enthusiast, there&apos;s a place for you in AGL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/agunnaya001"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Start Contributing →
              </a>
              <a
                href="https://t.me/agunnayalabs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-secondary text-foreground font-bold rounded-lg border border-border hover:border-accent transition-all"
              >
                Join Telegram →
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  )
}
