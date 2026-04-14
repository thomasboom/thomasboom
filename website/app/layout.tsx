import type { Metadata } from 'next';
import './globals.css';
import { ConvexProviderWrapper } from './components/ConvexProvider';

export const metadata: Metadata = {
  title: 'Thomas Boom',
  description: 'Building software to improve lives.',
  keywords: [
    'Thomas Boom',
    'developer',
    'software engineer',
    'open source',
    'mobile apps',
    'web tools',
  ],
  openGraph: {
    title: 'Thomas Boom',
    description: 'Building software to improve lives.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Thomas Boom',
    description: 'Building software to improve lives.',
  },
  other: {
    me: 'https://mastodon.social/@thomasboom',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexProviderWrapper>{children}</ConvexProviderWrapper>
      </body>
    </html>
  );
}
