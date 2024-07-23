import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Global Travel',
  description: 'Global Travel',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/favicon.png',
      href: '/favicon.png',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/favicon.png',
      href: '/favicon.png',
    },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
