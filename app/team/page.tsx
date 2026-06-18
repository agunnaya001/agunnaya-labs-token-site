'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Section } from '@/components/Section'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0xEA1221B4d80A89BD8C75248Fae7c176BD1854698'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  socials?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export default function TeamPage() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Serial entrepreneur with 10+ years in blockchain and fintech. Previously founded 2 successful Web3 projects.',
      image: '👩‍💼',
      socials: {
        twitter: 'https://x.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Lead Developer',
      bio: 'Full-stack blockchain engineer specializing in smart contract security. Contributed to major DeFi protocols.',
      image: '👨‍💻',
      socials: {
        github: 'https://github.com',
        twitter: 'https://x.com',
      },
    },
    {
      name: 'Priya Patel',
      role: 'Lead Economist',
      bio: 'PhD in Economics with expertise in tokenomics design. Former researcher at leading blockchain research institutions.',
      image: '👩‍🔬',
      socials: {
        twitter: 'https://x.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: 'James Wilson',
      role: 'Community Manager',
      bio: 'Community building expert with track record of growing Web3 communities to 100k+ members.',
      image: '👨‍🤝',
      socials: {
        twitter: 'https://x.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: 'Yuki Tanaka',
      role: 'Product Manager',
      bio: 'Product strategist with background in SaaS and blockchain. Passionate about user-centric design.',
      image: '👩‍💼',
      socials: {
        twitter: 'https://x.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      name: 'Alex Kumar',
      role: 'Security Lead',
      bio: 'Cybersecurity expert with certifications in blockchain security and smart contract auditing.',
      image: '👨‍🔐',
      socials: {
        github: 'https://github.com',
        twitter: 'https://x.com',
      },
    },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Header */}
        <Section className="pt-12 lg:pt-20 pb-8 lg:pb-12">
          <div className="max-w-3xl">
            <Link href="/" className="text-accent text-sm font-semibold mb-4 inline-block hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Team</h1>
            <p className="text-lg text-muted-foreground">
              Talented individuals united by a shared vision of decentralized innovation and blockchain excellence
            </p>
          </div>
        </Section>

        {/* Mission Statement */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <div className="card max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are a team of passionate blockchain developers, economists, and community builders dedicated to creating
              a more transparent, accessible, and equitable financial ecosystem. With combined expertise spanning multiple
              successful Web3 projects, we bring both innovation and pragmatism to every aspect of AGL development.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our core values are transparency, community empowerment, security, and sustainable growth. We believe that
              blockchain technology should serve humanity, not the other way around.
            </p>
          </div>
        </Section>

        {/* Team Members */}
        <Section className="py-12 lg:py-16">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Team Members</h2>
            <p className="text-muted-foreground">Meet the people building the future of AGL</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                {/* Avatar */}
                <div className="text-7xl mb-4 text-center">{member.image}</div>

                {/* Info */}
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-accent mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{member.bio}</p>

                {/* Social Links */}
                {member.socials && (
                  <div className="flex gap-3 pt-4 border-t border-border">
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors"
                        title="Twitter"
                      >
                        𝕏
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors"
                        title="LinkedIn"
                      >
                        in
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors"
                        title="GitHub"
                      >
                        ⚙️
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Company Info */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">About Agunnaya Labs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-foreground mb-4">Founded</h3>
              <p className="text-4xl font-bold text-accent mb-2">2023</p>
              <p className="text-muted-foreground">
                Established with a vision to revolutionize blockchain technology and create lasting value for our community.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-foreground mb-4">Team Size</h3>
              <p className="text-4xl font-bold text-accent mb-2">20+</p>
              <p className="text-muted-foreground">
                Growing team of developers, designers, marketers, and community managers across multiple time zones.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-foreground mb-4">Expertise</h3>
              <p className="text-4xl font-bold text-accent mb-2">150+</p>
              <p className="text-muted-foreground">
                Combined years of experience in blockchain, finance, technology, and community building.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-foreground mb-4">Global Reach</h3>
              <p className="text-4xl font-bold text-accent mb-2">6</p>
              <p className="text-muted-foreground">
                Continents represented. We believe in building a truly global and decentralized team.
              </p>
            </div>
          </div>
        </Section>

        {/* Values */}
        <Section className="py-12 lg:py-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🔓',
                title: 'Transparency',
                description:
                  'We operate with complete transparency. All decisions, code, and financials are open for community scrutiny.',
              },
              {
                icon: '👥',
                title: 'Community First',
                description:
                  'Our community is our greatest asset. We prioritize community interests above all else in our decision-making.',
              },
              {
                icon: '🔒',
                title: 'Security',
                description:
                  'We invest heavily in security audits, testing, and best practices to protect community assets.',
              },
              {
                icon: '♻️',
                title: 'Sustainability',
                description:
                  'We think long-term. Our tokenomics and strategies are designed for lasting value creation.',
              },
              {
                icon: '🚀',
                title: 'Innovation',
                description:
                  'We continuously push boundaries and explore new possibilities in blockchain technology.',
              },
              {
                icon: '🤝',
                title: 'Inclusivity',
                description:
                  'We welcome diversity and believe blockchain should be accessible to everyone worldwide.',
              },
            ].map((value, index) => (
              <div key={index} className="card">
                <div className="text-5xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Career Section */}
        <Section className="py-12 lg:py-16 bg-secondary/30">
          <div className="card bg-gradient-to-r from-accent/10 to-accent/5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">Join Our Team</h2>
                <p className="text-muted-foreground mb-4 max-w-xl">
                  We&apos;re always looking for talented individuals passionate about blockchain technology and decentralized finance.
                  If you&apos;re interested in making an impact with Agunnaya Labs, we&apos;d love to hear from you.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <a href="mailto:careers@agunnayalabs.xyz" className="btn-primary">
                    See Open Positions →
                  </a>
                  <a href="mailto:hello@agunnayalabs.xyz" className="btn-secondary">
                    Get in Touch
                  </a>
                </div>
              </div>
              <div className="text-7xl flex-shrink-0">🚀</div>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section className="py-12 lg:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions or want to collaborate? We&apos;d love to hear from you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="mailto:contact@agunnayalabs.xyz"
                className="card hover:bg-accent/10 transition-colors text-center"
              >
                <p className="text-2xl mb-2">✉️</p>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">contact@agunnayalabs.xyz</p>
              </a>

              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:bg-accent/10 transition-colors text-center"
              >
                <p className="text-2xl mb-2">✈️</p>
                <p className="font-semibold text-foreground">Telegram</p>
                <p className="text-sm text-muted-foreground">Join our community</p>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:bg-accent/10 transition-colors text-center"
              >
                <p className="text-2xl mb-2">𝕏</p>
                <p className="font-semibold text-foreground">X (Twitter)</p>
                <p className="text-sm text-muted-foreground">Follow updates</p>
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer contractAddress={CONTRACT_ADDRESS} />
    </>
  )
}
