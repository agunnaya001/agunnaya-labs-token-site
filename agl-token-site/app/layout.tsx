import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AGL Token | Agunnaya Labs',
  description: 'Agunnaya Labs Token (AGL) - The future of decentralized finance on Base mainnet',
  openGraph: {
    title: 'AGL Token | Agunnaya Labs',
    description: 'Agunnaya Labs Token (AGL) - The future of decentralized finance on Base mainnet',
    url: 'https://agunnayalabs.xyz',
    siteName: 'AGL Token',
    images: [
      {
        url: 'https://agunnayalabs.xyz/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGL Token | Agunnaya Labs',
    description: 'Agunnaya Labs Token (AGL) - The future of decentralized finance on Base mainnet',
    creator: '@agunnayalabs',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
