import '@/styles/global.css';
import { Inter } from 'next/font/google';
import { GlassPane } from '@/components/Glasspane';

const inter = Inter({ subsets: ['latin'] });

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="rainbow-mesh h-screen w-screen p-6">
        <GlassPane className="flex h-full w-full items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
