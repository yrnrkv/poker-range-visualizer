import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  title: 'Poker Range Visualizer',
  description: 'Interactive poker hand range visualizer and analyzer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-gray-900 text-white min-h-screen">
        <Header />
        <main>{children}</main>
        <Toast />
      </body>
    </html>
  );
}
