import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-roboto',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'StockPulse',
  description:
    'Track real-time stock prices, get personalized alerts and explore detailed company insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='dark'
    >
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
