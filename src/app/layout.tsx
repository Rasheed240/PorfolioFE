import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rasheed Babatunde | Software Engineer',
  description: 'Backend-focused Software Engineer specializing in scalable APIs and microservices.',
};

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import KeepAlive from '@/components/common/KeepAlive';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white flex flex-col">
        <Navbar />
        <KeepAlive />
        {children}
        <Footer />
      </body>
    </html>
  );
}
